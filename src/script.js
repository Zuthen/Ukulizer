"use strict";
import { splitGuitarTabByStrings } from "./guitarStrings.js";
import { convertToLowG, convertToHighG } from "./converter.js";
import { addTableWarning, addTable } from "./ui.js";

let tabInputText;
let isConverted;
const convertButton = document.getElementById("convert");
const lowGResultTable = document.getElementById("lowGResult");
const highGResultTable = document.getElementById("highGResult");
const fretLengthInput = document.getElementById("fretLength");
const generatePdfButton = document.getElementById("generate-pdf");

function init() {
  const results = document.querySelectorAll(".result");
  results.forEach((result) => result.classList.add("hidden"));
  generatePdfButton.classList.add("hidden");
}
function showResult(resultTableUi, result) {
  if (result) {
    let tableId = resultTableUi.id;
    if (result.transposed)
      addTableWarning(tableId, `⚠️ Transposed by an octave!`);
    addTable(resultTableUi, result.result);
    resultTableUi.classList.remove("hidden");
  }
}
export function getFretLength() {
  let result = Number(fretLengthInput.value);
  if (Number(result) === 0) return 18;
  else return result;
}

init();
convertButton.addEventListener("click", () => {
  tabInputText = document.getElementById("guitar-tab").value;
  const strings = splitGuitarTabByStrings(tabInputText);
  const fretLength = getFretLength();
  const lowGresult = convertToLowG(strings, fretLength);
  showResult(lowGResultTable, lowGresult);
  const higGresult = convertToHighG(strings, fretLength);
  showResult(highGResultTable, higGresult);
  const songTitle = document.getElementById("song-title").value;
  const artist = document.getElementById("artist").value;
  document.getElementById("pdf-song-title").textContent = songTitle;
  document.getElementById("pdf-artist").textContent = artist;
  isConverted = true;
});
generatePdfButton.addEventListener(
  "click",
  () => isConverted && window.print("")
);
