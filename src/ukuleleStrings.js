"use strict";
import { findNotesIndexes } from "./strings.js";

export const addTwelve = function (tabLine) {
  for (let i = 0; i < tabLine.length; i++) {
    if (typeof tabLine[i] != "number") continue;
    tabLine[i] = tabLine[i] + 12;
  }
};

export const ukuleleBasicOctaveTranspose = function (tabSplittedByStrings) {
  for (let i = 0; i < tabSplittedByStrings.length; i++)
    addTwelve(tabSplittedByStrings[i]);
};

export const isTransposeToOtherStingNeededAfterOctaveTranspose = function (
  strings,
  ukuleleFretLength
) {
  let result = false;
  let aeNotesIndexes = findNotesIndexes(strings[4]).concat(
    findNotesIndexes(strings[5])
  );
  if (aeNotesIndexes.length > 0) return (result = true);
  strings.forEach((string) => {
    const allStringNotes = findNotesIndexes(string);
    allStringNotes.forEach((noteIndex) => {
      if (string[noteIndex] > ukuleleFretLength) result = true;
    });
  });
  return result;
};