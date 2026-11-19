/* Boot the archived Trinket music embed from a URL fragment (no backend).
 *
 *   index.html#<id>            an archived Open Music Theory trinket (data in trinkets.js)
 *   index.html#<id>.<payload>  the same trinket with edited notes; payload = base64url(JSON code)
 *
 * Runs before the vendor scripts and the Trinket bundle: it only sets the globals the
 * bundle reads at load time (trinketObject / draftObject) and the page title.
 */
(function () {
	'use strict';
	var data = window.OMT_TRINKETS || {};
	var hash = decodeURIComponent((location.hash || '').replace(/^#/, ''));
	var dot = hash.indexOf('.');
	var id = dot < 0 ? hash : hash.slice(0, dot);
	var rec = data[id];
	if (!rec) {
		// unknown or missing id: show the list of trinkets instead of a broken widget
		location.replace('list.html' + (id ? '#missing-' + encodeURIComponent(id) : ''));
		// keep the bundle quiet while the browser navigates away
		window.trinketObject = {id: '', shortCode: '', lang: 'music', name: '', code: '{}', assets: [], metrics: {}, settings: {}};
		window.draftObject = undefined;
		return;
	}
	var code = rec.code, edited = false;
	if (dot >= 0) {
		try {
			var b64 = hash.slice(dot + 1).replace(/-/g, '+').replace(/_/g, '/');
			var bin = atob(b64 + '==='.slice((b64.length + 3) % 4));
			var bytes = new Uint8Array(bin.length);
			for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
			code = JSON.parse(new TextDecoder().decode(bytes));
			edited = true;
		} catch (e) { /* bad payload: fall back to the archived version */ }
	}
	window.OMT_TRINKET = {id: id, edited: edited, original: rec.code};
	window.trinketObject = {
		id: id, shortCode: id, lang: 'music', name: rec.name,
		code: JSON.stringify(code),
		description: null, assets: [], metrics: {}, settings: {autofocusEnabled: false, testsEnabled: false},
	};
	window.draftObject = undefined;
	document.title = rec.name + (rec.reconstructed ? '（重建）' : '') + (edited ? '（已修改）' : '') + ' · Open Music Theory';
	// a new fragment means a different score: reload so the widget re-initialises cleanly
	window.addEventListener('hashchange', function () { location.reload(); });
})();
