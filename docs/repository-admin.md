# Repository administration (one-time owner tasks)

These require owner/admin permissions on
`zazieproductions/Fridge-Locker-3000`; the automation token used to prepare
the repository intentionally cannot perform them.

## 1. Enable the GitHub Pages demo

The deploy workflow (`.github/workflows/deploy.yml`) already builds and
publishes `dist/` on every push to `main`. Pages itself must be switched on
once:

> **Settings → Pages → Build and deployment → Source: GitHub Actions**

After the next push to `main`, the site is served at
`https://zazieproductions.github.io/Fridge-Locker-3000/`.
The workflow builds with a relative base (`vite build --base=./`), so the
app works from any path prefix.

Or via API/CLI with an admin token:

```bash
gh api repos/zazieproductions/Fridge-Locker-3000/pages -X POST -f build_type=workflow
```

## 2. Repository description and topics

```bash
gh repo edit zazieproductions/Fridge-Locker-3000 \
  --description "🌽🥶🎸 A deliberately cursed interactive web experience: refrigeration, corn worship, and blues-metal e-commerce. React 19 + Vite 7 + TypeScript. No trackers."

gh repo edit zazieproductions/Fridge-Locker-3000 \
  --add-topic creative-coding --add-topic react --add-topic typescript \
  --add-topic vite --add-topic tailwindcss --add-topic glitch \
  --add-topic web-art --add-topic generative-art --add-topic portfolio
```

After enabling Pages, also point the repository homepage at the demo URL:

```bash
gh repo edit zazieproductions/Fridge-Locker-3000 \
  --homepage "https://zazieproductions.github.io/Fridge-Locker-3000/"
```

## 3. Optional niceties

- **Social preview image** — Settings → Social preview: a capture of the
  piece in full glare works best.
- **Issue templates** — bug reports should include whether
  `prefers-reduced-motion` was active; the "animations stopped" report is the
  most likely false positive.
