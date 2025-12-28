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

function FitAapostrophe(id) {
  const input = document.getElementById(id);
  if (!input) return;
  const n = input.value.length / 2 - 3;
  const spanIndex = (Number(id) - 11) / 10;
  const inchSpan = document.getElementsByClassName("inchSpan")[spanIndex];
  if (inchSpan) {
    inchSpan.setAttribute("style", "margin-left: " + n + "em;");
  }
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
  const tbody = document.getElementById("OutputTable").getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  const fragment = document.createDocumentFragment();

  // Round header
  const roundHeading = document.createElement("tr");
  roundHeading.innerHTML = `<td rowspan="2" id="R1C"></td><td colspan="5"><small id="HeadText">Round duct:</small></td>`;
  fragment.appendChild(roundHeading);

  // Round row
  const round = options.find((item) => item.type === "round");
  if (round) {
    const roundRow = document.createElement("tr");
    roundRow.innerHTML = `<td class="size-cell"><div class="size-spinner size-spinner--left"><div class="stepper size-stepper"><button type="button" class="step-btn size-stepbtn step-btn--up" aria-label="Increase round duct size" onclick="stepRoundSize(2)">▲</button><button type="button" class="step-btn size-stepbtn step-btn--down" aria-label="Decrease round duct size" onclick="stepRoundSize(-2)">▼</button></div><input class="size-input" type="number" dir="rtl" name="Ldsize" id="00" min="4" step="2" value="${round.diameter}" oninput="CalcMeRnd()" required><span class="size-unit">"Ø</span></div></td>
        <td class="Vel" id="01">${round.velocity}</td>
        <td><small>FPM</small></td>
        <td class="StLoss" id="02">${round.staticLoss}</td>
        <td><small>inWg/100ft</small></td>`;
    fragment.appendChild(roundRow);
  }

  // Rectangular header
  const rectOptions = options.filter((item) => item.type === "rect");
  const rectRowSpan = Math.max(rectOptions.length + 1, 2);
  const rectHeading = document.createElement("tr");
  rectHeading.innerHTML = `<td rowspan="${rectRowSpan}" id="R2C"></td><td colspan="5"><small>Rectangular duct:</small></td>`;
  fragment.appendChild(rectHeading);

  // Rectangular rows
  let rowIndex = 1;
  const inchSpanIds = [];
  rectOptions.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td class="size-cell"><input type="number" dir="rtl" name="Ldsize" id="${rowIndex}0" step="2" min="4" value="${item.width}"
                oninput="CalcMeRec(${rowIndex})" required>"x
            <input type="number" name="Rdsize" step="2" min="4" value="${item.height}" oninput="CalcMeRec(${rowIndex})" id="${rowIndex}1"
                required><span class="inchSpan">"</span>
        </td>
        <td class="Vel" id="${rowIndex}2">${item.velocity}</td>
        <td><small>FPM</small></td>
        <td class="StLoss" id="${rowIndex}3">${item.staticLoss}</td>
        <td><small>inWg/100ft</small></td>`;
    fragment.appendChild(row);
    inchSpanIds.push(`${rowIndex}1`);
    rowIndex += 1;
  });

  tbody.appendChild(fragment);

  inchSpanIds.forEach((id) => FitAapostrophe(id));
}

function showInputError(message) {
  const tbody = document.getElementById("OutputTable").getElementsByTagName("tbody")[0];
  tbody.innerHTML = `<tr><td colspan="6">${message}</td></tr>`;
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
    KeyPressed();
  }
}

function injectSizeSpinnerStyles() {
  const css = `
    .size-spinner { display: inline-flex; align-items: center; gap: 0; }
    .size-spinner .stepper { margin: 0; }
    .size-input { margin: 0; }
    .size-unit { margin-left: 0; padding-left: 0.25em; }
  `;
  const s = document.createElement("style");
  s.type = "text/css";
  s.appendChild(document.createTextNode(css));
  document.head.appendChild(s);
}

document.addEventListener("DOMContentLoaded", function () {
  injectSizeSpinnerStyles();
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
