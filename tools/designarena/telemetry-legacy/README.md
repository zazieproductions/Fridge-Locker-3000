# Legacy platform telemetry — DO NOT SHIP

These two scripts were injected into `<head>` by the DesignArena export
pipeline and ran for every visitor of the original build. They are archived
verbatim (minified as-shipped) for provenance only. **Neither is referenced by
the app anymore.**

| Script | What it did | Why it was removed |
| --- | --- | --- |
| `session-recorder.vendor.js` | Loaded `rrweb` from a public CDN and recorded DOM mutations, clicks, scrolls, keystrokes and cursor paths into `sessionStorage` (10 min / 30 k events cap), then posted the full recording + analytics summary to the parent frame on an `arena:flush` message. | Records visitor sessions and keystrokes. Belonging to the generation platform, not the artwork, it has no place in a portfolio artifact — shipping it would mean silently surveilling anyone who opens the deployed site. |
| `page-view-beacon.vendor.js` | POSTed a page-view payload (tournament ID, generating model ID — `gemini-3-pro-preview`, referrer domain, and a `localStorage`-persisted viewer UUID) to `https://www.designarena.ai/api/agon/page-views` on every load. | Third-party tracking beacon leaking generation metadata and a persistent viewer ID to a third party. Removed for privacy and for honest attribution (the generating model is now documented in `docs/creative-methodology.md` instead). |

If you ever need to audit what the original export shipped, this is the exact
code — byte for byte. The cleaned `index.html` no longer contains any network
calls, trackers, or third-party scripts.
