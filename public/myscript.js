"use strict";

// Core sizing helpers (formerly ductscript.js)
let PrevInputBoxID = 10;

function ReturnRndDuctArray(CFM, MaxVel, MaxStatic, RndDuctArray) {
  for (let i = 0; i < RndDuctArray.length; i++) {
    const v = CalcRndDuctVelocity(RndDuctArray[i], CFM);
    const st = CalcRndDuctStatic(RndDuctArray[i], v, 0.018, 0.0751, 0.0003);
    if ((st <= MaxStatic && v <= MaxVel) || i > 1e10) {
      return [RndDuctArray[i], v.toFixed(0), st];
    }
  }
  return [RndDuctArray[RndDuctArray.length - 1], 0, 0];
}

function CalcRndDuctVelocity(Diameter, CFM) {
  return (CFM * 144) / ((Math.PI * Diameter * Diameter) / 4);
}

function CalcRndDuctStatic(Dh, V, e, Density, DuctRo) {
  const kinematicViscosity = (e * 30.48) / (100 * 453.592 * Density); // [ft2/s]
  const Re = (V * Dh) / (kinematicViscosity * 720);
  const fprime = 0.11 * Math.pow((DuctRo * 12) / Dh + 68 / Re, 0.25);
  const f = fprime >= 0.018 ? fprime : 0.85 * fprime + 0.0028;
  const DeltaP = (12 * f * 0.0751 * 100 * Math.pow(V / 1097.238146, 2)) / Dh;
  return DeltaP.toFixed(3);
}

function ReturnRecDuctArray(CFM, MaxVel, MaxStatic, WidthArray, HeightArray, ExRndDuct, Ratio) {
  let i = 0;
  while (i < WidthArray.length && WidthArray[i] < ExRndDuct) i += 1;
  WidthArray = WidthArray.splice(Math.max(i - 1, 0), WidthArray.length);

  i = 0;
  while (i < HeightArray.length && HeightArray[i] < ExRndDuct) i += 1;
  // HeightArray is intentionally untrimmed as in original logic

  const RectDucts = [];
  for (let w = 0; w < WidthArray.length; w++) {
    for (let h = 0; h < HeightArray.length; h++) {
      const v = (CFM * 144) / (WidthArray[w] * HeightArray[h]);
      const Dh = (2 * WidthArray[w] * HeightArray[h]) / (WidthArray[w] + HeightArray[h]);
      const st = CalcRndDuctStatic(Dh, v, 0.0003, 0.0751, 0.0003);
      if (v <= MaxVel && st <= MaxStatic && WidthArray[w] / HeightArray[h] < Ratio) {
        RectDucts.push([WidthArray[w], HeightArray[h], v.toFixed(0), st]);
        HeightArray.splice(h, HeightArray.length);
        WidthArray.splice(0, w - 1);
        break;
      }
    }
  }
  return RectDucts;
}

function CalcMeRnd() {
  const diameter = document.getElementById("00").value;
  const cfm = document.getElementsByName("CFM")[0].value;
  const velocity = (576 * cfm) / (Math.PI * diameter * diameter);
  document.getElementById("01").innerHTML = velocity.toFixed(0);
  const staticLoss = CalcRndDuctStatic(diameter, velocity, 0.0003, 0.0751, 0.0003);
  document.getElementById("02").innerHTML = staticLoss;
  document.getElementById(PrevInputBoxID).style.textDecoration = "initial";
  document.activeElement.style.textDecoration = "underline";
  PrevInputBoxID = document.activeElement.id;
}

function CalcMeRec(row) {
  const cfm = document.getElementsByName("CFM")[0].value;
  const widthInput = document.getElementById(`${row}0`);
  const heightInput = document.getElementById(`${row}1`);
  if (!widthInput || !heightInput) return;

  const width = Number(widthInput.value);
  const height = Number(heightInput.value);
  const velocity = (144 * cfm) / (width * height);
  const Dh = (2 * width * height) / (width + height);
  document.getElementById(`${row}2`).innerHTML = velocity.toFixed(0);
  const staticLoss = CalcRndDuctStatic(Dh, velocity, 0.0003, 0.0751, 0.0003);
  document.getElementById(`${row}3`).innerHTML = staticLoss;

  document.getElementById(PrevInputBoxID).style.textDecoration = "initial";
  document.activeElement.style.textDecoration = "underline";
  PrevInputBoxID = document.activeElement.id;
}

