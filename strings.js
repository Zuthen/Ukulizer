"use strict";
export const mergeNumbers = function (tabLine) {
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

export const splitStringsByNotes = function (tabLines, stringNames) {
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
