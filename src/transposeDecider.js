"use strict";
import { findNotesIndexes } from "./strings.js";

const areNotesOnAEstrings = function (strings) {
  let notesOnAE = false;
  if (strings[4] !== undefined && strings[5] !== undefined) {
    let aeNotesIndexes = findNotesIndexes(strings[4]).concat(
      findNotesIndexes(strings[5])
    );
    if (aeNotesIndexes.length > 0) notesOnAE = true;
  }
  return notesOnAE;
};

const areNotesBelowZero = function (strings) {
  let notesLessThanZero = false;
  strings.forEach((string) => {
    const allStringNotes = findNotesIndexes(string);
    allStringNotes.forEach((noteIndex) => {
      if (string[noteIndex] < 0) notesLessThanZero = true;
    });
  });
  return notesLessThanZero;
};

const areNotesHigherThanFret = function (strings, fretLength) {
  let notesHigherThanFret = false;
  strings.forEach((string) => {
    const allStringNotes = findNotesIndexes(string);
    allStringNotes.forEach((noteIndex) => {
      if (string[noteIndex] > fretLength) notesHigherThanFret = true;
    });
  });
  return notesHigherThanFret;
};

export const isTransposeNeeded = function (strings, fretLength) {
  const notesOnAE = areNotesOnAEstrings(strings);
  const notesBelowZero = areNotesBelowZero(strings);
  const notesHigherThanFret = areNotesHigherThanFret(strings, fretLength);
  return notesOnAE || notesBelowZero || notesHigherThanFret;
};