// UI + rendering (formerly myscript.js)
const roundDuctSizes = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 34, 38, 40, 42, 46, 48, 50, 54, 60, 66, 70, 72, 76, 80, 90, 100];
const rectDuctWidths = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 46, 50, 52, 54, 60, 66, 70, 72, 76, 80, 90, 100];
const rectDuctHeights = rectDuctWidths.slice(); // same set
const maxAspectRatio = 5;

function getNumericInput(name) {
  const el = document.getElementsByName(name)[0];
  return { value: Number(el.value), el };
}

function computeDuctOptions(cfm, maxVelocity, maxStaticLoss) {
  const round = ReturnRndDuctArray(cfm, maxVelocity, maxStaticLoss, roundDuctSizes);
  const rectangular = ReturnRecDuctArray(
    cfm,
    maxVelocity,
    maxStaticLoss,
    rectDuctWidths.slice(),
    rectDuctHeights.slice(),
    round[0],
    maxAspectRatio
  );

  const options = [
    {
      type: "round",
      diameter: round[0],
      velocity: round[1],
      staticLoss: round[2],
    },
  ];

  rectangular.forEach((item) => {
    options.push({
      type: "rect",
      width: item[0],
      height: item[1],
      velocity: item[2],
      staticLoss: item[3],
    });
  });

  return options;
}

function renderOutput(options) {
  const output = document.getElementById("OutputGrid");
  output.innerHTML = "";

  const fragment = document.createDocumentFragment();

  const createCell = (className, html) => {
    const cell = document.createElement("div");
    cell.className = `result-cell ${className}`.trim();
    cell.innerHTML = html;
    return cell;
  };

  const createRow = (cells) => {
    const row = document.createElement("div");
    row.className = "result-row";
    cells.forEach((cell) => row.appendChild(cell));
    return row;
  };

  const createBlock = (type, headingText, rows) => {
    const block = document.createElement("div");
    block.className = `result-block result-block--${type}`;

    const bar = document.createElement("div");
    bar.className = "result-bar";
    block.appendChild(bar);

    const rowsWrapper = document.createElement("div");
    rowsWrapper.className = "result-rows";
    const heading = document.createElement("div");
    heading.className = "result-heading";
    heading.innerHTML = `<small>${headingText}</small>`;
    rowsWrapper.appendChild(heading);

    rows.forEach((row) => rowsWrapper.appendChild(row));
    block.appendChild(rowsWrapper);
    return block;
  };

  // Round block
  const round = options.find((item) => item.type === "round");
  if (round) {
    const roundSize = `<div class="size-spinner size-spinner--left"><div class="stepper size-stepper"><button type="button" class="step-btn size-stepbtn table-spinner step-btn--up" aria-label="Increase round duct size" onclick="stepRoundSize(2)">▲</button><button type="button" class="step-btn size-stepbtn table-spinner step-btn--down" aria-label="Decrease round duct size" onclick="stepRoundSize(-2)">▼</button></div><input class="size-input" type="number" inputmode="numeric" pattern="[0-9]*" dir="rtl" name="Ldsize" id="00" min="4" step="2" value="${round.diameter}" oninput="CalcMeRnd()" required><span class="size-unit">Ø</span></div>`;
    const roundRow = createRow([
      createCell("size-cell", roundSize),
      createCell("Vel", `<div class="Vel" id="01">${round.velocity}</div>`),
      createCell("unit-cell", "<small>FPM</small>"),
      createCell("StLoss", `<div class="StLoss" id="02">${round.staticLoss}</div>`),
      createCell("unit-cell", "<small>inWg/100ft</small>"),
    ]);
    fragment.appendChild(createBlock("round", "Round Duct [inch]:", [roundRow]));
  }

  // Rectangular block
  const rectOptions = options.filter((item) => item.type === "rect");
  const rectRows = [];
  let rowIndex = 1;
  rectOptions.forEach((item) => {
    const rectSize = `
      <div class="size-spinner size-spinner--left">
        <div class="stepper size-stepper">
          <button
            type="button"
            class="step-btn size-stepbtn table-spinner step-btn--up"
            aria-label="Increase rectangular width"
            onclick="stepRectWidth(${rowIndex}, 2)"
          >
            ▲
          </button>
          <button
            type="button"
            class="step-btn size-stepbtn table-spinner step-btn--down"
            aria-label="Decrease rectangular width"
            onclick="stepRectWidth(${rowIndex}, -2)"
          >
            ▼
          </button>
        </div>
        <input
          class="size-input"
          type="number"
          inputmode="numeric"
          pattern="[0-9]*"
          dir="rtl"
          name="Ldsize"
          id="${rowIndex}0"
          step="2"
          min="4"
          value="${item.width}"
          oninput="CalcMeRec(${rowIndex})"
          required
        >
      </div>
      <span class="size-sep">x</span>
      <span class="inch-wrap">
        <input
          class="size-input"
          type="number"
          inputmode="numeric"
          pattern="[0-9]*"
          name="Rdsize"
          step="2"
          min="4"
          value="${item.height}"
          oninput="CalcMeRec(${rowIndex})"
          id="${rowIndex}1"
          required
        >
      </span>
      <div class="size-spinner size-spinner--right">
        <div class="stepper size-stepper">
          <button
            type="button"
            class="step-btn size-stepbtn table-spinner step-btn--up"
            aria-label="Increase rectangular height"
            onclick="stepRectHeight(${rowIndex}, 2)"
          >
            ▲
          </button>
          <button
            type="button"
            class="step-btn size-stepbtn table-spinner step-btn--down"
            aria-label="Decrease rectangular height"
            onclick="stepRectHeight(${rowIndex}, -2)"
          >
            ▼
          </button>
        </div>
      </div>
    `.trim();
    rectRows.push(
      createRow([
        createCell("size-cell", rectSize),
        createCell("Vel", `<div class="Vel" id="${rowIndex}2">${item.velocity}</div>`),
        createCell("unit-cell", "<small>FPM</small>"),
        createCell("StLoss", `<div class="StLoss" id="${rowIndex}3">${item.staticLoss}</div>`),
        createCell("unit-cell", "<small>inWg/100ft</small>"),
      ])
    );
    rowIndex += 1;
  });

  fragment.appendChild(createBlock("rect", "Rectangular Duct [inch x inch]:", rectRows));

  output.appendChild(fragment);
}

