# Conversation Summary

- Reformatted the rectangular size template in `myscript.js` into a multiline template literal for readability (no behavior change).
- Adjusted table/grid layout in `style.css` to address hover overlap, alignment, and spacing issues:
  - Set hover backgrounds to apply only on hover-capable devices via `@media (hover: hover)`.
  - Tuned `.result-rows` grid column widths with `ch` units and controlled column/row gaps.
  - Ensured `.Vel`/`.StLoss` right alignment and prevented overflow with `white-space: nowrap`.
  - Set `.StLoss` width to `3em` on desktop; overridden to `auto` on mobile to avoid clipping.
  - Made `.unit-cell` background transparent and controlled hover visuals.
  - Mobile adjustments under `@media (max-width:508px)`:
    - Table font size set to `18px`.
    - Grid column widths adjusted for StLoss on small screens.
    - Added `.result-cell { display: flex; align-items: center; }` for vertical alignment.
    - Added mobile font-size rule for `Ldsize`, `Rdsize`, `Vel`, `StLoss` (later switched to `1em`).

- Added a dedicated `.StLoss { width: 3em; }` container sizing and reset it on mobile.
- Reduced/investigated padding and gaps between columns and row separators.

Notes:
- `rg` was not available; used `grep`/`sed` instead.
- Several CSS tweaks are focused on preventing unit labels (FPM / inWg/100ft) from covering numbers and making mobile layout consistent.

- Added numeric-keyboard hints to table size inputs and reformatted the rect size template in `myscript.js`; updated round/rect headings to include inch units.
- Restored the Enter-to-math prompt for the CFM input in `myscript.js` (uses `prompt` + `eval`).
- Added a compact info icon for the pressure-drop note in `index.html`, plus footer styles in `style.css`.
- Further refined result table styling in `style.css`: row height/padding, column sizing, hover behavior, and mobile baseline alignment for values/units.
Conversation Summary

- Removed all quote marks from rectangular duct size display by updating the rect size HTML template in `myscript.js` (removed trailing inch quote and leading quote before the x).
- Tightened spacing between the green vertical bar and round/rect size cells by setting `.result-block` column gap to `0` and reducing `.result-cell.size-cell` left padding to `2px` in `style.css`.
- Reduced left padding on the “Round duct:” heading by changing `.result-heading` padding-left from `12px` to `6px` in `style.css`.
- Identified spacing between `x` and the height input as coming from `.size-cell { gap: 0.25em; }` and `.size-sep { margin-right: 0.15em; }` in `style.css`.
- Added numeric-keyboard hints to table size inputs and reformatted the rect size template in `myscript.js`; updated round/rect headings to include inch units.
- Restored the Enter-to-math prompt for the CFM input in `myscript.js` (uses `prompt` + `eval`).
- Added a compact info icon for the pressure-drop note in `index.html`, plus footer styles in `style.css`.
- Further refined result table styling in `style.css`: row height/padding, column sizing, hover behavior, and mobile baseline alignment for values/units.

Files touched
- `myscript.js`
- `style.css`
- `index.html`
