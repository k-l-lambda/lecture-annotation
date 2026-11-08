/* Lilylet score player for the MkDocs site.
 *
 *   build time: scripts/lilylet/prerender.mjs  ```lyl(.play) fence --> <div data-lilylet data-mei="…">
 *   browser:    MEI --Verovio (jsDelivr, lazy)--> SVG + MIDI + timemap
 *               MIDI --timeline--> notes --music-widgets MidiAudio (piano soundfont)--> audio
 *
 * The score UI follows klblog's theme player (themes/yilia/midi-player/src/lilylet.js);
 * audio uses music-widgets' single-piano WebAudio backend (a 1.4 MB soundfont) instead of
 * the 40 MB FluidSynth GM bank. Everything is loaded only when a score nears the viewport,
 * and audio only on the first Play click.
 *
 * Material's instant navigation swaps page content without reloading scripts, so scores
 * are (re)scanned on every `document$` emission, and playback stops on navigation.
 */
import {timeline} from './timeline.cjs';
import {scoreTiming} from './score-timing.cjs';

const scriptURL = document.currentScript.src;
const asset = name => new URL(name, scriptURL).href;
const VEROVIO = 'https://cdn.jsdelivr.net/npm/verovio@6.2.0/dist/';

// --- Verovio (shared, lazy) -----------------------------------------------
let verovio;
function loadVerovio() {
	return verovio ||= Promise.all([import(VEROVIO + 'verovio-module.mjs'), import(VEROVIO + 'verovio.mjs')])
		.then(async ([wasm, api]) => ({module: await wasm.default(), Toolkit: api.VerovioToolkit}))
		.catch(error => {verovio = null; throw error;});
}

// --- piano audio (shared, lazy) --------------------------------------------
let audio;
function loadScript(src) {
	return new Promise((resolve, reject) => {
		const s = document.createElement('script');
		s.src = src; s.onload = resolve; s.onerror = () => reject(new Error('Could not load ' + src));
		document.head.append(s);
	});
}
function loadAudio() {
	return audio ||= (async () => {
		if (!window.musicWidgetsBrowser) await loadScript(asset('musicWidgetsBrowser.umd.min.js'));
		const MidiAudio = window.musicWidgetsBrowser.MidiAudio;
		await MidiAudio.loadPlugin({soundfontUrl: asset('soundfont/'), instrument: 'acoustic_grand_piano', targetFormat: 'mp3', api: 'webaudio'});
		// empty() / awaitWarmup() live on the active backend (MidiAudio.WebAudio), not on MidiAudio
		const backend = MidiAudio.WebAudio || MidiAudio;
		if (backend.empty && backend.empty()) throw new Error('Piano soundfont did not load');
		MidiAudio.warmup = () => backend.awaitWarmup ? backend.awaitWarmup() : Promise.resolve();
		return MidiAudio;
	})().catch(error => {audio = null; throw error;});
}
// The AudioContext only resumes inside a user gesture, so it must already exist at the
// first Play click: preload (download + decode, context stays suspended) once a playable
// score is on screen.
let audioReady = null;
const preloadAudio = () => {loadAudio().then(A => {audioReady = A;}, () => {});};

// One score plays at a time across the page.
let active = null;
function stopActive() {active?.stop(); active = null;}

const icon = d => `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg>`;
const ICON = {play: 'M3 2v12l10-6z', pause: 'M4 2h3v12H4zM9 2h3v12H9z', restart: 'M2 2h2v12H2zM14 2v12L5 8z'};
const formatTime = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

