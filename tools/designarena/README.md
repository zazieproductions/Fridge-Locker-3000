# DesignArena tooling archive

This directory preserves the tooling that shipped inside the original
`index.html` when the project was exported from the
[DesignArena](https://designarena.ai) tournament platform
(commit `543a0cd "Export from DesignArena (agon_webapps)"`).

None of this is part of the artwork. None of it runs in the app today.
It is kept verbatim for provenance and reference — see
[`docs/decisions/0002-remove-platform-telemetry.md`](../../docs/decisions/0002-remove-platform-telemetry.md)
for the rationale.

```
tools/designarena/
├── telemetry-legacy/            Archived platform telemetry. DO NOT SHIP.
│   ├── session-recorder.vendor.js     rrweb session recorder + interaction
│   │                                  analytics; posts to designarena.ai
│   ├── page-view-beacon.vendor.js     Page-view beacon; posts viewer IDs to
│   │                                  designarena.ai
│   └── README.md                      What each script did, and why it was removed
├── element-picker/
│   ├── element-picker.vendor.js DOM-inspection overlay (postMessage protocol)
│   └── README.md                How to re-inject it locally if wanted
└── vite-plugin-source-tags.ts   Vite plugin that stamps every JSX element with
                                 data-source-loc="file:line:col" so the element
                                 picker can map DOM nodes back to source. Opt-in.
```

## The one piece that still works: source tags + element picker

The element picker pairs with the `vite-plugin-source-tags` plugin: the plugin
stamps every JSX element at compile time with a `data-source-loc` attribute and
the picker reads it to highlight `file:line` under the cursor. Both are
**dev-only conveniences**, disabled by default so production builds stay clean:

```bash
# enable source tagging for a dev session (then toggle the picker with Alt+Shift+I)
SOURCE_TAGS=1 npm run dev
```

See `element-picker/README.md` for manual injection instructions.
