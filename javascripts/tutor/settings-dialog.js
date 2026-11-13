/**
 * The settings dialog (settings.md §1).
 *
 * Save is gated on a live connection test, and the test refuses on a gateway that
 * will not do tool calls. That is not strictness for its own sake: every state
 * change in the harness is a tool call, so saving such a config would produce a
 * session that plans nothing and grades nothing, and the student would read that
 * as Tutor being broken rather than as the gateway being unsuitable.
 *
 * The failure classification lives in the typed core (`probe.ts`) so each layer —
 * CORS, 401, wrong path, wrong model, timeout — gets its own message naming its own
 * cause. CORS especially: a browser cannot work around it, and from JS it looks
 * exactly like an outage unless it is called out by name.
 */

(function () {
  "use strict";

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function field(labelText, input, hint) {
    var wrap = el("label", "tutor-field");
    wrap.appendChild(el("span", "tutor-field__label", labelText));
    wrap.appendChild(input);
    if (hint) wrap.appendChild(el("span", "tutor-field__hint", hint));
    return wrap;
  }

  function group(title, summaryText, open) {
    var details = el("details", "tutor-settings__group");
    if (open) details.open = true;
    var summary = el("summary");
    summary.appendChild(el("span", "tutor-settings__group-title", title));
    summary.appendChild(el("span", "tutor-settings__group-summary", summaryText || ""));
    details.appendChild(summary);
    return details;
  }

  function open(options) {
    var C = window.TutorCore;
    var store = options.runtime.settingsStore;
    var loaded = store.load();
    var settings = loaded.settings;
    var keyMode = store.keyMode();

    // The state as it stood on open, so 取消 can restore it — fields write through
    // as drafts while typing, so discarding an edit is a rollback, not a no-op.
    var opened = Object.assign({}, settings);
    var openedKeyMode = keyMode;

    // Reset on every open: a passing test for one endpoint must not authorise
    // saving a different one the student typed afterwards.
    var probeOk = false;

    var back = el("div", "tutor-overlay tutor-overlay--dialog");
    var dialog = el("div", "tutor-dialog tutor-dialog--settings");
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-label", "Tutor 设置");

    var head = el("div", "tutor-dialog__head");
    head.appendChild(el("h2", "tutor-dialog__title", "Tutor 设置"));
    var close = el("button", "tutor-dialog__close", "✕");
    close.type = "button";
    close.setAttribute("aria-label", "关闭");
    head.appendChild(close);
    dialog.appendChild(head);

    loaded.warnings.forEach(function (warning) {
      dialog.appendChild(el("div", "tutor-notice tutor-notice--warn", warning));
    });

    // --- group 1: model API --------------------------------------------
    var g1 = group("1. 模型接口", "", true);

    var baseUrl = el("input", "tutor-input");
    baseUrl.type = "url";
    baseUrl.value = settings.baseUrl;
    baseUrl.placeholder = "https://api.ppinfra.com/v3/openai";

    var apiKey = el("input", "tutor-input");
    apiKey.type = "password";
    apiKey.value = settings.apiKey;
    apiKey.autocomplete = "off";

    var reveal = el("button", "md-button tutor-input__reveal", "显示");
    reveal.type = "button";
    reveal.addEventListener("click", function () {
      var hidden = apiKey.type === "password";
      apiKey.type = hidden ? "text" : "password";
      reveal.textContent = hidden ? "隐藏" : "显示";
    });

    var model = el("input", "tutor-input");
    model.type = "text";
    model.value = settings.model;
    model.placeholder = "pa/claude-opus-5";
    model.setAttribute("list", "tutor-model-list");
    var modelList = el("datalist");
    modelList.id = "tutor-model-list";

    var refresh = el("button", "md-button", "刷新模型");
    refresh.type = "button";

    var keyModeSelect = el("select", "tutor-input");
    [
      ["local", "保存在本浏览器（localStorage）"],
      ["session", "只保留到关闭浏览器（sessionStorage）"],
    ].forEach(function (pair) {
      var option = el("option", null, pair[1]);
      option.value = pair[0];
      if (pair[0] === keyMode) option.selected = true;
      keyModeSelect.appendChild(option);
    });

    var flavor = el("select", "tutor-input");
    [
      ["openai", "OpenAI 兼容（Chat Completions）"],
      ["anthropic", "Anthropic（Messages）"],
    ].forEach(function (pair) {
      var option = el("option", null, pair[1]);
      option.value = pair[0];
      if (pair[0] === settings.flavor) option.selected = true;
      flavor.appendChild(option);
    });

    g1.appendChild(field("Base URL", baseUrl, "结尾不需要 /chat/completions；没有路径时会自动补 /v1"));
    var keyRow = el("div", "tutor-field__row");
    keyRow.appendChild(apiKey);
    keyRow.appendChild(reveal);
    g1.appendChild(field("API Key", keyRow, "密钥保存在本浏览器中，本页面的任何脚本都能读到它——包括从 unpkg 加载的 MathJax。"));
    g1.appendChild(field("密钥存放方式", keyModeSelect));
    var modelRow = el("div", "tutor-field__row");
    modelRow.appendChild(model);
    modelRow.appendChild(refresh);
    g1.appendChild(field("模型", modelRow, "可直接输入；许多网关不实现 /models"));
    g1.appendChild(modelList);
    g1.appendChild(field("接口风格", flavor));

    var testButton = el("button", "md-button md-button--primary", "测试连接");
    testButton.type = "button";
    var testResult = el("div", "tutor-probe");
    // The result is announced, because a student who tabbed away from the button
    // otherwise has no way to know the test finished.
    testResult.setAttribute("aria-live", "polite");
    g1.appendChild(testButton);
    g1.appendChild(testResult);
    dialog.appendChild(g1);

    // --- group 2: language + background --------------------------------
    var g2 = group("2. 对话语言与背景", settings.language === "zh" ? "简体中文" : settings.language);
    var language = el("select", "tutor-input");
    [["zh", "简体中文"], ["en", "English"]].forEach(function (pair) {
      var option = el("option", null, pair[1]);
      option.value = pair[0];
      if (pair[0] === settings.language) option.selected = true;
      language.appendChild(option);
    });
    var background = el("textarea", "tutor-input");
    background.rows = 4;
    background.value = settings.background;
    background.maxLength = 600;
    g2.appendChild(field("语言", language));
    g2.appendChild(
      field(
        "你的背景（可选，≤600 字）",
        background,
        "用来定起点和挑例子。实测过的掌握度优先于自述——自述不能单独跳过准备步骤。"
      )
    );
    dialog.appendChild(g2);

    // --- group 3: thinking ---------------------------------------------
    var g3 = group("3. 思考与生成", "thinking: " + settings.reasoning.effort);
    var effort = el("select", "tutor-input");
    [["off", "关闭"], ["low", "低"], ["medium", "中"], ["high", "高"]].forEach(function (pair) {
      var option = el("option", null, pair[1]);
      option.value = pair[0];
      if (pair[0] === settings.reasoning.effort) option.selected = true;
      effort.appendChild(option);
    });
    var stream = el("input");
    stream.type = "checkbox";
    stream.checked = settings.stream;
    var showReasoning = el("select", "tutor-input");
    [["off", "不显示"], ["collapsed", "折叠显示"], ["expanded", "展开显示"]].forEach(function (pair) {
      var option = el("option", null, pair[1]);
      option.value = pair[0];
      if (pair[0] === settings.showReasoning) option.selected = true;
      showReasoning.appendChild(option);
    });
    var requireAnalysis = el("input");
    requireAnalysis.type = "checkbox";
    requireAnalysis.checked = settings.requireAnalysis;

    g3.appendChild(field("思考强度", effort, "开启思考时规划一节通常需要 40 秒以上"));
    g3.appendChild(field("流式输出", stream));
    g3.appendChild(field("显示思考过程", showReasoning));
    g3.appendChild(
      field(
        "要求先通读全文（analyze_section）",
        requireAnalysis,
        "更严谨，但会明显拖慢开场，且在公式密集的小节可能反复被拒"
      )
    );
    dialog.appendChild(g3);

    // --- group 4: budgets ----------------------------------------------
    var g4 = group("4. 会话与用量", "上限 " + settings.callBudgetPerSession + " 次调用");
    var budget = numberInput(settings.callBudgetPerSession, 5, 500);
    // The bounds are `normalizeSettings`' own clamp, so a value typed here cannot be
    // silently rewritten on load. Exposed because two failure messages tell the
    // student to raise this — 「规划…到了 maxOutputTokens (2000)，请调高」 among them — and
    // there was no control for it, which makes the advice unfollowable.
    var maxOutput = numberInput(settings.maxOutputTokens, 256, 32000);
    var hintCap = numberInput(settings.hintCap, 0, 5);
    var variantCap = numberInput(settings.variantCap, 1, 10);
    var stepLo = numberInput(settings.stepRange[0], 1, 6);
    var stepHi = numberInput(settings.stepRange[1], 1, 6);
    g4.appendChild(field("每会话调用上限", budget));
    g4.appendChild(
      field(
        "单次回复 token 上限",
        maxOutput,
        "思考型模型的思考也占这个额度，被截断时会提示调高；规划一节通常需要 4000 以上"
      )
    );
    g4.appendChild(field("每题提示上限", hintCap));
    g4.appendChild(field("单步变体上限", variantCap));
    var rangeRow = el("div", "tutor-field__row");
    rangeRow.appendChild(stepLo);
    rangeRow.appendChild(el("span", null, "–"));
    rangeRow.appendChild(stepHi);
    g4.appendChild(field("计划步数范围（上限 6）", rangeRow));
    dialog.appendChild(g4);

    // --- footer ---------------------------------------------------------
    var footer = el("div", "tutor-dialog__actions");
    var cancel = el("button", "md-button", "取消");
    cancel.type = "button";
    var save = el("button", "md-button md-button--primary", "保存并启用");
    save.type = "button";
    save.disabled = true;
    save.title = "先通过一次连接测试";
    footer.appendChild(cancel);
    footer.appendChild(save);
    dialog.appendChild(footer);

    back.appendChild(dialog);
    document.body.appendChild(back);
    var release = window.TutorTrapFocus(dialog);
    baseUrl.focus();

    function numberInput(value, min, max) {
      var input = el("input", "tutor-input tutor-input--number");
      input.type = "number";
      input.value = String(value);
      input.min = String(min);
      input.max = String(max);
      return input;
    }

    function collect() {
      return Object.assign({}, settings, {
        baseUrl: baseUrl.value.trim(),
        apiKey: apiKey.value.trim(),
        model: model.value.trim(),
        flavor: flavor.value,
        language: language.value,
        background: background.value,
        stream: stream.checked,
        showReasoning: showReasoning.value,
        requireAnalysis: requireAnalysis.checked,
        reasoning: Object.assign({}, settings.reasoning, { effort: effort.value }),
        callBudgetPerSession: Number(budget.value),
        maxOutputTokens: Number(maxOutput.value),
        hintCap: Number(hintCap.value),
        variantCap: Number(variantCap.value),
        stepRange: [Number(stepLo.value), Number(stepHi.value)],
      });
    }

    // Any edit to the connection fields invalidates a previous pass — otherwise a
    // student could test one endpoint and save another.
    [baseUrl, apiKey, model, flavor].forEach(function (input) {
      input.addEventListener("input", invalidateProbe);
      input.addEventListener("change", invalidateProbe);
    });

    // Every field also persists as a draft on change, debounced. Keeping the draft
    // only on dismissal still lost the work to a reload or a closed tab, which is
    // the very loop a student is in while fixing a gateway. Writing through means
    // the fields survive whatever ends the page.
    var draftTimer = null;
    function scheduleDraft() {
      if (draftTimer) clearTimeout(draftTimer);
      draftTimer = setTimeout(saveDraft, 400);
    }
    dialog.addEventListener("input", scheduleDraft);
    dialog.addEventListener("change", scheduleDraft);

    function invalidateProbe() {
      if (!probeOk) return;
      probeOk = false;
      save.disabled = true;
      save.title = "接口设置已改动，请重新测试连接";
      testResult.textContent = "接口设置已改动，请重新测试。";
      testResult.className = "tutor-probe tutor-probe--warn";
    }

    testButton.addEventListener("click", function () {
      var candidate = collect();
      if (!candidate.baseUrl || !candidate.apiKey || !candidate.model) {
        testResult.textContent = "请先填写 Base URL、API Key 和模型。";
        testResult.className = "tutor-probe tutor-probe--warn";
        return;
      }
      testButton.disabled = true;
      testResult.textContent = "正在测试…";
      testResult.className = "tutor-probe";

      C.probeConnection(candidate)
        .then(function (result) {
          probeOk = result.ok;
          save.disabled = !result.ok;
          save.title = result.ok ? "" : "连接测试未通过";
          testResult.textContent = result.message;
          testResult.className = "tutor-probe tutor-probe--" + (result.ok ? "ok" : "error");
        })
        .catch(function (err) {
          probeOk = false;
          save.disabled = true;
          testResult.textContent = String((err && err.message) || err);
          testResult.className = "tutor-probe tutor-probe--error";
        })
        .then(function () {
          testButton.disabled = false;
        });
    });

    refresh.addEventListener("click", function () {
      var candidate = collect();
      if (!candidate.baseUrl) return;
      refresh.disabled = true;
      fetch(candidate.baseUrl.replace(/\/+$/, "") + "/models", {
        headers: { Authorization: "Bearer " + candidate.apiKey },
      })
        .then(function (response) {
          return response.ok ? response.json() : null;
        })
        .then(function (payload) {
          var ids = payload && payload.data ? payload.data.map(function (m) { return m.id; }) : [];
          modelList.innerHTML = "";
          ids.forEach(function (id) {
            var option = el("option");
            option.value = id;
            modelList.appendChild(option);
          });
          // Free text always wins; a gateway without /models is normal, not an error.
          if (ids.length === 0) {
            testResult.textContent = "该网关没有返回模型列表，直接输入模型名即可。";
            testResult.className = "tutor-probe tutor-probe--warn";
          }
        })
        .catch(function () {
          testResult.textContent = "取模型列表失败，直接输入模型名即可。";
          testResult.className = "tutor-probe tutor-probe--warn";
        })
        .then(function () {
          refresh.disabled = false;
        });
    });

    save.addEventListener("click", function () {
      if (!probeOk) return;
      var persisted = store.save(collect(), keyModeSelect.value);
      if (!persisted) {
        testResult.textContent = "设置已生效，但无法写入浏览器存储（可能是隐私模式），下次打开需要重新填写。";
        testResult.className = "tutor-probe tutor-probe--warn";
        return;
      }
      dismiss({ keepDraft: false });
      if (options.onSaved) options.onSaved();
    });

    /**
     * What the student typed is kept even when the test failed.
     *
     * The connection test gates *enabling* Tutor, not *remembering* the fields —
     * conflating the two meant a student debugging a CORS-blocked gateway or
     * waiting on a new key retyped the URL, key, model, background and every
     * budget on each attempt, losing work to a verdict about the endpoint. The
     * enable gate is unaffected: `configured()` still needs all three fields, and
     * a session start still runs `assertConfigured`, so an unverified draft cannot
     * silently start a session.
     */
    function saveDraft() {
      var draft = collect();
      if (!draft.baseUrl && !draft.apiKey && !draft.model && !draft.background) return;
      store.save(draft, keyModeSelect.value);
    }

    cancel.addEventListener("click", function () {
      // 取消 means "discard this edit". Because fields write through as drafts, that
      // has to actively restore the state captured when the dialog opened, not
      // merely skip the final write.
      dismiss({ keepDraft: false, restore: true });
    });
    close.addEventListener("click", function () {
      dismiss({ keepDraft: true });
    });
    back.addEventListener("click", function (event) {
      if (event.target === back) dismiss({ keepDraft: true });
    });
    document.addEventListener("keydown", onEscape);

    function onEscape(event) {
      if (event.key === "Escape") dismiss({ keepDraft: true });
    }

    function dismiss(options2) {
      // Cancel the pending debounce first, or a queued write lands after 取消 and
      // persists the edit the student just discarded.
      if (draftTimer) {
        clearTimeout(draftTimer);
        draftTimer = null;
      }
      if (options2 && options2.keepDraft) saveDraft();
      if (options2 && options2.restore) store.save(opened, openedKeyMode);
      release();
      back.remove();
      document.removeEventListener("keydown", onEscape);
    }
  }

  window.TutorSettingsDialog = { open: open };
})();
