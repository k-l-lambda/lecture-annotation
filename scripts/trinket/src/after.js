/* Runs after the Trinket bundle: adapt it to a static, backend-less host.
 *  - the piano soundfont comes from the site's shared static/soundfont/ (MP3 only)
 *  - calls to the dead trinket.io API (metrics, drafts, login…) are dropped
 *  - "复制链接" copies a #<id>[.<payload>] link to this score (with edits, if any)
 */
(function ($) {
	'use strict';
	var here = document.currentScript.src;
	var soundfont = new URL('../soundfont/', here).href;

	if (window.MIDI && MIDI.loadPlugin) {
		var load = MIDI.loadPlugin;
		MIDI.loadPlugin = function (conf) {
			conf = conf || {};
			conf.soundfontUrl = soundfont;
			conf.targetFormat = 'mp3';
			return load.call(this, conf);
		};
	}

	$.ajaxPrefilter(function (options, original, xhr) {
		if (/^(https?:\/\/[^/]+)?\/api\//.test(options.url)) xhr.abort();
	});

	var state = window.OMT_TRINKET || {};
	var changed = !!state.edited;
	$(document).on('trinket.music-notation.change', '.notation-widget', function () { changed = true; });

	function currentCode() {
		var widget = $('.notation-widget').data('trinket-musicNotation');
		return widget && widget.value ? widget.value() : null;
	}
	function base64url(text) {
		var bytes = new TextEncoder().encode(text), bin = '';
		for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
		return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
	}
	function shareUrl() {
		var base = location.href.replace(/#.*$/, '');
		var code = changed ? currentCode() : null;
		return base + '#' + state.id + (code ? '.' + base64url(JSON.stringify(code)) : '');
	}
	function copy(text) {
		if (navigator.clipboard && window.isSecureContext) {
			return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallback(text); });
		}
		return Promise.resolve(fallback(text));
	}
	function fallback(text) {
		var ta = document.createElement('textarea');
		ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;opacity:0';
		document.body.appendChild(ta); ta.select();
		var ok = false;
		try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
		ta.remove();
		return ok;
	}
	$(document).on('click', '.omt-copy-link', function (ev) {
		ev.preventDefault();
		var $btn = $(this), $label = $btn.find('label'), url = shareUrl();
		copy(url).then(function (ok) {
			$label.text(ok ? '已复制' : '复制失败');
			if (!ok) window.prompt('复制此链接：', url);
			setTimeout(function () { $label.text('复制链接'); }, 1500);
		});
	});
})(window.jQuery);
