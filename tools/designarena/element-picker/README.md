# Element picker (dev tool)

`element-picker.vendor.js` is the inspect-mode overlay from the DesignArena
preview environment. When active it:

- highlights the element under the cursor,
- reads its `data-source-loc="file:line:col"` attribute (stamped by
  [`../vite-plugin-source-tags.ts`](../vite-plugin-source-tags.ts)),
- posts `{ type: 'element:selected', file, line, column, tag, text, ... }` to
  the parent frame.

**Protocol**

```
parent -> iframe: { type: 'inspect:mode', enabled: true | false }
iframe -> parent: { type: 'element:selected', file, line, column, tag, text, classes, id }
```

**To use it locally**

1. Start the dev server with source tagging enabled:
   ```bash
   SOURCE_TAGS=1 npm run dev
   ```
2. Paste `element-picker.vendor.js` into the browser console (or inject it via
   a local plugin/extension).
3. Toggle inspect mode by dispatching
   `window.postMessage({ type: 'inspect:mode', enabled: true }, '*')` from the
   parent frame — or just press **Alt+Shift+I** in the page.

This script is _not_ bundled with the app. Re-adding it to `index.html` would
ship dev tooling to production — don't.
