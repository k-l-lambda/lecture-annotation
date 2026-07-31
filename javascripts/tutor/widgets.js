/**
 * The small shared widgets: modal confirm, dropdown menu, section picker, resume
 * banner, panel resizer.
 *
 * They live in one file because each is a few dozen lines and they share the focus
 * trap. The trap is not optional decoration — a modal that leaks Tab to the page
 * behind it is unusable with a keyboard, and the quit dialog is the one place where
 * a stray Enter would discard a session.
 */

(function () {
  "use strict";

  var FOCUSABLE =
    'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /**
   * Traps Tab inside `container` and restores focus to wherever it was on close.
   * Returns the release function.
   */
  function trapFocus(container) {
    var previous = document.activeElement;

    function onKeydown(event) {
      if (event.key !== "Tab") return;
      var items = Array.prototype.slice.call(container.querySelectorAll(FOCUSABLE));
      if (items.length === 0) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    container.addEventListener("keydown", onKeydown);
    return function release() {
      container.removeEventListener("keydown", onKeydown);
      if (previous && previous.focus) previous.focus();
    };
  }

  function overlay(className) {
    var back = el("div", "tutor-overlay " + (className || ""));
    back.setAttribute("role", "presentation");
    document.body.appendChild(back);
    return back;
  }

  // -------------------------------------------------------------------------
  // Confirm dialog
  // -------------------------------------------------------------------------

  /**
   * Resolves true only on the explicit confirm button. The destructive action is
   * deliberately NOT the initially focused control (ui-spec.md §6): the dialog
   * exists to slow the student down, and autofocusing 退出 would defeat it.
   */
  function openConfirm(options) {
    return new Promise(function (resolve) {
      var back = overlay("tutor-overlay--dialog");
      var dialog = el("div", "tutor-dialog tutor-dialog--confirm");
      dialog.setAttribute("role", "dialog");
      dialog.setAttribute("aria-modal", "true");

      var titleId = "tutor-confirm-title";
      var title = el("h2", "tutor-dialog__title", options.title);
      title.id = titleId;
      dialog.setAttribute("aria-labelledby", titleId);
      dialog.appendChild(title);

      var body = el("div", "tutor-dialog__body");
      // The body carries newlines, so it is set as text with `white-space:
      // pre-line` in CSS rather than being built from <p>s.
      body.textContent = options.body;
      dialog.appendChild(body);

      var extra = null;
      if (options.requireTyping) {
        extra = el("input", "tutor-dialog__typed");
        extra.type = "text";
        extra.setAttribute("aria-label", "输入 " + options.requireTyping + " 以确认");
        extra.placeholder = options.requireTyping;
        dialog.appendChild(extra);
      }

      var row = el("div", "tutor-dialog__actions");
      var cancel = el("button", "md-button", options.cancelLabel || "取消");
      cancel.type = "button";
      var confirm = el("button", "md-button tutor-dialog__danger", options.confirmLabel || "确定");
      confirm.type = "button";
      if (options.requireTyping) confirm.disabled = true;
      row.appendChild(cancel);
      row.appendChild(confirm);
      dialog.appendChild(row);
      back.appendChild(dialog);

      var release = trapFocus(dialog);

      function close(result) {
        release();
        back.remove();
        document.removeEventListener("keydown", onEscape);
        resolve(result);
      }

      function onEscape(event) {
        if (event.key === "Escape") close(false);
      }

      if (extra) {
        extra.addEventListener("input", function () {
          confirm.disabled = extra.value !== options.requireTyping;
        });
      }
      cancel.addEventListener("click", function () {
        close(false);
      });
      confirm.addEventListener("click", function () {
        close(true);
      });
      back.addEventListener("click", function (event) {
        if (event.target === back) close(false);
      });
      document.addEventListener("keydown", onEscape);

      cancel.focus();
    });
  }

  // -------------------------------------------------------------------------
  // Dropdown menu
  // -------------------------------------------------------------------------

  function openMenu(anchor, items) {
    var existing = document.getElementById("tutor-menu");
    if (existing) existing.remove();

    var menu = el("div", "tutor-menu");
    menu.id = "tutor-menu";
    menu.setAttribute("role", "menu");

    items.forEach(function (item) {
      var button = el("button", "tutor-menu__item" + (item.danger ? " tutor-menu__item--danger" : ""), item.label);
      button.type = "button";
      button.setAttribute("role", "menuitem");
      button.addEventListener("click", function () {
        menu.remove();
        item.action();
      });
      menu.appendChild(button);
    });

    document.body.appendChild(menu);
    var rect = anchor.getBoundingClientRect();
    menu.style.top = rect.bottom + 4 + "px";
    // Right-aligned to the anchor, clamped so it never hangs off-screen.
    menu.style.left = Math.max(8, Math.min(rect.right - menu.offsetWidth, window.innerWidth - menu.offsetWidth - 8)) + "px";

    var firstItem = menu.querySelector("button");
    if (firstItem) firstItem.focus();

    function dismiss(event) {
      if (menu.contains(event.target)) return;
      menu.remove();
      document.removeEventListener("click", dismiss, true);
      document.removeEventListener("keydown", onKey, true);
    }
    function onKey(event) {
      if (event.key === "Escape") dismiss({ target: document.body });
    }
    setTimeout(function () {
      document.addEventListener("click", dismiss, true);
      document.addEventListener("keydown", onKey, true);
    }, 0);
  }

  // -------------------------------------------------------------------------
  // Section picker
  // -------------------------------------------------------------------------

  function openPicker(options) {
    var back = overlay("tutor-overlay--dialog");
    var dialog = el("div", "tutor-dialog tutor-dialog--picker");
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-label", "选择要学习的小节");
    dialog.appendChild(el("h2", "tutor-dialog__title", "学哪一节？"));

    var list = el("div", "tutor-picker__list");
    options.sections.forEach(function (section) {
      var button = el("button", "tutor-picker__item", section.title);
      button.type = "button";
      button.addEventListener("click", function () {
        close();
        options.onPick(section.id);
      });
      list.appendChild(button);
    });
    dialog.appendChild(list);

    var cancel = el("button", "md-button", "取消");
    cancel.type = "button";
    cancel.addEventListener("click", close);
    dialog.appendChild(cancel);
    back.appendChild(dialog);

    var release = trapFocus(dialog);
    var firstItem = list.querySelector("button");
    if (firstItem) firstItem.focus();

    function close() {
      release();
      back.remove();
      document.removeEventListener("keydown", onEscape);
    }
    function onEscape(event) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onEscape);
    back.addEventListener("click", function (event) {
      if (event.target === back) close();
    });
  }

  // -------------------------------------------------------------------------
  // Resume banner
  // -------------------------------------------------------------------------

  function showResumeBanner(record, onResume) {
    var existing = document.getElementById("tutor-resume");
    if (existing) existing.remove();

    var article = document.querySelector("article.md-content__inner") || document.querySelector("article");
    if (!article) return;

    var banner = el("div", "tutor-resume");
    banner.id = "tutor-resume";
    banner.setAttribute("role", "status");
    banner.appendChild(
      el("span", "tutor-resume__text", "这一节有未完成的辅导会话：" + (record.sectionTitle || record.sectionId))
    );

    var resume = el("button", "md-button md-button--primary", "继续");
    resume.type = "button";
    resume.addEventListener("click", function () {
      banner.remove();
      onResume(record.sectionId);
    });
    var dismiss = el("button", "md-button", "放弃");
    dismiss.type = "button";
    dismiss.addEventListener("click", function () {
      banner.remove();
    });
    banner.appendChild(resume);
    banner.appendChild(dismiss);
    article.insertBefore(banner, article.firstChild);
  }

  // -------------------------------------------------------------------------
  // Panel resizer
  // -------------------------------------------------------------------------

  var WIDTH_KEY = "tutor.panelWidth";
  var MIN_WIDTH = 320;
  var MAX_WIDTH = 640;

  function attachResize(panel) {
    var stored = Number(safeGet(WIDTH_KEY));
    if (stored >= MIN_WIDTH && stored <= MAX_WIDTH) setWidth(stored);

    var handle = el("div", "tutor-resizer");
    handle.setAttribute("role", "separator");
    handle.setAttribute("aria-orientation", "vertical");
    handle.setAttribute("aria-label", "调整面板宽度");
    handle.tabIndex = 0;
    panel.appendChild(handle);

    var dragging = false;

    handle.addEventListener("pointerdown", function (event) {
      dragging = true;
      handle.setPointerCapture(event.pointerId);
    });
    handle.addEventListener("pointermove", function (event) {
      if (!dragging) return;
      setWidth(window.innerWidth - event.clientX);
    });
    handle.addEventListener("pointerup", function (event) {
      dragging = false;
      handle.releasePointerCapture(event.pointerId);
      persist();
    });
    // Keyboard resizing, because a pointer-only separator is inaccessible.
    handle.addEventListener("keydown", function (event) {
      var current = currentWidth();
      if (event.key === "ArrowLeft") setWidth(current + 24);
      else if (event.key === "ArrowRight") setWidth(current - 24);
      else return;
      event.preventDefault();
      persist();
    });

    function persist() {
      safeSet(WIDTH_KEY, String(currentWidth()));
    }
  }

  function currentWidth() {
    var value = getComputedStyle(document.documentElement).getPropertyValue("--tutor-panel-w");
    return parseInt(value, 10) || 420;
  }

  function setWidth(px) {
    var clamped = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, px));
    document.documentElement.style.setProperty("--tutor-panel-w", clamped + "px");
  }

  function safeGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (err) {
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (err) {
      /* a full or disabled storage must not break dragging */
    }
  }

  window.TutorConfirm = { open: openConfirm };
  window.TutorMenu = { open: openMenu };
  window.TutorPicker = { open: openPicker };
  window.TutorResumeBanner = { show: showResumeBanner };
  window.TutorResize = { attach: attachResize };
  window.TutorTrapFocus = trapFocus;
})();
