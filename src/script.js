"use strict";
import { splitGuitarTabByStrings, ebgdBasicConvert } from "./guitarStrings.js";

import { prepareForConvert, removeRedunantDashes } from "./strings.js";
import { addTable } from "./ui.js";
import { convert } from "./converter.js";

const convertButton = document.getElementById("convert");
let tabInputText;
const lowGResultTable = document.getElementById("lowGResult");
const highGResultTable = document.getElementById("highGResult");

function init() {
  const results = document.querySelectorAll(".result");
  results.forEach((result) => result.classList.add("hidden"));
}

function showResults() {
  const results = document.querySelectorAll(".result");
  results.forEach((result) => result.classList.remove("hidden"));
}
init();
convertButton.addEventListener("click", function () {
  tabInputText = document.getElementById("guitar-tab").value;
  const strings = splitGuitarTabByStrings(tabInputText);
  const tabSplittedByNotes = prepareForConvert(strings);
  console.log(`co dostaje convert`, tabSplittedByNotes);
  const result = convert(tabSplittedByNotes);
  console.log(`co zwraca convert`, result);
  addTable(lowGResultTable, result.lowGresult);
  addTable(highGResultTable, result.highGresult);
  showResults();
});
