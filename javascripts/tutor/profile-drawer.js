/**
 * The profile drawer: knowledge points, achievements, data.
 *
 * Every row shows the **decayed effective** mastery rather than the stored number.
 * That distinction is the whole point: a level measured two months ago is not the
 * level today, and showing the raw value would tell a student they know something
 * the prerequisite gate is about to disagree with (data-model.md §2).
 *
 * All three tabs are editable, because the student's model of their own knowledge
 * is theirs to correct (tools.md §6). Self-assessment is recorded with
 * `confidence: 0.4`, which sits below the gate's 0.5 threshold — so it informs the
 * tutor without silently skipping a prep step, and the UI says so, or a student who
 * slides everything to 100% will be puzzled when the prep step still appears.
 */

(function () {
  "use strict";

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function bar(value, className) {
    var track = el("span", "tutor-bar " + (className || ""));
    var fill = el("span", "tutor-bar__fill");
    fill.style.width = Math.round(Math.max(0, Math.min(1, value)) * 100) + "%";
    track.appendChild(fill);
    return track;
  }

  function open(runtime) {
    var C = window.TutorCore;
    var back = el("div", "tutor-overlay tutor-overlay--drawer");
    var drawer = el("div", "tutor-drawer");
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.setAttribute("aria-label", "学习档案");

    var head = el("div", "tutor-dialog__head");
    head.appendChild(el("h2", "tutor-dialog__title", "学习档案"));
    var close = el("button", "tutor-dialog__close", "✕");
    close.type = "button";
    close.setAttribute("aria-label", "关闭");
    head.appendChild(close);
    drawer.appendChild(head);

    var tabs = el("div", "tutor-tabs");
    tabs.setAttribute("role", "tablist");
    var body = el("div", "tutor-drawer__body");
    drawer.appendChild(tabs);
    drawer.appendChild(body);

    back.appendChild(drawer);
    document.body.appendChild(back);
    var release = window.TutorTrapFocus(drawer);

    var panes = [
      ["知识点", renderKnowledgePoints],
      ["成就", renderAchievements],
      ["数据", renderData],
    ];

    panes.forEach(function (pair, index) {
      var tab = el("button", "tutor-tabs__tab", pair[0]);
      tab.type = "button";
      tab.setAttribute("role", "tab");
      tab.addEventListener("click", function () {
        select(index);
      });
      tabs.appendChild(tab);
    });

    function select(index) {
      Array.prototype.forEach.call(tabs.children, function (tab, i) {
        tab.setAttribute("aria-selected", String(i === index));
        tab.classList.toggle("tutor-tabs__tab--active", i === index);
      });
      body.innerHTML = "";
      body.appendChild(el("div", "tutor-drawer__loading", "读取中…"));
      panes[index][1]().then(function (node) {
        body.innerHTML = "";
        body.appendChild(node);
      });
    }

    // ------------------------------------------------------------------
    async function renderKnowledgePoints() {
      var store = await runtime.store();
      var kps = await store.getAllKnowledgePoints();
      var mastery = await store.getAllMastery();
      var byId = {};
      mastery.forEach(function (record) {
        byId[record.kpId] = record;
      });

      var wrap = el("div", "tutor-kp-list");
      if (kps.length === 0) {
        wrap.appendChild(el("p", "tutor-empty", "还没有任何知识点——完成一次辅导后这里就会有记录。"));
        return wrap;
      }

      var now = Date.now();
      kps.forEach(function (kp) {
        var record = byId[kp.id];
        var row = el("div", "tutor-kp");
        row.appendChild(el("div", "tutor-kp__label", kp.label));

        if (!record) {
          row.appendChild(el("div", "tutor-kp__meta", "没测过"));
          wrap.appendChild(row);
          return;
        }

        var eff = C.effective(record, now);
        var meta = el("div", "tutor-kp__meta");
        meta.appendChild(bar(eff.level, "tutor-bar--level"));
        meta.appendChild(bar(eff.confidence, "tutor-bar--confidence"));
        meta.appendChild(
          el(
            "span",
            "tutor-kp__numbers",
            "掌握 " + Math.round(eff.level * 100) + "% · 置信 " + Math.round(eff.confidence * 100) + "%"
          )
        );
        meta.appendChild(
          el("span", "tutor-kp__provenance", record.provenance === "self" ? "自评" : "评测")
        );
        row.appendChild(meta);

        var slider = el("input", "tutor-kp__slider");
        slider.type = "range";
        slider.min = "0";
        slider.max = "100";
        slider.value = String(Math.round(eff.level * 100));
        slider.setAttribute("aria-label", "调整“" + kp.label + "”的自评掌握度");
        slider.addEventListener("change", function () {
          C.setMasteryLevel(record, Number(slider.value) / 100, {
            now: new Date().toISOString(),
          });
          store.putMastery(record);
        });
        row.appendChild(slider);
        row.appendChild(
          el(
            "div",
            "tutor-kp__hint",
            "自评掌握度会告知助教，但不会单独用来跳过准备步骤"
          )
        );

        var reset = el("button", "md-button tutor-kp__reset", "标记为未学过");
        reset.type = "button";
        reset.addEventListener("click", function () {
          var cleared = C.resetMastery(record, { now: new Date().toISOString() });
          store.putMastery(cleared).then(function () {
            select(0);
          });
        });
        row.appendChild(reset);

        wrap.appendChild(row);
      });
      return wrap;
    }

    // ------------------------------------------------------------------
    async function renderAchievements() {
      var store = await runtime.store();
      var achievements = await store.listAchievements();
      var wrap = el("div", "tutor-badges");

      var accepted = achievements.filter(function (a) { return !a.declined; });
      var declined = achievements.filter(function (a) { return a.declined; });

      if (accepted.length === 0) {
        wrap.appendChild(el("p", "tutor-empty", "还没有成就。"));
      }
      accepted.forEach(function (a) {
        var badge = el("div", "tutor-badge");
        badge.appendChild(el("div", "tutor-badge__name", "🏅 " + a.name));
        badge.appendChild(el("div", "tutor-badge__desc", a.description));
        badge.appendChild(el("div", "tutor-badge__basis", a.basis));
        if (a.sectionId) badge.appendChild(el("div", "tutor-badge__source", a.sectionId));
        wrap.appendChild(badge);
      });

      if (declined.length) {
        var group = el("details", "tutor-badges__declined");
        group.appendChild(el("summary", null, "已谢绝（" + declined.length + "）"));
        declined.forEach(function (a) {
          var row = el("div", "tutor-badge tutor-badge--declined");
          row.appendChild(el("div", "tutor-badge__name", a.name));
          var restore = el("button", "md-button", "恢复");
          restore.type = "button";
          restore.addEventListener("click", function () {
            a.declined = false;
            store.putAchievement(a).then(function () {
              select(1);
            });
          });
          row.appendChild(restore);
          group.appendChild(row);
        });
        wrap.appendChild(group);
      }
      return wrap;
    }

    // ------------------------------------------------------------------
    async function renderData() {
      var store = await runtime.store();
      var wrap = el("div", "tutor-data");

      var exportButton = el("button", "md-button md-button--primary", "导出 JSON");
      exportButton.type = "button";
      exportButton.addEventListener("click", async function () {
        var payload = {
          schemaVersion: 1,
          exportedAt: new Date().toISOString(),
          knowledgePoints: await store.getAllKnowledgePoints(),
          mastery: await store.getAllMastery(),
          achievements: await store.listAchievements(),
        };
        var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        var link = el("a");
        link.href = URL.createObjectURL(blob);
        link.download = "tutor-profile.json";
        link.click();
        URL.revokeObjectURL(link.href);
      });

      var importInput = el("input");
      importInput.type = "file";
      importInput.accept = "application/json";
      importInput.addEventListener("change", function () {
        var file = importInput.files && importInput.files[0];
        if (!file) return;
        file.text().then(function (text) {
          var payload;
          try {
            payload = JSON.parse(text);
          } catch (err) {
            window.alert("这个文件不是有效的 JSON。");
            return;
          }
          // Merge by id, never delete: an import is additive so a stale export
          // cannot silently remove progress made since it was taken.
          Promise.all([
            store.upsertKnowledgePoints(payload.knowledgePoints || []),
            Promise.all((payload.mastery || []).map(function (m) { return store.putMastery(m); })),
            Promise.all((payload.achievements || []).map(function (a) { return store.putAchievement(a); })),
          ]).then(function () {
            select(2);
          });
        });
      });

      wrap.appendChild(el("p", "tutor-data__note", "导出是唯一的备份方式——档案只存在这台浏览器里。"));
      wrap.appendChild(exportButton);
      wrap.appendChild(field("导入 JSON（按 id 合并，不会删除任何记录）", importInput));

      var clear = el("button", "md-button tutor-dialog__danger", "清空学习档案");
      clear.type = "button";
      clear.addEventListener("click", function () {
        window.TutorConfirm.open({
          title: "清空全部学习档案？",
          body:
            "所有知识点、掌握度和成就都会被删除，无法恢复。\n" +
            "如果还没有导出备份，请先取消并导出。",
          confirmLabel: "永久删除",
          // Typing is required because, unlike quitting a session, this has no
          // partial recovery.
          requireTyping: "DELETE",
        }).then(function (confirmed) {
          if (confirmed) {
            runtime.clearProfile().then(function () {
              select(2);
            });
          }
        });
      });
      wrap.appendChild(clear);
      return wrap;
    }

    function field(labelText, input) {
      var label = el("label", "tutor-field");
      label.appendChild(el("span", "tutor-field__label", labelText));
      label.appendChild(input);
      return label;
    }

    close.addEventListener("click", dismiss);
    back.addEventListener("click", function (event) {
      if (event.target === back) dismiss();
    });
    document.addEventListener("keydown", onEscape);

    function onEscape(event) {
      if (event.key === "Escape") dismiss();
    }

    function dismiss() {
      release();
      back.remove();
      document.removeEventListener("keydown", onEscape);
    }

    select(0);
  }

  window.TutorProfileDrawer = { open: open };
})();
