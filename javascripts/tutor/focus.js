/**
 * Section focus and folding (ui-spec.md §3).
 *
 * Partitions the article into the focused section plus two collapsed `<details>`
 * wrappers, using the section's own id and `spanEndsAt` from the sidecar — not
 * "next h2", which is wrong on lecture pages where the analysis h2s are siblings
 * of `## 段落 N` but belong inside it.
 *
 * Restore is exact because every moved node's original parent and next sibling are
 * recorded, rather than the HTML being re-serialised. Re-serialising would destroy
 * MathJax's typeset output and the image-preview handlers attached by
 * ebooks-section.js, so a student who quits a session would be left with a
 * subtly broken page.
 */

(function () {
  "use strict";

  var FOCUS_CLASS = "tutor-focus";
  var FOLD_CLASS = "tutor-folded";

  // One entry per moved node: {node, parent, nextSibling}. Insertion order is
  // irrelevant on restore because each node goes back by reference to its own
  // former neighbour.
  var moved = [];
  var wrappers = [];
  var forcedClosed = [];
  var breadcrumb = null;

  function article() {
    return document.querySelector("article.md-content__inner") || document.querySelector("article");
  }

  function record(node) {
    moved.push({ node: node, parent: node.parentNode, nextSibling: node.nextSibling });
  }

  function makeFold(label) {
    var details = document.createElement("details");
    details.className = FOLD_CLASS;
    var summary = document.createElement("summary");
    summary.textContent = label;
    details.appendChild(summary);
    return details;
  }

  /**
   * @param sectionId  the heading id to focus
   * @param content    SidecarContent, for spanEndsAt. Optional: without it the
   *                   walk stops at the next `.tutor-section`, which the mark
   *                   makes possible with no depth heuristic.
   */
  function apply(sectionId, content) {
    restore();

    var root = article();
    var heading = document.getElementById(sectionId);
    if (!root || !heading || !root.contains(heading)) return false;

    // Resolve spanEndsAt before touching the DOM; the fetch is async and the
    // partition must be one synchronous mutation.
    var spanEnd = null;
    if (content && content.sidecarSync) {
      var meta = content.sidecarSync();
      var section = meta && meta.sections.filter(function (s) { return s.id === sectionId; })[0];
      spanEnd = section ? section.spanEndsAt : null;
    }

    var children = Array.prototype.slice.call(root.children);
    var startIndex = children.indexOf(heading);
    if (startIndex < 0) {
      // The heading is nested (a wrapper div); focus mode is not applied rather
      // than guessing at a partition that could hide content.
      return false;
    }

    var endIndex = children.length;
    for (var i = startIndex + 1; i < children.length; i += 1) {
      var node = children[i];
      if (spanEnd && node.id === spanEnd) {
        endIndex = i;
        break;
      }
      if (!spanEnd && node.classList && node.classList.contains("tutor-section")) {
        endIndex = i;
        break;
      }
    }

    var before = children.slice(0, startIndex);
    var focused = children.slice(startIndex, endIndex);
    var after = children.slice(endIndex);

    var focusWrap = document.createElement("div");
    focusWrap.className = FOCUS_CLASS;

    var beforeFold = before.length ? makeFold("本节之前的内容（已折叠）") : null;
    var afterFold = after.length ? makeFold("本节之后的内容（已折叠）") : null;

    // Insert the wrappers where the focused section starts, then move nodes in.
    root.insertBefore(focusWrap, heading);
    if (beforeFold) root.insertBefore(beforeFold, focusWrap);
    if (afterFold) root.appendChild(afterFold);

    before.forEach(function (node) {
      record(node);
      beforeFold.appendChild(node);
    });
    focused.forEach(function (node) {
      record(node);
      focusWrap.appendChild(node);
    });
    after.forEach(function (node) {
      record(node);
      afterFold.appendChild(node);
    });

    wrappers = [focusWrap, beforeFold, afterFold].filter(Boolean);

    // Raw-subtitle blocks are force-closed but left openable: the annotation is
    // what is being taught, and the transcript is ASR output.
    Array.prototype.forEach.call(focusWrap.querySelectorAll("details[open]"), function (details) {
      var summary = details.querySelector("summary");
      if (summary && /原始字幕/.test(summary.textContent)) {
        details.removeAttribute("open");
        forcedClosed.push(details);
      }
    });

    addBreadcrumb(root, focusWrap);
    document.documentElement.classList.add("tutor-active");
    return true;
  }

  /** A slim clone of the page h1, so the chapter context survives the fold. */
  function addBreadcrumb(root, focusWrap) {
    var h1 = root.querySelector("h1") || document.querySelector("h1");
    if (!h1) return;
    breadcrumb = document.createElement("div");
    breadcrumb.className = "tutor-breadcrumb";
    breadcrumb.textContent = h1.textContent.replace(/[¶⌾◉]\s*$/, "").trim();
    focusWrap.parentNode.insertBefore(breadcrumb, focusWrap);
  }

  function restore() {
    // Reverse order so a node that was moved into a wrapper which itself moved is
    // put back after its container is out of the way.
    for (var i = moved.length - 1; i >= 0; i -= 1) {
      var entry = moved[i];
      if (!entry.parent) continue;
      entry.parent.insertBefore(entry.node, entry.nextSibling);
    }
    moved = [];

    wrappers.forEach(function (wrapper) {
      if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
    });
    wrappers = [];

    forcedClosed.forEach(function (details) {
      details.setAttribute("open", "");
    });
    forcedClosed = [];

    if (breadcrumb && breadcrumb.parentNode) breadcrumb.parentNode.removeChild(breadcrumb);
    breadcrumb = null;

    document.documentElement.classList.remove("tutor-active");
  }

  function isApplied() {
    return wrappers.length > 0;
  }

  window.TutorFocus = { apply: apply, restore: restore, isApplied: isApplied };
})();
