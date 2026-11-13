/**
 * Step rail, phase indicator, planning checklist, thinking counter.
 *
 * Every element here is a pure function of harness events (ui-spec.md §4a). None
 * of it is parsed out of model prose, which is what makes the tool-call log and the
 * display unable to disagree.
 */

(function () {
  "use strict";

  // The tool sequence the planner walks, in order, with student-facing names. Shown
  // as a ticking checklist because planning with thinking on takes 40s+ and a bare
  // spinner cannot distinguish "iterating" from "stuck".
  var PLANNING_STEPS = [
    ["get_student_profile", "读取你的学习档案"],
    ["analyze_section", "通读本节原文"],
    ["upsert_knowledge_points", "建立知识点"],
    ["set_steps", "设计步骤"],
  ];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function create(targets) {
    var rail = targets.rail;
    var stepLine = targets.stepLine;
    var phaseNode = targets.phase;

    var planning = null;
    var thinkingSince = 0;
    var thinkingTimer = null;
    var thinkingRole = "";
    var thinkingTokens = 0;

    var api = {};

    api.setChips = function (chips) {
      rail.innerHTML = "";
      chips.forEach(function (chip, index) {
        var glyphs = window.TutorCore.CHIP_GLYPHS[chip.state] || { glyph: "·", label: chip.state };
        var node = el("span", "tutor-chip tutor-chip--" + chip.state);
        node.setAttribute("role", "listitem");
        node.setAttribute(
          "aria-label",
          "步骤 " + (index + 1) + "：" + chip.title + "（" + glyphs.label + "）"
        );
        node.title = chip.title + " · " + glyphs.label;
        if (chip.inserted) node.classList.add("tutor-chip--inserted");
        node.appendChild(el("span", "tutor-chip__index", chip.inserted ? "↩" : String(index + 1)));
        node.appendChild(el("span", "tutor-chip__glyph", glyphs.glyph));
        rail.appendChild(node);
      });
    };

    api.setStep = function (index, title, targetLevel) {
      var level = window.TutorCore.TARGET_LEVEL_LABELS[targetLevel] || String(targetLevel);
      stepLine.innerHTML = "";
      stepLine.appendChild(el("span", "tutor-step-line__title", "步骤 " + (index + 1) + " · " + title));
      stepLine.appendChild(el("span", "tutor-step-line__level", "目标：" + level));
    };

    api.setPhase = function (state, label) {
      stopThinking();
      phaseNode.textContent = label;
      phaseNode.setAttribute("data-state", state);

      if (state === "PLANNING") showPlanningChecklist();
      else hidePlanningChecklist();
    };

    function showPlanningChecklist() {
      if (planning) return;
      planning = el("div", "tutor-planning");
      planning.appendChild(el("div", "tutor-planning__title", "正在准备这一节的学习路径"));
      PLANNING_STEPS.forEach(function (pair) {
        var row = el("div", "tutor-planning__row");
        row.setAttribute("data-tool", pair[0]);
        row.appendChild(el("span", "tutor-planning__mark", "○"));
        row.appendChild(el("span", "tutor-planning__label", pair[1]));
        row.appendChild(el("span", "tutor-planning__note", ""));
        planning.appendChild(row);
      });
      phaseNode.parentNode.appendChild(planning);
    }

    function hidePlanningChecklist() {
      if (planning) planning.remove();
      planning = null;
    }

    api.setPlanningStep = function (tool, done, note) {
      if (!planning) showPlanningChecklist();
      var row = planning.querySelector('[data-tool="' + tool + '"]');
      if (!row) return;
      row.querySelector(".tutor-planning__mark").textContent = done ? "✓" : "●";
      row.classList.toggle("tutor-planning__row--done", Boolean(done));
      row.classList.toggle("tutor-planning__row--active", !done);
      if (note) row.querySelector(".tutor-planning__note").textContent = "(" + note + ")";
    };

    /**
     * A rejected call is shown, not hidden: a student watching a 40-second plan
     * deserves to know it is iterating rather than stuck, and the reason belongs
     * in a tooltip rather than in the transcript.
     */
    api.setToolRetry = function (tool, errors) {
      if (!planning) return;
      var row = planning.querySelector('[data-tool="' + tool + '"]');
      if (!row) return;
      row.querySelector(".tutor-planning__mark").textContent = "↻";
      row.classList.add("tutor-planning__row--retry");
      row.title = (errors || []).join("\n") || "上一版不满足约束，正在重新设计";
      row.querySelector(".tutor-planning__note").textContent = "(重试)";
    };

    /**
     * The work counter is the only progress signal a model gives during a call —
     * planner calls measured 70-129s of silence without it, which reads as a hang.
     *
     * `tokens` counts reasoning, prose and tool-call arguments together, so the label
     * is 生成中 rather than 思考中: a planner writing a long `set_steps` is past
     * thinking, and claiming otherwise while the number climbs was misleading.
     */
    api.setThinking = function (role, tokens) {
      if (!thinkingSince) thinkingSince = Date.now();
      // Held on the closure variables, not captured per-call by the interval. The
      // timer used to close over the `tokens` argument of whichever call created
      // it, so once a later call reported a larger count the two repainted in turn
      // and the number visibly bounced between them — 120 / 460 / 120 / 120.
      thinkingRole = role;
      thinkingTokens = tokens;
      paintThinking();
      if (!thinkingTimer) {
        // Ticks the elapsed seconds between token updates, which can be seconds
        // apart, so the number never looks frozen.
        thinkingTimer = setInterval(paintThinking, 1000);
      }
    };

    function paintThinking() {
      var s = Math.round((Date.now() - thinkingSince) / 1000);
      phaseNode.textContent =
        labelFor(thinkingRole) + "生成中… " + thinkingTokens + " tokens · " + s + "s";
    }

    /**
     * Exposed because `setPhase` is not the only end of a turn. A role that throws —
     * a planner cut off at `maxOutputTokens`, a dropped connection — never reaches
     * `#transition`, so no `phase` event is ever emitted and the counter kept
     * ticking under an error notice, still claiming to be thinking.
     */
    api.stopThinking = function (label) {
      stopThinking();
      if (typeof label === "string") phaseNode.textContent = label;
    };

    function stopThinking() {
      if (thinkingTimer) clearInterval(thinkingTimer);
      thinkingTimer = null;
      thinkingSince = 0;
      thinkingRole = "";
      thinkingTokens = 0;
    }

    function labelFor(role) {
      var labels = {
        planner: "规划",
        questioner: "出题",
        grader: "评分",
        tutor_reply: "讲解",
        summarizer: "小结",
        router: "分流",
      };
      return labels[role] || role;
    }

    return api;
  }

  window.TutorStepRail = { create: create };
})();
