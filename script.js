"use strict";

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

const splitGuitarTabByStrings = function (guitarTab) {
  let newstrings = guitarTab.split("\n");
  if (newstrings.length !== 6)
    console.error(
      `Unexpected tab lines count: ${newstrings.length}. Expected exactly 6 lines`
    );
  else return newstrings;
};

const mergeNumbers = function (tabLine) {
  const removedIndexes = [];
  for (let i = 1; i < tabLine.length - 1; i++) {
    if (
      tabLine[i] === "|" ||
      tabLine[i] === "-" ||
      tabLine[i + 1] === "|" ||
      tabLine[i + 1] === "-"
    )
      continue;
    tabLine[i] = tabLine[i] + tabLine[i + 1];
    removedIndexes.push(i + 1);
    tabLine.splice(i + 1, 1);
  }
  return removedIndexes;
};

const convertToNumber = function (tabline) {
  for (let i = 1; i < tabline.length; i++) {
    if (tabline[i] === "|" || tabline[i] === "-") continue;
    tabline[i] = Number(tabline[i]);
  }
};

const removeDuplicates = function (array) {
  let uniqueChars = [];
  array.forEach((c) => {
    if (!uniqueChars.includes(c)) {
      uniqueChars.push(c);
    }
  });
  return uniqueChars;
};

const removeDuplicatedDash = function (indexesToRemove, array) {
  indexesToRemove.forEach((element) => {
    if (array[element] === "-" && array[element - 1] === "-")
      array.splice(element, 1);
  });
};
const adjustEnd = function (tables) {
  const lastNotes = [];
  tables.forEach((table) => {
    let lastNote = 0;
    for (let i = 0; i < table.length; i++) {
      if (typeof table[i] === "number") lastNote = i;
    }
    lastNotes.push(lastNote);
  });
  let max = lastNotes[0];
  for (let i = 0; i < lastNotes.length; i++) {
    if (lastNotes[i] > max) max = lastNotes[i];
  }

  tables.forEach((table) => {
    let lenghtDifference = table.length - max;
    if (lenghtDifference > 0) {
      for (let i = table.length; i > max; i--) {
        table.splice(i, 1);
      }
    }
    table.push("-", "-", "|");
  });
};
const splitStringsByNotes = function (tabLines, stringNames) {
  const strings = [];
  let removedIndexes = [];
  for (let i = 0; i < stringNames.length; i++) {
    strings[i] = Array.from(tabLines[i]);
    if (strings[i][0] !== stringNames[i])
      console.error(`Unexpected Guitar String Name : ${strings[i]}`);
    mergeNumbers(strings[i]).forEach((element) => {
      removedIndexes.push(element);
    });
  }
  removedIndexes = removeDuplicates(removedIndexes);
  strings.forEach((string) => {
    removeDuplicatedDash(removedIndexes, string);
    convertToNumber(string);
  });
  adjustEnd(strings);
  return strings;
};

const substractFive = function (tabLine) {
  for (let i = 0; i < tabLine.length; i++) {
    if (typeof tabLine[i] != "number") continue;
    let digitsBeforeSubstraction = String(tabLine[i]).length;
    tabLine[i] = tabLine[i] - 5;
  }
};

const ebgdSimpleConvert = function (tabSplittedByStrings) {
  for (let i = 0; i < 4; i++) substractFive(tabSplittedByStrings[i]);
  return tabSplittedByStrings;
};

const changeStringNames = function (convertedTabSplittedByNotes) {
  convertedTabSplittedByNotes[0][0] = "A";
  convertedTabSplittedByNotes[1][0] = "E";
  convertedTabSplittedByNotes[2][0] = "C";
  convertedTabSplittedByNotes[3][0] = "G";

  const aString = convertedTabSplittedByNotes[0];
  const eString = convertedTabSplittedByNotes[1];
  const cString = convertedTabSplittedByNotes[2];
  const lowGstring = convertedTabSplittedByNotes[3];

  return [aString, eString, cString, lowGstring];
};

/*
Conversion cases:
Case 1 = all notes on eBGD
    1.1 all notes >= 5 =>> ebgdSimpleConvert
    1.2 notes < 5 =>> find note on other string
Case 2 = notes on AE strins
    2.1 notes higher than their minimums =>> find note on other string
    2.2 notes lower than minimum =>> TRANSPOSE!!!!
*/

function addTable(resultTable, stringLines) {
  let table = document.createElement("TABLE");
  table.border = "1";

  let tableBody = document.createElement("TBODY");
  table.appendChild(tableBody);

  for (let i = 0; i < stringLines.length; i++) {
    let tr = document.createElement("TR");
    tableBody.appendChild(tr);

    for (let j = 0; j < stringLines[i].length; j++) {
      let td = document.createElement("TD");
      td.width = "75";
      td.appendChild(document.createTextNode(stringLines[i][j]));
      tr.appendChild(td);
    }
  }
  resultTable.appendChild(table);
}

init();
convertButton.addEventListener("click", function () {
  tabInputText = document.getElementById("guitar-tab").value;
  const strings = splitGuitarTabByStrings(tabInputText);
  const tabSplittedByStrings = splitStringsByNotes(strings, guitarStringNames);
  const simpleConvert = ebgdSimpleConvert(tabSplittedByStrings);
  const formattedResult = changeStringNames(simpleConvert);
  console.log(formattedResult);
  addTable(lowGResultTable, formattedResult);
  showResults();
});
