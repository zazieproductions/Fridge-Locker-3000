# Art assets

All imagery in the app lives here and is imported through Vite (via
[`manifest.ts`](./manifest.ts)), so every asset is fingerprinted, cache-busted,
and guaranteed to exist at build time — unlike the original export, which
referenced five `/public` paths that were never committed.

| File                     | Referenced by                            | Role                                                                                                     |
| ------------------------ | ---------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `fridge-person.jpg`      | `FridgeSection`, `BluesMetalShop`, `App` | The person who locked themselves in. Also the cursor follower and the "Fridge-Cooled Amp" product photo. |
| `corn-fractal.jpg`       | `CornZone`, `BluesMetalShop`             | The sacred geometry of the Corn Zone. Also the "Corn-Cob Pick" product photo.                            |
| `blues-metal-guitar.jpg` | `BluesMetalShop`                         | Rust-bucket blues-metal axe; product photography for the Emporium.                                       |
| `ugly-bg.svg`            | `index.css` (`body`)                     | The seamless site-wide background tile. Hand-authored SVG.                                               |

The three JPEGs are AI-generated to match the piece's garish lo-fi aesthetic
(the original export referenced these filenames — as `.png` — without shipping
any files), resized to 800×800 and compressed (~670 KB total, down from 8.3 MB
at full resolution). `favicon.svg` lives in `/public` since the HTML references
it before any bundling happens.
