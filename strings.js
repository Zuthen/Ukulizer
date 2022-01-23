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
const addAdditionalDashesOnBeggining = function (notesArray, dashesCount) {
  for (let i = 0; i < dashesCount; i++) {
    notesArray.splice(2, 0, "-");
  }
};
const removeAllAsterisks = function (notesArray) {
  const removedIndexes = [];
  while (includesAsterisk(notesArray)) {
    let indexToRemove = notesArray.indexOf("*");
    notesArray.splice(indexToRemove, 1);
    removedIndexes.push(indexToRemove);
  }
  return removedIndexes;
};

const verifyIndexes = function (indexesArray, arrayElement) {
  if (indexesArray.length === 0) return 0;
  else return indexesArray[arrayElement];
};
const findNumbersIndexes = function (array) {
  const indexes = [];
  for (let i = 0; i < array.length; i++)
    if (typeof array[i] === "number") indexes.push(i);
  return indexes;
};

const findStringOffset = function (higherString, lowerString) {
  const higherStringIndexes = findNumbersIndexes(higherString);
  const lowerStringIndexes = findNumbersIndexes(lowerString);
  return (
    verifyIndexes(lowerStringIndexes, 0) -
    verifyIndexes(higherStringIndexes, higherStringIndexes.length - 1) -
    1
  );
};

const createOffestArray = function (strings) {
  const stringsOffset = [];
  for (let i = 1; i < strings.length; i++) {
    stringsOffset.push(findStringOffset(strings[0], strings[i]));
  }
  return stringsOffset;
};

export const removeRedunantDashes = function (strings) {
  const stringsOffset = createOffestArray(strings);
  strings.forEach((string) => {
    addAdditionalDashesOnBeggining(string, 20);
    removeAllAsterisks(string);
  });
  const stringsOffsetAfterRemove = createOffestArray(strings);
  for (let i = 1; i < strings.length; i++) {
    let offset = stringsOffsetAfterRemove[i - 1] - stringsOffset[i - 1];
    strings[i].splice(2, offset);
  }

  adjustEnd(strings);
  adjustStart(strings);
  return strings;
};

const lenghtDifference = function (lenght, number) {
  return lenght - number;
};

const adjustEnd = function (tables) {
  const lastNotes = [];
  tables.forEach((table) => {
    const numberIndexes = findNumbersIndexes(table);
    let elementToAdd = verifyIndexes(numberIndexes, numberIndexes.length - 1);
    lastNotes.push(elementToAdd);
  });
  let max = lastNotes[0];
  lastNotes.forEach((note) => (max = note > max ? note : max));

  tables.forEach((table) => {
    let difference = lenghtDifference(table.length, max + 1);
    if (difference > 0) table.splice(max + 1, difference);
    else {
      while (difference < 0) {
        table.push("-");
        difference = lenghtDifference(table.length, max + 1);
      }
    }
    table.push("-", "|");
  });
};

const adjustStart = function (tables) {
  const firstNotes = [];
  tables.forEach((table) => {
    const numberIndexes = findNumbersIndexes(table);
    firstNotes.push(numberIndexes[0]);
  });
  let min = firstNotes[0];
  firstNotes.forEach((note) => (min = note < min ? note : min));
  console.log(`MIN`, min);

  const dashesToRemoveCount = min - 3;
  tables.forEach((table) => {
    table.splice(2, dashesToRemoveCount);
  });
};

const validateStringName = function (firstElement, stringName) {
  if (firstElement != stringName)
    console.error(`Unexpected Guitar String Name : ${firstElement}`);
};
const splitArrayByChar = function (array) {
  return Array.from(array);
};

export const isTransposeToOtherStingNeeded = function (string) {
  const allStringNotes = findNumbersIndexes(string);
  let result = false;
  allStringNotes.forEach((noteIndex) => {
    if (string[noteIndex] < 0) result = true;
  });
  return result;
};

export const prepareForConvert = function (tabLines, stringNames) {
  const strings = [];
  for (let i = 0; i < stringNames.length; i++) {
    strings[i] = splitArrayByChar(tabLines[i]);
    validateStringName(strings[i][0], stringNames[i]);
    mergeNumbers(strings[i]);
    convertToNumber(strings[i]);
  }
  console.log(`prepareForConvert`, strings);
  return strings;
};
