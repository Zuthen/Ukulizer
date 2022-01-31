"use strict";
import { splitGuitarTabByStrings, ebgdBasicConvert } from "./guitarStrings.js";

import { prepareForConvert, removeRedunantDashes } from "./strings.js";
import { addTable } from "./ui.js";
import { convert } from "./converter.js";

const convertButton = document.getElementById("convert");
let tabInputText;
const guitarStringNames = ["e", "B", "G", "D", "A", "E"];
const lowGResultTable = document.getElementById("lowGResult");

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
  const tabSplittedByNotes = prepareForConvert(strings, guitarStringNames);
  const result = convert(tabSplittedByNotes);
  addTable(lowGResultTable, result);
  showResults();
});
