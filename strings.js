"use strict";
export const mergeNumbers = function (tabLine) {
  for (let i = 1; i < tabLine.length - 1; i++) {
    if (isNaN(tabLine[i]) || isNaN(tabLine[i + 1])) continue;
    tabLine[i] = tabLine[i] + tabLine[i + 1];
    tabLine[i + 1] = "*";
  }
};

export const convertToNumber = function (tabline) {
  for (let i = 1; i < tabline.length; i++) {
    if (isNaN(tabline[i])) continue;
    tabline[i] = Number(tabline[i]);
  }
};
const includesAsterisk = function (array) {
  return array.includes("*");
};

export const removeRedunantDashes = function (strings) {
  findStringDifferences(strings[0], strings[1]);
  for (let i = 0; i < strings.length; i++) {
    while (includesAsterisk(strings[i])) {
      let indexToRemove = strings[i].indexOf("*");
      strings[i].splice(indexToRemove, 1);
    }
  }
  return strings;
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

const validateStringName = function (firstElement, stringName) {
  if (firstElement != stringName)
    console.error(`Unexpected Guitar String Name : ${firstElement}`);
};
const splitArrayByChar = function (array) {
  return Array.from(array);
};

export const prepareForConvert = function (tabLines, stringNames) {
  const strings = [];
  for (let i = 0; i < stringNames.length; i++) {
    strings[i] = splitArrayByChar(tabLines[i]);
    validateStringName(strings[i][0], stringNames[i]);
    mergeNumbers(strings[i]);
    convertToNumber(strings[i]);
  }
  return strings;
};
