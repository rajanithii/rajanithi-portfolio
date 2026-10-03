# Rajanithi N — Portfolio

React + Vite + GSAP/ScrollTrigger + Lenis. No backend. Deploy: push to GitHub → import in Vercel (framework preset: Vite, zero config).

```bash
npm install
npm run dev      # local
npm run build    # production build → dist/
```

## Before publishing — fill these in
- `src/data/profile.js` — real email / GitHub / LinkedIn URLs (currently `#`).
- `src/data/projects.js` — everything `null` shows a "to be added" placeholder:
  - case study `problem / approach / architecture / status / github`
  - ClimatePulse chart: replace the placeholder `points` with real `{ year, value }` rows, then set `placeholder: false`
  - confirm each project's `technologies` list (Plotly, Pandas, SQLAlchemy, Firebase, etc.) is accurate
- `src/data/achievements.js` — confirm exact names (Online Ideathon / IIT Patna came from your build prompt, not the design doc).

Technology hover links are derived from `projects.js`, so fixing a project's tech list fixes the Technologies section too.

## Structure notes
- Pinned storytelling runs only at ≥1024px wide, ≥600px tall, with motion allowed (`PINNED_QUERY` in `scrollAnimations.js`, mirrored in `index.css` for Contact). Everything else gets a normal stacked layout.
- `prefers-reduced-motion`: no Lenis, no custom cursor, no pinning, no reveals; loader is skipped.
- Fonts are self-hosted via `@fontsource` (Space Grotesk 400/500/600, Inter 400/500).
- No raster images are used; visuals are DOM/SVG, so nothing heavy loads at startup.
