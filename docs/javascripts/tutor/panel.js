/**
 * The chat panel: layout, header, step rail, message list, composer, quit confirm.
 *
 * Everything the panel displays about step and phase state is rendered from
 * harness events, never inferred from model prose (README §2 layering rule 2). The
 * event sink below is the only bridge, and it is deliberately a dumb switch: if a
 * state is not in an event, the panel does not know it.
 */

(function () {
  "use strict";

  var CHOICE_LABELS = {
    advance: "继续下一步 →",
    remain: "留在本步（换一题）",
    skip: "跳过本步并记为未掌握",
    quit: "退出辅导",
  };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /** Document-level listeners of the previous mount. Removing the panel element does
   *  not unbind these, so without cleanup each mount adds a copy and a *stale* one
   *  runs first — observed as an Escape press that dropped the fullscreen class via
   *  the dead panel's handler, leaving the live panel's button showing the wrong
   *  state because its own handler then took the "already left" early return. */
  var teardown = [];

  function mount(options) {
    var C = window.TutorCore;
    var runtime = options.runtime;
    var session = null;
    var root = document.getElementById("tutor-panel");
    if (root) root.remove();
    teardown.forEach(function (undo) {
      undo();
    });
    teardown = [];

    root = el("aside", "tutor-panel");
    root.id = "tutor-panel";
    root.setAttribute("role", "complementary");
    root.setAttribute("aria-label", "Tutor 辅导面板");

    // --- header ---------------------------------------------------------
    var header = el("div", "tutor-panel__header");
    var titleRow = el("div", "tutor-panel__title-row");
    var title = el("div", "tutor-panel__title", "Tutor");
    var menuButton = el("button", "tutor-panel__menu", "⋯");
    menuButton.type = "button";
    menuButton.setAttribute("aria-label", "更多操作");
    var collapse = el("button", "tutor-panel__collapse", "⌄");
    collapse.type = "button";
    collapse.setAttribute("aria-label", "收起面板");
    // Fullscreen is a reading-comfort control, so it sits next to collapse rather
    // than in the `⋯` menu: a student who wants the transcript wide wants it now,
    // and a menu round-trip on every switch is what makes people stop switching.
    var expand = el("button", "tutor-panel__expand", "⤢");
    expand.type = "button";
    titleRow.appendChild(title);
    titleRow.appendChild(expand);
    titleRow.appendChild(menuButton);
    titleRow.appendChild(collapse);

    var rail = el("div", "tutor-rail");
    rail.setAttribute("role", "list");
    var stepLine = el("div", "tutor-step-line");
    // Below the transcript rather than in the header: 讲解思考中… is about the reply
    // being written *now*, so it belongs at the edge the next message will appear
    // from, where the student is already looking. In the header it sat above a
    // scrolled-away rail, furthest from the action it described.
    var phaseBar = el("div", "tutor-phase-bar");
    var phase = el("div", "tutor-phase");
    // Its own live region, separate from the message log, so a screen reader
    // announces 正在出题… without re-reading the whole transcript (ui-spec.md §8).
    phase.setAttribute("aria-live", "polite");
    phaseBar.appendChild(phase);

    header.appendChild(titleRow);
    header.appendChild(rail);
    header.appendChild(stepLine);

    // --- messages -------------------------------------------------------
    var messages = el("div", "tutor-messages");
    messages.setAttribute("role", "log");
    messages.setAttribute("aria-live", "polite");

    // --- composer -------------------------------------------------------
    var composer = el("form", "tutor-composer");
    var textarea = el("textarea", "tutor-composer__input");
    textarea.rows = 2;
    textarea.placeholder = "写下你的作答，也可以直接问题目的意思";
    textarea.setAttribute("aria-label", "作答输入框");
    var actions = el("div", "tutor-composer__actions");
    var submit = el("button", "tutor-composer__submit md-button md-button--primary", "提交");
    submit.type = "submit";
    var stop = el("button", "tutor-composer__stop md-button", "停止");
    stop.type = "button";
    stop.hidden = true;
    var hintCounter = el("span", "tutor-hint-counter");
    actions.appendChild(hintCounter);
    actions.appendChild(stop);
    actions.appendChild(submit);
    composer.appendChild(textarea);
    composer.appendChild(actions);

    var quickReplies = el("div", "tutor-quick");
    var choices = el("div", "tutor-choices");
    var usage = el("div", "tutor-usage");

    root.appendChild(header);
    root.appendChild(messages);
    root.appendChild(phaseBar);
    root.appendChild(quickReplies);
    root.appendChild(choices);
    root.appendChild(composer);
    root.appendChild(usage);
    // Inside `.md-main__inner`, because on desktop the panel IS the second grid
    // column that `html.tutor-active` opens there — appended to `body` instead it
    // measured 1385px wide against a 420px column, since a grid item has to be a
    // child of the grid. Below the breakpoint it is `position: fixed`, where the
    // parent does not matter, so this is safe on both sides.
    var inner = document.querySelector(".md-main__inner");
    (inner || document.body).appendChild(root);

    var view = window.TutorMessages.create(messages);
    var railView = window.TutorStepRail.create({ rail: rail, stepLine: stepLine, phase: phase });

    var ui = {
      root: root,
      busy: false,
      hintsUsed: 0,
      hintCap: 2,
      settings: null,
      phaseLabel: "",
    };

    // ------------------------------------------------------------------
    // Event sink — the single bridge from harness state to pixels
    // ------------------------------------------------------------------
    function sink(event) {
      switch (event.type) {
        case "phase":
          railView.setPhase(event.state, event.label);
          // Remembered so a failed turn can restore the label it interrupted. The
          // state itself is unchanged by a throw — the error is retriable — so
          // leaving 思考中… on screen misreports where the session actually is.
          ui.phaseLabel = event.label;
          setComposerFor(event.state);
          // The header dot reads `runtime.live`, which only becomes true once
          // `runtime.start()` has resolved — after the caller's own synchronous
          // update ran. So it is refreshed from here, where every state change
          // already arrives, rather than left showing 空闲 for the whole session.
          options.onStateChange && options.onStateChange(event.state);
          break;
        case "plan":
          view.notice(
            "计划：" + event.stepTitles.join(" · ") + (event.prepIncluded ? "（含准备步骤）" : ""),
            "info"
          );
          if (event.reason) view.notice(event.reason, "info");
          break;
        case "steprail":
          railView.setChips(event.chips);
          break;
        case "planning-progress":
          railView.setPlanningStep(event.tool, event.done, event.note);
          break;
        case "question":
          view.question(event);
          railView.setStep(event.stepIndex, event.stepTitle, event.targetLevel);
          break;
        case "delta":
          view.delta(event.role, event.text);
          break;
        case "reasoning":
          railView.setThinking(event.role, event.tokens);
          break;
        case "reply":
          view.reply(event.text, event.streaming);
          break;
        case "hint":
          ui.hintsUsed = event.used;
          ui.hintCap = event.cap;
          view.hint(event.text, event.used, event.cap);
          renderHintCounter();
          break;
        case "evaluation":
          view.evaluation(event);
          break;
        case "route":
          // Shown only when it changed the destination, so a normal answer does
          // not get an explanatory line every turn.
          if (event.route !== "answer") view.routeNote(event.route, event.reason);
          break;
        case "notice":
          view.notice(event.text, event.level);
          break;
        case "summary":
          view.summary(event);
          break;
        case "achievement":
          view.achievement(event, decideAchievement);
          break;
        case "usage":
          renderUsage(event);
          break;
        case "tool":
          if (!event.ok) railView.setToolRetry(event.tool, event.errors);
          break;
        default:
          break;
      }
    }

    function renderUsage(event) {
      if (!ui.settings || ui.settings.showUsage === false) {
        // Still rendered when the setting is absent: knowing the call count is
        // what stops a session from silently hitting the budget.
      }
      var u = event.usage || {};
      usage.textContent =
        "调用 " + event.budgetUsed + "/" + event.budgetTotal +
        " · 输入 " + kilo(u.promptTokens) +
        " · 输出 " + kilo(u.completionTokens) +
        " · 思考 " + kilo(u.reasoningTokens);
    }

    function kilo(n) {
      if (!n) return "0";
      return n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n);
    }

    function renderHintCounter() {
      hintCounter.textContent = "提示 " + ui.hintsUsed + "/" + ui.hintCap;
      hintCounter.title =
        ui.hintsUsed >= ui.hintCap
          ? "本题的提示已用完"
          : "用提示会降低这一步记录下来的掌握置信度";
      hintCounter.classList.toggle("tutor-hint-counter--spent", ui.hintsUsed >= ui.hintCap);
    }

    // ------------------------------------------------------------------
    // Composer behaviour per state
    // ------------------------------------------------------------------
    function setComposerFor(state) {
      var awaiting = state === "AWAIT_ANSWER";
      var discussing = state === "DISCUSSING";
      var ended = state === "DONE" || state === "ABANDONED";

      composer.hidden = ended;
      textarea.placeholder = discussing
        ? "继续讨论这一步，或直接选择下一步"
        : "写下你的作答，也可以直接问题目的意思";
      hintCounter.hidden = !awaiting;
      renderQuickReplies(awaiting, discussing);
      renderChoices(discussing, awaiting);

      if (ended) {
        options.onEnd && options.onEnd();
        window.Tutor.updateHeaderButton();
      }
      if (awaiting || discussing) textarea.focus();
    }

    /** Contextual quick replies (ui-spec.md §4). Each is just prefilled text —
     *  the router decides what it means, so the UI needs no parallel logic. */
    function renderQuickReplies(awaiting, discussing) {
      quickReplies.innerHTML = "";
      if (!awaiting && !discussing) return;
      var items = awaiting
        ? [["这题太难了", "这题太难了"], ["换一个例子", "换一个例子"], ["给点提示", "给点提示"]]
        : [["为什么我的答案不对？", "为什么我的答案不对？"]];
      items.forEach(function (pair) {
        var chip = el("button", "tutor-quick__chip", pair[0]);
        chip.type = "button";
        if (pair[0] === "给点提示") {
          chip.title = "每题最多 " + ui.hintCap + " 次提示；用提示会降低这一步的掌握置信度";
        }
        chip.addEventListener("click", function () {
          send(pair[1]);
        });
        quickReplies.appendChild(chip);
      });
    }

    /**
     * The two choice buttons are sticky and always enabled — the student decides,
     * not the tutor (ui-spec.md §5). A below-threshold score changes the styling
     * and adds a suggestion; it never blocks continuing.
     */
    function renderChoices(discussing, awaiting) {
      choices.innerHTML = "";
      choices.hidden = !discussing && !awaiting;
      if (choices.hidden) return;

      var keys = discussing ? ["advance", "remain"] : ["remain", "skip"];
      if (discussing && view.lastScore != null && view.lastScore < window.TutorCore.PASS_THRESHOLD) {
        keys = ["remain", "advance"];
      }
      if (discussing && view.variantsUsed >= ui.variantCap) keys.push("skip");

      keys.forEach(function (key, index) {
        var button = el("button", "tutor-choices__button md-button" + (index === 0 && discussing ? " md-button--primary" : ""), CHOICE_LABELS[key]);
        button.type = "button";
        if (key === "remain" && view.lastScore != null && view.lastScore < window.TutorCore.PASS_THRESHOLD) {
          button.title = "建议先巩固本步";
        }
        button.addEventListener("click", function () {
          choose(key);
        });
        choices.appendChild(button);
      });
    }

    // ------------------------------------------------------------------
    // Actions
    // ------------------------------------------------------------------

    /**
     * Turns a thrown request error into the same named diagnosis the settings
     * dialog shows.
     *
     * A raw `Failed to fetch` in the transcript is the failure the probe exists to
     * replace: it is what a student sees if they start a session on a config that
     * was never tested, or whose gateway stopped answering since, and it names no
     * cause and suggests no action. `describeProbeFailure` already classifies this
     * exact class of error, so the panel reuses it rather than keeping a second,
     * vaguer vocabulary for the same conditions.
     */
    function explainError(err) {
      var raw = String((err && err.message) || err);
      var C = window.TutorCore;
      if (!C || !C.describeProbeFailure) return raw;
      // Only reclassify transport-level failures. A harness rejection ("planner
      // produced no step ladder") is already specific, and running it through a
      // network classifier would replace a precise message with a wrong one.
      if (!/failed to fetch|load failed|networkerror|abort|timeout|^4\d\d|^5\d\d/i.test(raw)
          && !(err && err.status)) {
        return raw;
      }
      var described = C.describeProbeFailure(err, (ui.settings && ui.settings.model) || "");
      return described.message;
    }

    /**
     * Runs a turn, and on a retriable failure offers to run it again.
     *
     * `again` is the thunk to re-invoke. Every caller can supply one because the
     * harness now restores the pre-call state when a turn throws, so re-running is a
     * legal repeat rather than a second attempt from a state half-way through the
     * first. Without a thunk the notice is text only, as before.
     */
    function guard(promise, again) {
      ui.busy = true;
      submit.disabled = true;
      stop.hidden = false;
      return promise
        .catch(function (err) {
          // A failed call returns to the previous state with a notice rather than
          // ending the session: it is retriable (harness.md §2).
          var C = window.TutorCore;
          var canRetry = again && C && C.isRetriable && C.isRetriable(err);
          view.notice(
            explainError(err),
            "error",
            canRetry ? { label: "重试", onClick: function () { guard(again(), again); } } : null
          );
        })
        .then(function () {
          ui.busy = false;
          submit.disabled = false;
          stop.hidden = true;
          // The thinking counter is stopped by a `phase` event, and a turn that
          // throws never emits one — the harness raises before `#transition`. So it
          // was left ticking under the error notice, still claiming to think. Here
          // because it must run on both paths; on the success path the phase event
          // has already stopped it and this is a no-op.
          railView.stopThinking(ui.phaseLabel);
        });
    }

    function send(text) {
      if (!session || ui.busy) return;
      var value = (text != null ? text : textarea.value).trim();
      if (!value) return;
      textarea.value = "";
      view.student(value);

      var state = session.state;
      if (state !== "AWAIT_ANSWER" && state !== "DISCUSSING") return;

      // Once the step is graded, typing is just talking. The buttons below are the
      // only way out of the phase, so there is nothing for the router to decide — and
      // one that guessed `advance` would move the step mid-question.
      if (state === "DISCUSSING") {
        // Retried without re-echoing `value` as a student bubble: the first one is
        // still on screen, and the harness un-logs the failed turn so this is not a
        // duplicate on its side either.
        var talk = function () { return session.discuss(value); };
        guard(talk(), talk);
        return;
      }

      // The route -> method mapping lives in the core (session.applyRoute), shared
      // with the debug shell. The panel deliberately has no switch of its own: a
      // route added to the enum but missed here would silently fall through to
      // grading, which costs the student a score for asking a question.
      var routed = function () {
        return session.routeStudentTurn(value).then(function (route) {
          if (route.route === "quit") return confirmQuit();
          return session.applyRoute(route, value);
        });
      };
      guard(routed(), routed);
    }

    function choose(key) {
      if (!session || ui.busy) return;
      if (key === "quit") return confirmQuit();
      var pick = function () { return session.choose(key); };
      guard(pick(), pick);
    }

    function decideAchievement(accept) {
      if (!session) return;
      var decide = function () { return session.decideAchievement(accept); };
      guard(decide(), decide);
    }

    function confirmQuit() {
      var step = session && session.currentStep;
      var record = session && session.record;
      var graded = record ? record.steps.filter(function (s) { return s.attempts && s.attempts.length; }).length : 0;
      return window.TutorConfirm.open({
        title: "退出辅导会话？",
        body:
          "本节进度：" + (step ? step.title : "尚未开始") + "，已完成 " + graded + " 次测试。\n" +
          "已记录的掌握度会保留，未完成的步骤不会计入成就。",
        cancelLabel: "取消",
        confirmLabel: "退出并保存记录",
      }).then(function (confirmed) {
        if (!confirmed) return;
        return session.abandon();
      });
    }

    // ------------------------------------------------------------------
    // Menu / collapse / resize
    // ------------------------------------------------------------------
    menuButton.addEventListener("click", function () {
      window.TutorMenu.open(menuButton, [
        { label: "学习档案", action: function () { window.TutorProfileDrawer.open(runtime); } },
        { label: "设置", action: function () { window.TutorSettingsDialog.open({ runtime: runtime }); } },
        { label: "导出会话", action: exportSession },
        { label: "退出辅导", action: confirmQuit, danger: true },
      ]);
    });

    collapse.addEventListener("click", toggle);

    function toggle() {
      root.classList.toggle("tutor-panel--collapsed");
      var collapsed = root.classList.contains("tutor-panel--collapsed");
      collapse.textContent = collapsed ? "⌃" : "⌄";
      collapse.setAttribute("aria-label", collapsed ? "展开面板" : "收起面板");
    }

    // ------------------------------------------------------------------
    // Fullscreen
    // ------------------------------------------------------------------

    /** The class lives on `<html>`, not the panel: it has to suppress the grid
     *  column and the sheet padding, which are set on ancestors of the panel. */
    var FULLSCREEN_KEY = "tutor.fullscreen";

    function fullscreen() {
      return document.documentElement.classList.contains("tutor-fullscreen");
    }

    function setFullscreen(on) {
      document.documentElement.classList.toggle("tutor-fullscreen", on);
      // Collapsing a panel that already fills the page would leave a 3.2rem strip
      // over a blank body with no visible way back.
      if (on) root.classList.remove("tutor-panel--collapsed");
      collapse.hidden = on;
      collapse.textContent = "⌄";
      collapse.setAttribute("aria-label", "收起面板");
      expand.textContent = on ? "⤡" : "⤢";
      expand.setAttribute("aria-label", on ? "退出全屏" : "全屏显示");
      expand.setAttribute("aria-pressed", String(on));
      try {
        window.localStorage.setItem(FULLSCREEN_KEY, on ? "1" : "0");
      } catch (err) {
        // Private mode denies writes. The toggle still works for this session;
        // only the preference is lost, which is not worth surfacing.
      }
      // The list keeps its scroll offset while its height changes, so without this
      // the student lands mid-transcript on every toggle. Unconditional — a layout
      // change they asked for is not a reason to lose the newest message.
      view.scrollToEnd();
    }

    expand.addEventListener("click", function () {
      setFullscreen(!fullscreen());
    });

    // Escape is the expected way out of anything page-filling. Only when nothing
    // else is open: a dialog over the panel owns Escape first, and the composer is
    // checked so a student clearing a draft does not lose their layout too.
    // Named so `destroy` can unbind it — it is on `document`, not the panel.
    function onEscape(event) {
      if (event.key !== "Escape" || !fullscreen()) return;
      if (document.querySelector(".tutor-overlay, .tutor-menu")) return;
      if (document.activeElement === textarea && textarea.value) return;
      setFullscreen(false);
    }

    document.addEventListener("keydown", onEscape);
    teardown.push(function () {
      document.removeEventListener("keydown", onEscape);
    });

    var storedFullscreen = "0";
    try {
      storedFullscreen = window.localStorage.getItem(FULLSCREEN_KEY) || "0";
    } catch (err) {
      // Reads can throw in the same conditions as writes; default to docked.
    }
    setFullscreen(storedFullscreen === "1");

    function exportSession() {
      if (!session) return;
      var blob = new Blob([JSON.stringify(session.record, null, 2)], { type: "application/json" });
      var link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "tutor-session-" + session.record.sectionId + ".json";
      link.click();
      URL.revokeObjectURL(link.href);
    }

    composer.addEventListener("submit", function (event) {
      event.preventDefault();
      send();
    });

    // Ctrl/Cmd+Enter submits, Enter newlines: answers are often multi-line
    // derivations, so Enter-to-send would truncate them mid-thought.
    textarea.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        send();
      }
      autoGrow();
    });
    textarea.addEventListener("input", autoGrow);

    function autoGrow() {
      textarea.style.height = "auto";
      var max = parseFloat(getComputedStyle(textarea).lineHeight) * 6;
      textarea.style.height = Math.min(textarea.scrollHeight, max) + "px";
    }

    stop.addEventListener("click", function () {
      // The provider's AbortController is per-call inside the core; the panel
      // reflects the intent and the in-flight promise rejects with an abort.
      if (session && session.abortInFlight) session.abortInFlight();
    });

    window.TutorResize.attach(root);

    // ------------------------------------------------------------------
    // Start
    // ------------------------------------------------------------------
    var loaded = runtime.settingsStore.load();
    ui.settings = loaded.settings;
    ui.hintCap = loaded.settings.hintCap;
    ui.variantCap = loaded.settings.variantCap;
    renderHintCounter();

    document.documentElement.classList.add("tutor-active");

    /**
     * Plan, then ask. Retried as a unit from whichever half failed: `plan()` is skipped
     * on a second run if the ladder is already there, so a questioner that timed out
     * does not pay for a second planner call.
     *
     * This is the failure with the least recourse — a planner that dies here leaves a
     * session with no steps and no composer worth typing into, so before the retry
     * button the only way forward was reloading the page.
     */
    function planAndAsk() {
      var first = session ? Promise.resolve(session) : runtime
        .start({ page: options.page, sectionId: options.sectionId, sink: sink })
        .then(function (created) {
          session = created;
          title.textContent = "Tutor · " + (created.section.tutorTitle || created.section.heading);
          return created;
        });
      return first
        .then(function () {
          return session.record.steps.length ? null : session.plan();
        })
        .then(function () {
          return session.ask();
        });
    }

    guard(planAndAsk(), planAndAsk);

    return {
      toggle: toggle,
      flashBusy: function () {
        root.classList.add("tutor-panel--flash");
        setTimeout(function () {
          root.classList.remove("tutor-panel--flash");
        }, 600);
      },
      destroy: function () {
        root.remove();
        document.documentElement.classList.remove("tutor-active");
        // Both live outside the panel element, so they outlive it. Leaving
        // `tutor-fullscreen` behind would strand the page with `overflow: hidden`
        // and no panel to unset it.
        document.documentElement.classList.remove("tutor-fullscreen");
        teardown.forEach(function (undo) {
          undo();
        });
        teardown = [];
      },
    };
  }

  window.TutorPanel = { mount: mount };
})();
