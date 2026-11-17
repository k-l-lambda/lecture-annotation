/* Lilylet / MuseScore switch for the OMT 2nd-edition scores (scripts/lilylet/omt-v2.mjs).
   The Lilylet draft is shown by default; the MuseScore iframe gets its src only when its
   tab is first opened, so pages do not load every musescore.com embed up front. */
(function () {
	'use strict';
	function select(box, name) {
		box.querySelectorAll('.omt-switch-bar [data-pane]').forEach(function (tab) {
			var on = tab.getAttribute('data-pane') === name;
			tab.setAttribute('aria-selected', on ? 'true' : 'false');
			tab.tabIndex = on ? 0 : -1;
		});
		box.querySelectorAll(':scope > .omt-switch-pane').forEach(function (pane) {
			var on = pane.getAttribute('data-pane') === name;
			pane.hidden = !on;
			if (on) pane.querySelectorAll('iframe[data-src]').forEach(function (frame) {
				if (!frame.getAttribute('src')) frame.setAttribute('src', frame.getAttribute('data-src'));
			});
		});
	}
	function init(box) {
		if (box.dataset.omtSwitchReady) return;
		box.dataset.omtSwitchReady = '1';
		var tabs = Array.prototype.slice.call(box.querySelectorAll('.omt-switch-bar [data-pane]'));
		tabs.forEach(function (tab, i) {
			tab.addEventListener('click', function () { select(box, tab.getAttribute('data-pane')); });
			tab.addEventListener('keydown', function (e) {
				if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
				var next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
				next.focus();
				select(box, next.getAttribute('data-pane'));
			});
		});
		var current = tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0];
		if (current) select(box, current.getAttribute('data-pane'));
	}
	function scan() { document.querySelectorAll('[data-omt-switch]').forEach(init); }
	if (window.document$ && typeof window.document$.subscribe === 'function') window.document$.subscribe(scan);
	else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan);
	else scan();
})();
