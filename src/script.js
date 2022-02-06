"use strict";
import { splitGuitarTabByStrings } from "./guitarStrings.js";
import { addTable, addTableWarning } from "./ui.js";
import { convertToLowG, convertToHighG } from "./converter.js";

let tabInputText;
const convertButton = document.getElementById("convert");
const lowGResultTable = document.getElementById("lowGResult");
const highGResultTable = document.getElementById("highGResult");

function init() {
  const results = document.querySelectorAll(".result");
  results.forEach((result) => result.classList.add("hidden"));
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
init();
convertButton.addEventListener("click", function () {
  tabInputText = document.getElementById("guitar-tab").value;
  const strings = splitGuitarTabByStrings(tabInputText);
  const lowGresult = convertToLowG(strings);
  showResult(lowGResultTable, lowGresult);
  const higGresult = convertToHighG(strings);
  showResult(highGResultTable, higGresult);
});