async function mount(root) {
	if (root.dataset.lilyletMounted) return;
	root.dataset.lilyletMounted = '1';
	root.setAttribute('aria-busy', 'true');
	const bar = document.createElement('div'); bar.className = 'lilylet-controls';
	const status = document.createElement('span'); status.className = 'lilylet-status'; status.setAttribute('role', 'status');
	status.textContent = '正在加载曲谱…';
	bar.append(status); root.append(bar);
	try {
		const {module, Toolkit} = await loadVerovio();
		const toolkit = new Toolkit(module);
		let svg, midi, notesAt;
		try {
			toolkit.setOptions({pageWidth: 2200, pageHeight: 16000, scale: 40, adjustPageWidth: true, adjustPageHeight: true, breaks: 'auto', header: 'none', footer: 'none'});
			if (!toolkit.loadData(root.dataset.mei)) throw new Error('Verovio could not load the MEI');
			svg = Array.from({length: toolkit.getPageCount()}, (_, i) => toolkit.renderToSVG(i + 1, {})).join('');
			if (root.hasAttribute('data-playable')) {
				midi = toolkit.renderToMIDI();
				notesAt = scoreTiming(toolkit.renderToTimemap({}));
			}
		} finally {toolkit.destroy();}
		const score = document.createElement('div'); score.className = 'lilylet-score'; score.innerHTML = svg;
		root.prepend(score);
		if (root.dataset.source) {
			const details = document.createElement('details'); details.className = 'lilylet-source';
			const summary = document.createElement('summary'); summary.textContent = 'lilylet 源码';
			const pre = document.createElement('pre'); pre.textContent = root.dataset.source.trim();
			details.append(summary, pre); root.append(details);
		}
		if (!midi) {bar.remove(); return;}

		// IDs are scoped to this score: separate blocks can reuse the same MEI ids.
		const heads = new Map();
		for (const note of score.querySelectorAll('.note[id]')) heads.set(note.id, [...note.querySelectorAll('.notehead')]);
		const data = timeline(Uint8Array.from(atob(midi), c => c.charCodeAt(0)));
		const notes = data.notes;

		const play = document.createElement('button'); play.type = 'button'; play.className = 'lilylet-play';
		const restart = document.createElement('button'); restart.type = 'button'; restart.className = 'lilylet-restart';
		restart.innerHTML = icon(ICON.restart); restart.title = '从头播放'; restart.setAttribute('aria-label', restart.title);
		const time = document.createElement('span'); time.className = 'lilylet-time';
		const progress = document.createElement('input'); progress.type = 'range'; progress.className = 'lilylet-progress';
		progress.min = 0; progress.max = data.duration; progress.step = '0.01'; progress.setAttribute('aria-label', '播放位置');
		status.textContent = '';
		bar.prepend(play, restart, time, progress);

		let playing = false, position = 0, startedAt = 0, next = 0, timer = 0, frame = 0, voices = [];
		let lit = new Set();
		const highlight = seconds => {
			const now = new Set(playing ? notesAt(seconds * 1000) : []);
			for (const id of lit) if (!now.has(id)) for (const h of heads.get(id) || []) h.classList.remove('lilylet-note-active');
			for (const id of now) if (!lit.has(id)) for (const h of heads.get(id) || []) h.classList.add('lilylet-note-active');
			lit = now;
		};
		const current = () => playing ? Math.min(data.duration, (performance.now() - startedAt) / 1000) : position;
		const refresh = () => {
			const s = current();
			play.innerHTML = icon(playing ? ICON.pause : ICON.play);
			play.title = playing ? '暂停' : '播放'; play.setAttribute('aria-label', play.title);
			time.textContent = `${formatTime(s)} / ${formatTime(data.duration)}`;
			progress.value = s;
			progress.style.setProperty('--progress', `${data.duration ? s / data.duration * 100 : 0}%`);
			progress.setAttribute('aria-valuetext', `${formatTime(s)} / ${formatTime(data.duration)}`);
			highlight(s);
		};
		const silence = () => {
			for (const v of voices) try {v.stop();} catch (e) { /* already stopped */ }
			voices = [];
			audio && audio.then(A => A.stopAllNotes()).catch(() => {});
		};
		const firstFrom = s => {let i = 0; while (i < notes.length && notes[i].start < s) i++; return i;};

		// Schedule ahead in small windows so pause/seek can cut off what was queued.
		const LOOKAHEAD = 0.25;
		const schedule = A => {
			const horizon = current() + LOOKAHEAD;
			for (; next < notes.length && notes[next].start <= horizon; next++) {
				const n = notes[next];
				const on = startedAt + n.start * 1000;
				const src = A.noteOn(0, n.pitch, n.velocity, on);
				A.noteOff(0, n.pitch, on + Math.max(0.05, n.duration) * 1000);
				if (src) voices.push(src);
			}
			if (voices.length > 256) voices = voices.slice(-128);
		};
		const loop = A => {
			if (!playing) return;
			if (current() >= data.duration) {stop(); position = 0; refresh(); return;}
			schedule(A);
			timer = setTimeout(() => loop(A), 50);
		};
		const tick = () => {if (playing) {refresh(); frame = requestAnimationFrame(tick);}};
		function stop() {
			if (!playing) return;
			position = current(); playing = false;
			clearTimeout(timer); cancelAnimationFrame(frame); silence(); refresh();
			if (active === controller) active = null;
		}
		const controller = {stop};
		const start = async () => {
			// resume the AudioContext synchronously inside the click gesture (it exists once
			// the preload finished); a later resume() may be refused by Safari/Firefox
			const warm = audioReady ? audioReady.warmup() : null;
			play.disabled = true; status.textContent = audioReady ? '' : '正在加载钢琴音色…';
			try {
				const A = await loadAudio();
				await Promise.race([warm || A.warmup(), new Promise(r => setTimeout(r, 300))]);
				status.textContent = '';
				if (active && active !== controller) stopActive();
				if (position >= data.duration) position = 0;
				active = controller; playing = true;
				startedAt = performance.now() - position * 1000; next = firstFrom(position);
				loop(A); tick();
			} catch (error) {status.textContent = '音频不可用：' + error.message;}
			finally {play.disabled = false; refresh();}
		};
		const seek = s => {
			const wasPlaying = playing;
			if (wasPlaying) {stop();}
			position = Math.max(0, Math.min(data.duration, s)); refresh();
			if (wasPlaying) start();
		};
		play.addEventListener('click', () => playing ? stop() : start());
		restart.addEventListener('click', () => seek(0));
		progress.addEventListener('input', () => seek(Number(progress.value)));
		root._lilyletStop = stop;
		preloadAudio();
		refresh();
	} catch (error) {
		status.textContent = '曲谱无法显示：' + error.message;
		const retry = document.createElement('button'); retry.type = 'button'; retry.className = 'lilylet-retry'; retry.textContent = '重试';
		retry.onclick = () => {bar.remove(); root.querySelector('.lilylet-score')?.remove(); root.querySelector('.lilylet-source')?.remove(); delete root.dataset.lilyletMounted; mount(root);};
		bar.append(retry);
	} finally {root.removeAttribute('aria-busy');}
}

let observer;
function scan() {
	stopActive();
	observer?.disconnect();
	observer = new IntersectionObserver(entries => {
		for (const e of entries) if (e.isIntersecting) {observer.unobserve(e.target); mount(e.target);}
	}, {rootMargin: '300px'});
	for (const el of document.querySelectorAll('.lilylet-container[data-mei]')) observer.observe(el);
}

// Material for MkDocs exposes `document$` (an RxJS subject) that fires on the first load
// and after every instant navigation. Fall back to a plain DOM-ready scan without it.
if (window.document$ && typeof window.document$.subscribe === 'function') window.document$.subscribe(scan);
else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan);
else scan();
