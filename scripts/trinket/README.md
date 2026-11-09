# Archived Trinket music embeds

trinket.io shut down on 2026-08-31. The Open Music Theory ebook (`ebooks/omt`) embedded
35 Trinket "music" scores. This directory rebuilds them as static pages, `docs/static/trinket/`:

- `archive/`: the original Trinket front end from Wayback snapshots (see `SOURCE.txt`).
  The music embed runs entirely in the browser (VexFlow + MIDI.js), so no backend is needed.
- `trinkets.json`: score data recovered from the archived embed pages (`fetch-wayback.py`).
- `build.mjs`: writes `docs/static/trinket/`. It de-brands the archived page, removes
  account/share UI and analytics, and points every asset at `docs/static/vendor/` and the
  shared soundfont `docs/static/soundfont/` (also used by the lilylet player).
- `embed-omt.mjs`: rewrites the ebook's trinket links. Each one becomes an iframe plus a
  "全屏打开" link, and the original URL is kept as an HTML comment.

Links are `static/trinket/#<id>`. After an edit, "复制链接" produces `#<id>.<base64url(code JSON)>`.

```sh
node scripts/trinket/build.mjs        # after editing src/ or trinkets.json
node scripts/trinket/embed-omt.mjs    # after changing the ebook or trinkets.json
node scripts/trinket/build.mjs --check && node scripts/trinket/embed-omt.mjs --check
```
