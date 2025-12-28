# Conversation History

- Investigated a table cell overflow/misalignment around a size spinner + input + unit label in the round duct row.
- Identified causes: block-level wrapper, fixed inline widths smaller than contents, and a stray quote in the generated HTML.
- Updated `style.css` to keep the size cell on one line and make the spinner container inline-flex.
- Moved the `Ø"` unit label into the spinner container and fixed the stray quote in `myscript.js`.
- Tightened widths for the stepper and input via `.size-stepper`, `.size-input`, and added `.size-unit` spacing.
- Clarified which CSS rules control the input width and the gap to the unit label.
