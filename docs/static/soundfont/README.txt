# Shared piano soundfont

`acoustic_grand_piano-mp3.js` is the MIDI.js soundfont from
[mudcube/MIDI.js](https://github.com/mudcube/MIDI.js) `examples/soundfont/`
(byte-identical, sha1 `391264c4bd2e6e0862be945360ca647c48049976`): 89 notes A0–G♭7,
MP3 128 kbps / 44.1 kHz, base64 data URIs on `MIDI.Soundfont.acoustic_grand_piano`.

Both players load this one file (MP3 is forced so no OGG copy is needed):
- `javascripts/lilylet/player.js` (music-widgets `MidiAudio`, a MIDI.js port)
- `static/trinket/` (the archived Trinket music embed, which bundles MIDI.js)
