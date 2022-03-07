"use strict";
import { findNotesIndexes } from "./strings.js";

export const findBarreChords = function (tabToCheck) {
  const barreChordsIndexes = [];
  const notesIndexes = findNotesIndexes(tabToCheck[0]);
  notesIndexes.forEach((noteIndex) => {
    let barreChord = true;
    tabToCheck.forEach((string) => {
      if (string[noteIndex] != tabToCheck[0][noteIndex]) barreChord = false;
    });
    if (barreChord) barreChordsIndexes.push(noteIndex);
  });
  return barreChordsIndexes;
};

export const adjustForUkuleleBarres = function (tabForAdjust) {
  const notesToAdjust = findBarreChords(tabForAdjust);
  notesToAdjust.forEach((noteIndex) => {
    tabForAdjust[4].splice(noteIndex, 1, "—");
    tabForAdjust[5].splice(noteIndex, 1, "—");
  });
};
