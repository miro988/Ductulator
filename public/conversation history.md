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
