"use strict";
import { splitGuitarTabByStrings, ebgdBasicConvert } from "./guitarStrings.js";

import { prepareForConvert, removeRedunantDashes } from "./strings.js";
import { addTable } from "./ui.js";
import { convert } from "./converter.js";

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
    addTable(resultTableUi, result);
    resultTableUi.classList.remove("hidden");
  }
}
init();
convertButton.addEventListener("click", function () {
  tabInputText = document.getElementById("guitar-tab").value;
  const strings = splitGuitarTabByStrings(tabInputText);
  const tabSplittedByNotes = prepareForConvert(strings);
  const result = convert(tabSplittedByNotes);
  showResult(lowGResultTable, result.lowGresult);
  showResult(highGResultTable, result.highGresult);
});
