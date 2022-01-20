"use strict";
import {
  splitGuitarTabByStrings,
  ebgdBasicConvert as ebgdBasicConvert,
  changeStringNames,
} from "./guitarStrings.js";

import { splitStringsByNotes } from "./strings.js";
import { addTable } from "./ui.js";

/*
Conversion cases:
Case 1 = all notes on eBGD
    1.1 all notes >= 5 =>> ebgdSimpleConvert
    1.2 notes < 5 =>> find note on other string
Case 2 = notes on AE strins
    2.1 notes higher than their minimums =>> find note on other string
    2.2 notes lower than minimum =>> TRANSPOSE!!!!
*/

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
  const tabSplittedByNotes = splitStringsByNotes(strings, guitarStringNames);
  const basicConvert = ebgdBasicConvert(tabSplittedByNotes);
  const formattedResult = changeStringNames(basicConvert);
  addTable(lowGResultTable, formattedResult);
  showResults();
});
