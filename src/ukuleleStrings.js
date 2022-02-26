"use strict";
import { findNotesIndexes } from "./strings.js";

export const addTwelve = function (tabLine) {
  for (let i = 0; i < tabLine.length; i++) {
    if (typeof tabLine[i] != "number") continue;
    tabLine[i] = tabLine[i] + 12;
  }
};

export const substractTwelve = function (tabLine) {
  for (let i = 0; i < tabLine.length; i++) {
    if (typeof tabLine[i] != "number") continue;
    tabLine[i] = tabLine[i] - 12;
  }
};

export const ukuleleBasicOctaveTranspose = function (tabSplittedByStrings) {
  for (let i = 0; i < tabSplittedByStrings.length; i++)
    addTwelve(tabSplittedByStrings[i]);
};
