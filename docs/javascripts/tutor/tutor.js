/**
 * Tutor entry point: feature detection, the header button, and the section entry
 * icons that replace each marked heading's `¶` permalink.
 *
 * Runs on every `document$` emission because `navigation.instant` swaps the DOM
 * without a page reload, so anything injected once would vanish on the next
 * navigation (same lifecycle as ebooks-section.js).
 *
 * Deliberately a classic IIFE with no build step of its own: the site has no
 * bundler, and the typed half of the shell arrives separately as `window.TutorCore`
 * (built from tutor/src/shells/web/). This file is the untyped glue that may touch
 * the page; it never talks to the provider directly (README §2 layering rule 1).
 */

(function () {
  "use strict";

  var SECTION_SELECTOR = ":is(h2, h3).tutor-section";
  var ENTRY_ICON = "⌾";
  var ENTRY_ICON_ACTIVE = "◉";

  // Records what each swapped permalink used to be, so disabling Tutor or quitting
  // a session restores the page exactly. Keyed by element, not by id, because the
  // same id can reappear on a different element after instant navigation.
  var originalPermalinks = new WeakMap();

  var state = {
    runtime: null,
    panel: null,
    activeSectionId: null,
  };

  function core() {
    return window.TutorCore || null;
  }

  function runtime() {
    if (!state.runtime) {
      var C = core();
      if (!C) return null;
      // `window.TutorTestEnv` is the one seam for driving the UI without a real
      // gateway: an end-to-end check needs a scripted model, and the alternative is
      // either exposing the provider to `ui/*` (which is the layering rule this
      // shell exists to keep) or leaving the whole panel untested. Nothing sets it
      // in production, so the default path is unchanged.
      state.runtime = new C.TutorRuntime(window.TutorTestEnv || {});
    }
    return state.runtime;
  }

  function sectionHeadings() {
    return Array.prototype.slice.call(document.querySelectorAll(SECTION_SELECTOR));
  }

  /** The page id used as the sidecar/profile join key, derived the same way the
   *  sidecar URL is: from the path, never by matching /ebooks/ or /lectures/. */
  function pageKey() {
    var path = window.location.pathname.replace(/\/+$/, "");
    var prefix = document.querySelector('meta[name="tutor-base"]');
    var base = prefix ? prefix.content : inferBase(path);
    return path.indexOf(base) === 0 ? path.slice(base.length).replace(/^\/+/, "") : path.replace(/^\/+/, "");
  }

  /** The site may be published at a sub-path (/lecture-annotation). The base is
   *  whatever precedes `ebooks/` or `lectures/` in the current path. */
  function inferBase(path) {
    var m = /^(.*?)\/(?:ebooks|lectures)\//.exec(path + "/");
    return m ? m[1] : "";
  }

  // -------------------------------------------------------------------------
  // Section entry icons (ui-spec.md §1.1)
  // -------------------------------------------------------------------------

  /**
   * Swaps `¶` for the Tutor glyph on marked headings only. The mark IS the button,
   * so there is no eligibility logic and no wait for the sidecar — the icons can
   * appear before any fetch happens.
   */
  function applyEntryIcons() {
    var headings = sectionHeadings();
    var live = state.runtime && state.runtime.live;

    headings.forEach(function (heading) {
      var link = heading.querySelector("a.headerlink");
      if (!link) return;

      if (!originalPermalinks.has(link)) {
        originalPermalinks.set(link, {
          text: link.textContent,
          title: link.getAttribute("title"),
          label: link.getAttribute("aria-label"),
        });
      }

      var sectionId = heading.id;
      var isActive = live && state.activeSectionId === sectionId;
      var title = heading.textContent.replace(/[¶⌾◉]\s*$/, "").trim();

      link.classList.add("tutor-entry");
      link.textContent = isActive ? ENTRY_ICON_ACTIVE : ENTRY_ICON;
      link.setAttribute("role", "button");
      link.setAttribute("data-tutor-section", sectionId);

      if (live && !isActive) {
        // Icons on other sections are disabled rather than hidden: a student
        // should see that the affordance exists and why it is unavailable.
        link.setAttribute("aria-disabled", "true");
        link.setAttribute("title", "正在辅导 " + shortTitle(state.activeSectionId) + "，请先结束当前会话");
      } else {
        link.removeAttribute("aria-disabled");
        link.setAttribute("title", isActive ? "正在辅导本节" : "用 Tutor 学习本节");
        link.setAttribute("aria-label", "用 Tutor 学习：" + title);
      }
    });
  }

  function shortTitle(sectionId) {
    var heading = sectionId && document.getElementById(sectionId);
    if (!heading) return "上一节";
    var text = heading.textContent.replace(/[¶⌾◉]\s*$/, "").trim();
    var m = /^(\d+(?:\.\d+)?)/.exec(text);
    return m ? "§" + m[1] : text.slice(0, 12);
  }

  /** Restores every `¶` this script replaced. Called on quit and on teardown. */
  function restoreEntryIcons() {
    sectionHeadings().forEach(function (heading) {
      var link = heading.querySelector("a.headerlink");
      var original = link && originalPermalinks.get(link);
      if (!original) return;
      link.classList.remove("tutor-entry");
      link.textContent = original.text;
      link.removeAttribute("role");
      link.removeAttribute("aria-disabled");
      link.removeAttribute("data-tutor-section");
      if (original.title) link.setAttribute("title", original.title);
      else link.removeAttribute("title");
      if (original.label) link.setAttribute("aria-label", original.label);
      else link.removeAttribute("aria-label");
    });
  }

  /**
   * A plain click starts a session; a modifier or middle click falls through to
   * the anchor. Silently destroying "copy link to section" on a reference site
   * would be a bad trade for an icon (ui-spec.md §1.1).
   */
  function handleEntryClick(event) {
    var link = event.target.closest && event.target.closest("a.tutor-entry");
    if (!link) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (link.getAttribute("aria-disabled") === "true") {
      event.preventDefault();
      if (state.panel) state.panel.flashBusy();
      return;
    }
    event.preventDefault();
    startSession(link.getAttribute("data-tutor-section"));
  }

  // -------------------------------------------------------------------------
  // Header button
  // -------------------------------------------------------------------------

  function ensureHeaderButton() {
    // Skipped by a single querySelector rather than a page-path check: index
    // pages, contents.md and front matter simply have no marked heading.
    if (sectionHeadings().length === 0) return;

    var header = document.querySelector(".md-header__inner .md-header__option, .md-header__inner");
    if (!header) return;
    if (document.getElementById("tutor-header-button")) {
      updateHeaderButton();
      return;
    }

    var button = document.createElement("button");
    button.id = "tutor-header-button";
    button.className = "md-header__button tutor-header-button";
    button.type = "button";
    button.innerHTML = '<span class="tutor-header-button__label">🎓</span><span class="tutor-header-button__dot" aria-hidden="true"></span>';
    button.addEventListener("click", function () {
      var r = runtime();
      if (!r) return;
      if (r.live) {
        state.panel && state.panel.toggle();
      } else if (!r.settingsStore.configured()) {
        // Configuration is the only gate on the feature, so it is one click from
        // the first encounter rather than behind a menu.
        openSettings();
      } else {
        // Once configured, this button is the only entry that is on every page —
        // the panel menu carries settings and the profile too, but the panel does
        // not exist until a session is live, so both have to be reachable here or
        // a student who wants to change a key first has nowhere to go.
        window.TutorMenu.open(button, [
          { label: "开始辅导…", action: openSectionPicker },
          { label: "学习档案", action: openProfile },
          { label: "设置", action: openSettings },
        ]);
      }
    });

    var nav = document.querySelector(".md-header__inner > .md-header__title");
    if (nav && nav.parentNode) nav.parentNode.insertBefore(button, nav.nextSibling);
    else header.appendChild(button);

    updateHeaderButton();
  }

  /** Hollow = not configured, grey = configured but idle, filled = session live. */
  function updateHeaderButton() {
    var button = document.getElementById("tutor-header-button");
    if (!button) return;
    var r = runtime();
    var live = r && r.live;
    var configured = r && r.settingsStore.configured();
    var status = live ? "live" : configured ? "idle" : "unconfigured";
    button.setAttribute("data-tutor-status", status);
    button.setAttribute(
      "aria-label",
      live ? "Tutor 辅导进行中，点击显示面板" : configured ? "开始 Tutor 辅导" : "配置 Tutor"
    );
  }

  // -------------------------------------------------------------------------
  // Session start / picker
  // -------------------------------------------------------------------------

  function openSectionPicker() {
    var headings = sectionHeadings();
    if (headings.length === 1) {
      startSession(headings[0].id);
      return;
    }
    window.TutorPicker.open({
      sections: headings.map(function (h) {
        return { id: h.id, title: h.textContent.replace(/[¶⌾◉]\s*$/, "").trim() };
      }),
      onPick: startSession,
    });
  }

  function openSettings() {
    var r = runtime();
    if (!r) return;
    window.TutorSettingsDialog.open({ runtime: r, onSaved: updateHeaderButton });
  }

  function openProfile() {
    var r = runtime();
    if (!r) return;
    window.TutorProfileDrawer.open(r);
  }

  function startSession(sectionId) {
    var r = runtime();
    if (!r) return;
    if (!r.settingsStore.configured()) {
      window.TutorSettingsDialog.open({
        runtime: r,
        onSaved: function () {
          updateHeaderButton();
          startSession(sectionId);
        },
      });
      return;
    }

    state.activeSectionId = sectionId;
    state.panel = window.TutorPanel.mount({
      runtime: r,
      page: pageKey(),
      sectionId: sectionId,
      onStateChange: updateHeaderButton,
      onEnd: function () {
        state.activeSectionId = null;
        window.TutorFocus.restore();
        applyEntryIcons();
        updateHeaderButton();
      },
    });

    window.TutorFocus.apply(sectionId, r.content);
    applyEntryIcons();
    updateHeaderButton();
  }

  // -------------------------------------------------------------------------
  // Lifecycle
  // -------------------------------------------------------------------------

  function initialize() {
    if (!core()) return;
    ensureHeaderButton();
    applyEntryIcons();
    maybeOfferResume();
  }

  /** The resume banner (ui-spec.md §1) — only when an unfinished session exists
   *  for a section that is actually on this page. */
  function maybeOfferResume() {
    var r = runtime();
    if (!r || r.live) return;
    var headings = sectionHeadings();
    if (headings.length === 0) return;

    var page = pageKey();
    var checks = headings.map(function (h) {
      return r.resumable(page, h.id);
    });
    Promise.all(checks)
      .then(function (found) {
        var record = found.filter(Boolean)[0];
        if (record) window.TutorResumeBanner.show(record, startSession);
      })
      .catch(function () {
        // A store that will not open is reported when a session is started, not
        // as a banner failure on every page view.
      });
  }

  document.addEventListener("click", handleEntryClick);
  document.addEventListener("keydown", function (event) {
    // Alt+T toggles the panel (ui-spec.md §8).
    if (event.altKey && (event.key === "t" || event.key === "T") && state.panel) {
      event.preventDefault();
      state.panel.toggle();
    }
  });

  if (window.document$) {
    window.document$.subscribe(initialize);
  } else {
    document.addEventListener("DOMContentLoaded", initialize);
  }

  window.Tutor = {
    start: startSession,
    openSettings: openSettings,
    openProfile: openProfile,
    openSectionPicker: openSectionPicker,
    restoreEntryIcons: restoreEntryIcons,
    applyEntryIcons: applyEntryIcons,
    updateHeaderButton: updateHeaderButton,
    pageKey: pageKey,
    runtime: runtime,
  };
})();
