# Improvement Review Checklist

Add Priority (1 = highest), Decision (do/skip/park), and Notes under each bullet.

- Fix HTML structure issues (header inside body, remove stray `<td>` in footer, add labels)
  - Priority:1
  - Decision:do
  - Notes:
- Replace obfuscated `myscript.js` and remove `eval` prompt
  - Priority:2
  - Decision: already updated to un obuscated, please format, comment, remove unnessesary comments, consolidate with ductscript.js, we want to replace .js files with assembly wasm
  - Notes:
- Clean up validation + event handling (centralized handlers, clearer errors)
  - Priority:3
  - Decision:do
  - Notes:
- Consolidate duplicated assets between root and `metric/`
  - Priority:4
  - Decision:hold off for now
  - Notes:
- Improve UX/responsiveness/accessibility (grid sizing, contrast, footer overlap, ARIA)
  - Priority:5
  - Decision:do
  - Notes:
- Mobile improvements (root only, exclude `metric/`)
  - Priority:
  - Decision:
  - Notes:
    - Increase touch targets and spacing for inputs/spinners; align labels on narrow widths.
    - Add a small-screen breakpoint to stack controls above the output table to avoid horizontal squeeze.
    - Allow table cells to wrap and reduce fixed widths; add padding for readability.
    - Make footer static on mobile (avoid overlap); keep header fixed only on desktop.
    - Slightly enlarge base font size on mobile; verify color contrast on blue backgrounds.
    - Consider hiding native spin buttons on mobile and/or add larger +/- controls.
    - Reduce container padding/margins on small screens; allow card to be near full-width with gutters.