function showInputError(message) {
  const output = document.getElementById("OutputGrid");
  output.innerHTML = `<div class="result-error">${message}</div>`;
}

function inputsAreValid(cfm, maxVelocity, maxStaticLoss) {
  return (
    cfm > 25 &&
    cfm <= 200000 &&
    maxVelocity > 45 &&
    maxVelocity <= 32000 &&
    maxStaticLoss > 0.04 &&
    maxStaticLoss <= 2
  );
}

function KeyPressed() {
  const { value: cfm } = getNumericInput("CFM");
  const { value: fpm } = getNumericInput("FPM");
  const { value: staticLoss } = getNumericInput("inWg");

  if (!inputsAreValid(cfm, fpm, staticLoss)) {
    showInputError("Please enter values within the allowed ranges to see results.");
    return;
  }

  const options = computeDuctOptions(cfm, fpm, staticLoss);
  renderOutput(options);
}

function DoMath(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    if (event.target && event.target.id === "CFM") {
      const expression = prompt("Please enter math expression", "");
      if (expression !== null && expression.trim() !== "") {
        event.target.value = eval(expression);
      }
    }
    KeyPressed();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  KeyPressed();
}, false);

function stepInput(id, delta) {
  const input = document.getElementById(id);
  if (!input) return;
  const min = Number(input.min);
  const max = Number(input.max);
  const step = Number(input.step) || delta;
  const current = Number(input.value) || 0;
  let next = current + delta;
  if (step) {
    next = Math.round(next / step) * step;
  }
  next = Math.max(min, Math.min(max, next));
  input.value = next;
  KeyPressed();
}

function stepRoundSize(delta) {
  const input = document.getElementById("00");
  if (!input) return;
  const step = Number(input.step) || 1;
  const steps = Math.round(delta / step);
  if (steps > 0) {
    input.stepUp(steps);
  } else if (steps < 0) {
    input.stepDown(-steps);
  }
  input.focus();
  CalcMeRnd();
}

function stepRectWidth(rowIndex, delta) {
  const input = document.getElementById(`${rowIndex}0`);
  if (!input) return;
  const step = Number(input.step) || 1;
  const steps = Math.round(delta / step);
  if (steps > 0) {
    input.stepUp(steps);
  } else if (steps < 0) {
    input.stepDown(-steps);
  }
  input.focus();
  CalcMeRec(rowIndex);
}

function stepRectHeight(rowIndex, delta) {
  const input = document.getElementById(`${rowIndex}1`);
  if (!input) return;
  const step = Number(input.step) || 1;
  const steps = Math.round(delta / step);
  if (steps > 0) {
    input.stepUp(steps);
  } else if (steps < 0) {
    input.stepDown(-steps);
  }
  input.focus();
  CalcMeRec(rowIndex);
}
