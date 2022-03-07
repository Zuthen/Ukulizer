"use strict";

import { findNotesIndexes } from "./strings";

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
