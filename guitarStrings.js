"use strict";
import { findNotesIndexes } from "./strings.js";
export function splitGuitarTabByStrings(guitarTab) {
  let newstrings = guitarTab.split("\n");
  if (newstrings.length !== 6)
    console.error(
      `Unexpected tab lines count: ${newstrings.length}. Expected exactly 6 lines`
    );
  else return newstrings;
}
export const substractFive = function (tabLine) {
  for (let i = 0; i < tabLine.length; i++) {
    if (typeof tabLine[i] != "number") continue;
    tabLine[i] = tabLine[i] - 5;
  }
};

export const ebgdBasicConvert = function (tabSplittedByStrings) {
  for (let i = 0; i < tabSplittedByStrings.length; i++)
    substractFive(tabSplittedByStrings[i]);
};

export const changeStringNames = function (convertedTabSplittedByNotes) {
  convertedTabSplittedByNotes[0][0] = "A";
  convertedTabSplittedByNotes[1][0] = "E";
  convertedTabSplittedByNotes[2][0] = "C";
  convertedTabSplittedByNotes[3][0] = "G";
};

export const hasNotesOnAEstrings = function (tabLines) {
  const aStringNotes = findNotesIndexes(tabLines[4]);
  const eStringNotes = findNotesIndexes(tabLines[5]);
  if (aStringNotes.length !== 0) return true;
  else if (eStringNotes.length !== 0) return true;
  else return false;
};
