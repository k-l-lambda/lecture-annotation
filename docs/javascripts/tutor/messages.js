/**
 * Message list rendering: bubbles, question cards, evaluation cards, notices.
 *
 * Markdown goes through `marked` and then **always** through `DOMPurify` before it
 * reaches innerHTML. That is not defensive theatre: the text is model output, and
 * on this origin `localStorage` holds the student's API key, so an injected script
 * would be reading a credential rather than defacing a page.
 *
 * MathJax is retypeset per bubble (`typesetPromise([node])`) rather than
 * document-wide, so a streaming reply does not re-typeset the whole chapter on
 * every chunk.
 */

(function () {
  "use strict";

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function renderMarkdown(node, text) {
    if (window.marked && window.DOMPurify) {
      var shielded = shieldMath(text);
      var html = window.DOMPurify.sanitize(
        window.marked.parse(shielded.text, { breaks: true, gfm: true })
      );
      node.innerHTML = restoreMath(html, shielded.spans);
    } else {
      // No sanitiser loaded means no innerHTML: degrade to plain text rather than
      // trusting model output. Formulas will show as source, which is legible.
      node.textContent = text;
    }
    typeset(node);
  }

  /**
   * Math is lifted out before `marked` runs and put back after `DOMPurify`.
   *
   * Markdown and TeX disagree about `\`, `*` and `_`, and markdown wins because it
   * parses first. `\(` and `\[` are *escapes* to marked, so `\(z=a+bi\)` came out as
   * the literal `(z=a+bi)` — the delimiter destroyed before MathJax could ever see
   * it, which is why an evaluation showed a formula's source with no `$` in sight.
   * `$$…$$` happened to survive, so the bug looked intermittent when it was really
   * "whichever delimiter the model chose this turn".
   *
   * Restoring *after* sanitising is deliberate: DOMPurify must still see the whole
   * document, and TeX source containing `<` or `&` would otherwise be mangled by it
   * (or, worse, be the thing it has to judge). The placeholder carries no markup, so
   * it survives both passes unchanged, and the restored text is inserted as **text**,
   * never as HTML.
   */
  /**
   * The `$…$` branch requires a non-space on *both* inner edges. Without the closing
   * guard, 「一共 $5 和 $7」 matched from the first `$` to the second and MathJax
   * turned two prices into one formula — a grader mentioning money would corrupt its
   * own feedback. Real inline math never ends on a space, so the guard costs nothing.
   * `$$…$$` is listed first so a display block is never split by the inline rule.
   */
  var MATH_SPAN =
    /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\$(?!\s)(?:[^$\n\\]|\\.)*?[^$\s\\](?:\\.)?\$|\$(?!\s)[^$\s\n\\]\$|\\\((?:[\s\S]+?)\\\)/g;
  /**
   * Bare letters and `@`: no markdown-special character, so neither `marked` nor
   * DOMPurify rewrites it. It must not be whitespace-delimited (markdown collapses
   * runs of spaces) and must not be a control character — a NUL sentinel was tried
   * first and DOMPurify silently *strips* NUL, so every placeholder survived into the
   * DOM unrestored and every formula rendered as `tutormath0`.
   */
  var PLACEHOLDER = "@@TUTORMATH";

  function shieldMath(text) {
    var spans = [];
    // Fenced and inline code are left alone: `$x$` inside backticks is a literal the
    // student may have typed, and turning it into a formula would misquote them.
    var pieces = String(text).split(/(```[\s\S]*?```|`[^`\n]*`)/g);
    var out = pieces
      .map(function (piece, index) {
        if (index % 2 === 1) return piece; // a code span, verbatim
        return piece.replace(MATH_SPAN, function (match) {
          spans.push(match);
          return PLACEHOLDER + (spans.length - 1) + "@@";
        });
      })
      .join("");
    return { text: out, spans: spans };
  }

  function restoreMath(html, spans) {
    if (!spans.length) return html;
    return html.replace(/@@TUTORMATH(\d+)@@/g, function (match, index) {
      var source = spans[Number(index)];
      if (source === undefined) return match;
      // Escaped, because this lands in innerHTML and the source is model output.
      // MathJax reads the resulting text node, so escaping costs nothing.
      return source
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    });
  }

  /**
   * The site's MathJax runs `ignoreHtmlClass: ".*|"` with
   * `processHtmlClass: "arithmatex"`, because pymdownx wraps each formula in the
   * page body in `<span class="arithmatex">` itself. Model output has no such
   * wrapper, so a bubble handed straight to `typesetPromise` was skipped whole —
   * measured in the browser as 598 `mjx-container` in the chapter and 0 in a tutor
   * message.
   *
   * The class has to sit on the element that *directly contains* the math text:
   * tested in-page, a class on an ancestor `div` typesets nothing, while the same
   * class on the `<p>` or on a leaf `<span>` typesets. So this tags the leaves
   * rather than the bubble, and leaves the site-wide config alone — the chapter
   * body depends on it.
   */
  /**
   * Derived from `MATH_SPAN` rather than written twice. The two must agree: this one
   * decides what gets *tagged* for MathJax and the other decides what got *shielded*
   * from markdown, so a span shielded but not tagged would render as its own source,
   * and a span tagged but not shielded would already be mangled. Same source, minus
   * the `g` flag, is the only way they cannot drift.
   */
  var MATH_PATTERN = new RegExp(MATH_SPAN.source);

  function typeset(node) {
    if (!window.MathJax || !window.MathJax.typesetPromise) return;
    markMathLeaves(node);
    window.MathJax.typesetPromise([node]).catch(function () {
      // A malformed formula must not take the message with it.
    });
  }

  /**
   * Typesets a node whose text was set with `textContent`, no markdown involved.
   *
   * The short list fields — `pointsMissed`, `strengths`, `gaps`, `nextActions` — are
   * plain strings placed straight into `<li>`s, and they are exactly where a grader
   * names the formula the student missed, so they showed raw `$b^2-4ac$` next to
   * properly rendered prose. They deliberately do **not** go through
   * `renderMarkdown`: a fragment like `判别式 *的符号*` should not gain emphasis, and
   * `textContent` already makes injection impossible. Only the math needs doing.
   */
  function typesetText(node) {
    if (MATH_PATTERN.test(node.textContent || "")) typeset(node);
    // Returned so it can wrap an `el(...)` call at the append site.
    return node;
  }

  /** Tags every element whose own text holds a delimiter, deepest-first. */
  function markMathLeaves(root) {
    var candidates = [root].concat(Array.prototype.slice.call(root.querySelectorAll("*")));
    candidates.forEach(function (element) {
      if (element.tagName === "CODE" || element.tagName === "PRE") return;
      // A `<code>` descendant's text is not this element's own, but `closest` still
      // has to be checked: a tagged ancestor of a code span would hand the code to
      // MathJax as processable content.
      if (element.closest && element.closest("code, pre")) return;
      var ownText = "";
      Array.prototype.forEach.call(element.childNodes, function (child) {
        if (child.nodeType === 3) ownText += child.nodeValue;
      });
      if (MATH_PATTERN.test(ownText)) element.classList.add("arithmatex");
    });
  }

  function create(container) {
    var api = {
      lastScore: null,
      variantsUsed: 0,
    };
    var streaming = null;

    function append(node) {
      container.appendChild(node);
      // Only autoscroll when the student is already at the bottom: yanking the
      // view while they are re-reading an earlier turn is worse than a missed
      // scroll they can perform themselves.
      var nearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 120;
      if (nearBottom) container.scrollTop = container.scrollHeight;
      return node;
    }

    api.student = function (text) {
      var bubble = append(el("div", "tutor-msg tutor-msg--student"));
      bubble.textContent = text;
    };

    api.question = function (event) {
      streaming = null;
      api.variantsUsed = event.variant;
      var card = append(el("div", "tutor-msg tutor-msg--question"));
      var label = el("div", "tutor-msg__label");
      label.textContent =
        "问题 · 步骤 " + (event.stepIndex + 1) +
        (event.variant > 0 ? "（第 " + (event.variant + 1) + " 题）" : "");
      card.appendChild(label);

      if (event.setup) {
        var setup = el("div", "tutor-question__setup");
        renderMarkdown(setup, event.setup);
        card.appendChild(setup);
      }
      var ask = el("div", "tutor-question__ask");
      renderMarkdown(ask, event.question);
      card.appendChild(ask);
    };

    /** Streamed prose lands in one live bubble that grows; a new role opens a new
     *  one, so a hint after a reply does not append into the reply. */
    api.delta = function (role, text) {
      if (!streaming || streaming.role !== role) {
        streaming = { role: role, node: append(el("div", "tutor-msg tutor-msg--tutor")), raw: "" };
      }
      streaming.raw += text;
      // Plain text while streaming: parsing partial markdown mid-token produces
      // flickering half-rendered emphasis and broken formulas.
      streaming.node.textContent = streaming.raw;
      container.scrollTop = container.scrollHeight;
    };

    api.reply = function (text, wasStreamed) {
      if (wasStreamed && streaming) {
        // Now that the text is complete, render it properly once.
        renderMarkdown(streaming.node, text || streaming.raw);
        streaming = null;
        return;
      }
      var bubble = append(el("div", "tutor-msg tutor-msg--tutor"));
      renderMarkdown(bubble, text);
      streaming = null;
    };

    api.hint = function (text, used, cap) {
      streaming = null;
      var bubble = append(el("div", "tutor-msg tutor-msg--hint"));
      bubble.appendChild(el("div", "tutor-msg__label", "提示 " + used + "/" + cap));
      var body = el("div");
      renderMarkdown(body, text);
      bubble.appendChild(body);
    };

    api.evaluation = function (event) {
      streaming = null;
      api.lastScore = event.score;
      var card = append(el("div", "tutor-msg tutor-msg--evaluation"));

      var pill = el("span", "tutor-score", event.score + "/5");
      // The numeral is always present, so the state never rests on the pill colour
      // alone (ui-spec.md §8).
      pill.setAttribute("data-passed", String(event.passed));
      pill.title = event.passed ? "达到本步的通过线" : "未达到本步的通过线";
      card.appendChild(pill);

      var body = el("div", "tutor-evaluation__body");
      renderMarkdown(body, event.evaluation);
      card.appendChild(body);

      if (event.pointsMissed && event.pointsMissed.length) {
        var missed = el("ul", "tutor-evaluation__missed");
        missed.appendChild(el("li", "tutor-evaluation__missed-label", "还没说到："));
        event.pointsMissed.forEach(function (point) {
          missed.appendChild(typesetText(el("li", null, point)));
        });
        card.appendChild(missed);
      }
    };

    /** Why a turn went where it did. Only shown for non-grading routes, so a
     *  normal answer is not annotated every time. */
    api.routeNote = function (route, reason) {
      var labels = {
        clarify: "解释题目",
        hint: "给提示",
        variant: "换一题",
        skip: "跳过本步",
        advance: "下一步",
        too_hard: "降低难度",
        off_topic: "闲聊",
        quit: "结束会话",
      };
      api.notice("→ " + (labels[route] || route) + (reason ? "：" + reason : ""), "info");
    };

    api.notice = function (text, level) {
      var node = append(el("div", "tutor-notice tutor-notice--" + (level || "info")));
      node.textContent = text;
    };

    api.summary = function (event) {
      streaming = null;
      var card = append(el("div", "tutor-msg tutor-msg--summary"));
      card.appendChild(el("div", "tutor-msg__label", "本节小结"));
      var body = el("div");
      renderMarkdown(body, event.text);
      card.appendChild(body);

      [["掌握了", event.strengths], ["还要补", event.gaps]].forEach(function (pair) {
        if (!pair[1] || !pair[1].length) return;
        var list = el("ul", "tutor-summary__list");
        list.appendChild(el("li", "tutor-summary__label", pair[0] + "："));
        pair[1].forEach(function (item) {
          list.appendChild(typesetText(el("li", null, item)));
        });
        card.appendChild(list);
      });

      if (event.nextActions && event.nextActions.length) {
        var next = el("ul", "tutor-summary__list");
        next.appendChild(el("li", "tutor-summary__label", "接下来："));
        event.nextActions.forEach(function (action) {
          var item = el("li");
          if (action.sectionRef) {
            var link = el("a", null, action.text);
            link.href = action.sectionRef;
            item.appendChild(link);
          } else {
            item.textContent = action.text;
          }
          next.appendChild(typesetText(item));
        });
        card.appendChild(next);
      }
    };

    /** A card, not a toast: declining is a real choice and needs a real button. */
    api.achievement = function (event, decide) {
      var card = append(el("div", "tutor-msg tutor-msg--achievement"));
      card.appendChild(el("div", "tutor-achievement__name", "🏅 " + event.name));
      card.appendChild(el("div", "tutor-achievement__desc", event.description));
      card.appendChild(el("div", "tutor-achievement__basis", "依据：" + event.basis));

      var row = el("div", "tutor-achievement__actions");
      var accept = el("button", "md-button md-button--primary", "接受成就");
      accept.type = "button";
      var decline = el("button", "md-button", "谢谢，不用了");
      decline.type = "button";
      accept.addEventListener("click", function () {
        row.remove();
        decide(true);
      });
      decline.addEventListener("click", function () {
        row.remove();
        decide(false);
      });
      row.appendChild(accept);
      row.appendChild(decline);
      card.appendChild(row);
    };

    return api;
  }

  window.TutorMessages = { create: create };
})();
