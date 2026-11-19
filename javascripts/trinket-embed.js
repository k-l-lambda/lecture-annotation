/* Size each archived-Trinket iframe to its content (same origin), on every Material page load. */
(function () {
	'use strict';
	// The Trinket embed fills its viewport: the score area (#codeOutput) scrolls and the note
	// editor is pinned to the bottom. The height it needs is score-area top + score content +
	// editor, which depends on the number of staves the score draws.
	function contentHeight(doc) {
		// measure the drawn canvas, not #codeOutput: that box stretches with the iframe itself
		var canvas = doc.getElementById('notation'), editor = doc.getElementById('editor');
		if (!canvas || !canvas.offsetHeight) return 0;
		var err = doc.getElementById('error-message');
		var errH = err && err.offsetParent ? err.offsetHeight : 0;
		return Math.ceil(canvas.getBoundingClientRect().bottom + errH + (editor ? editor.offsetHeight : 0) + 12);
	}
	function fit(frame) {
		try {
			var doc = frame.contentDocument;
			if (!doc || !doc.body) return;
			var h = contentHeight(doc);
			if (h > 120) frame.style.height = h + 'px';
		} catch (e) { /* not same-origin: keep the CSS height */ }
	}
	function attach(frame) {
		fit(frame);
		try {
			var win = frame.contentWindow;
			if (frame._omtObserver) frame._omtObserver.disconnect();
			frame._omtObserver = new win.ResizeObserver(function () { fit(frame); });
			var d = frame.contentDocument;
			['notation', 'error-message', 'editor'].forEach(function (id) { var el = d.getElementById(id); if (el) frame._omtObserver.observe(el); });
		} catch (e) { /* older browsers: one-shot size */ }
	}
	function watch(frame) {
		if (frame.dataset.omtWatched) return;
		frame.dataset.omtWatched = '1';
		frame.addEventListener('load', function () { attach(frame); });
		// a lazy frame may already have loaded before this script ran
		try {
			var doc = frame.contentDocument;
			if (doc && doc.readyState === 'complete' && doc.URL !== 'about:blank') attach(frame);
		} catch (e) { /* cross-origin */ }
	}
	function scan() { document.querySelectorAll('.omt-trinket iframe').forEach(watch); }
	if (window.document$ && typeof window.document$.subscribe === 'function') window.document$.subscribe(scan);
	else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan);
	else scan();
})();
