"use strict";
import { findNotesIndexes, cutAdditionalStrings } from "./strings.js";
import {
  ukuleleBasicOctaveTranspose,
  isTransposeToOtherStingNeededAfterOctaveTranspose,
  substractTwelve,
} from "./ukuleleStrings.js";
import { Toast } from "./toasts.js";

const stringMap = [
  { goDown: { stringIndex: 1, noteDifference: +5 } },
  {
    goUp: { stringIndex: 0, noteDifference: -5 },
    goDown: { stringIndex: 2, noteDifference: +4 },
  },
  {
    goUp: { stringIndex: 1, noteDifference: -4 },
    goDown: { stringIndex: 3, noteDifference: +5 },
  },
  { goUp: { stringIndex: 2, noteDifference: -5 } },
  { goUp: { stringIndex: 3, noteDifference: -5 } },
  { goUp: { stringIndex: 3, noteDifference: -10 } },
];

const addGoUp = function (note, stringNumber, noteIndex) {
  const newNotes = [];
  let currentStringMap = stringMap[stringNumber];
  let currentNote = note;
  while (currentStringMap.goUp !== undefined) {
    if (currentNote + currentStringMap.goUp.noteDifference >= 0)
      newNotes.push({
        string: stringNumber,
        noteIndex: noteIndex,
        stringToMove: currentStringMap.goUp.stringIndex,
        newNote: currentStringMap.goUp.noteDifference + currentNote,
      });
    if (stringMap[currentStringMap.goUp.stringIndex] === undefined) break;
    currentNote += currentStringMap.goUp.noteDifference;
    currentStringMap = stringMap[currentStringMap.goUp.stringIndex];
  }
  return newNotes;
};

const addGoDown = function (note, stringNumber, noteIndex, ukuleleFretLength) {
  const newNotes = [];
  let currentStringMap = stringMap[stringNumber];
  let currentNote = note;
  while (
    currentNote <= ukuleleFretLength &&
    currentStringMap.goDown !== undefined
  ) {
    if (currentNote + currentStringMap.goDown.noteDifference >= 0)
      newNotes.push({
        string: stringNumber,
        noteIndex: noteIndex,
        stringToMove: currentStringMap.goDown.stringIndex,
        newNote: currentStringMap.goDown.noteDifference + currentNote,
      });
    if (stringMap[currentStringMap.goDown.stringIndex] === undefined) break;
    currentNote += currentStringMap.goDown.noteDifference;
    currentStringMap = stringMap[currentStringMap.goDown.stringIndex];
  }
  return newNotes;
};

export const findNoteOnOtherString = function (
  stringNumber,
  note,
  noteIndex,
  fretLength
) {
  const mappedString = stringMap[stringNumber];
  let possibleUpMoves = [];
  let possibleDownMoves = [];
  if (
    mappedString.goUp !== undefined &&
    mappedString.goUp.noteDifference + note >= 0
  ) {
    possibleUpMoves = addGoUp(note, stringNumber, noteIndex);
  }
  if (
    mappedString.goDown !== undefined &&
    mappedString.goDown.noteDifference + note <= fretLength
  ) {
    possibleDownMoves = addGoDown(note, stringNumber, noteIndex, fretLength);
  }
  return possibleUpMoves.concat(possibleDownMoves);
};
const findNotesToTransposeWhenNoteBelowZero = function (strings) {
  const notesBelowZero = [];
  for (let i = 3; i >= 0; i--) {
    let stringsIndexes = findNotesIndexes(strings[i]);
    stringsIndexes.forEach((noteIndex) => {
      if (strings[i][noteIndex] < 0) {
        notesBelowZero.push({
          stringId: i,
          noteIndex: noteIndex,
          string: strings[i],
        });
      }
    });
  }
  return notesBelowZero;
};

const findNotesToTransposeWhenNotesOnLowStrings = function (strings) {
  const notesOnLowStrings = [];
  for (let i = 4; i < 6; i++) {
    let notesIndexes = findNotesIndexes(strings[i]);
    notesIndexes.forEach((noteIndex) => {
      if (typeof strings[i][noteIndex] === "number")
        notesOnLowStrings.push({
          stringId: i,
          noteIndex: noteIndex,
          string: strings[i],
        });
    });
  }
  return notesOnLowStrings;
};
export const findNotesToTranspose = function (strings) {
  const notesBelowZero = findNotesToTransposeWhenNoteBelowZero(strings);
  const notesOnLowStrings = findNotesToTransposeWhenNotesOnLowStrings(strings);
  const transposeStrings = notesBelowZero.concat(notesOnLowStrings);
  return transposeStrings;
};

const isArrayElementNumber = function (array, arrayRow, arrayIndex) {
  return typeof array[arrayRow][arrayIndex] === "number" ? true : false;
};

const moveToOtherString = function (guitarTab, transposeDataForOneNote) {
  let movedSuccesfully = false;
  for (let i = 0; i < transposeDataForOneNote.length; i++) {
    let currentString = transposeDataForOneNote[i].string;
    let newString = transposeDataForOneNote[i].stringToMove;
    let noteIndex = transposeDataForOneNote[i].noteIndex;
    let newNote = transposeDataForOneNote[i].newNote;
    if (!isArrayElementNumber(guitarTab, newString, noteIndex)) {
      guitarTab[currentString].splice(noteIndex, 1, "—");
      if (guitarTab[currentString][noteIndex + 1] === "*")
        guitarTab[newString][noteIndex + 1] = "*";
      for (let i = 0; i < guitarTab.length; i++) {
        if (
          isNaN(
            guitarTab[i][noteIndex + 1] && isNaN(guitarTab[i][noteIndex])
          ) &&
          i !== newString &&
          i !== currentString
        )
          guitarTab[i].splice(noteIndex + 1, 1, "*");
      }
      guitarTab[newString].splice(noteIndex, 1, newNote);
      movedSuccesfully = true;
      break;
    }
  }
  return movedSuccesfully;
};
const findNotesOnOtherString = function (notesToTransform, fretLength) {
  const transposeData = [];
  notesToTransform.forEach((note) => {
    let noteValue = note.string[note.noteIndex];
    let data = findNoteOnOtherString(
      note.stringId,
      noteValue,
      note.noteIndex,
      fretLength
    );
    transposeData.push(data);
  });
  return transposeData;
};

export const transpose = function (guitarTab, ukuleleFretLength) {
  const tabToTranspose = guitarTab.map((item) => Array.from(item));
  const notesToTranspose = findNotesToTranspose(tabToTranspose);
  const transposeSucceded = [];
  const transposeData = findNotesOnOtherString(
    notesToTranspose,
    ukuleleFretLength
  );
  transposeData.forEach((data) => {
    transposeSucceded.push(moveToOtherString(tabToTranspose, data));
  });
  const success = !transposeSucceded.includes(false);

  if (success) {
    const result = cutAdditionalStrings(tabToTranspose);
    return { result: result, transposed: false };
  } else {
    const ukuleleTab = transposeOctave(guitarTab, ukuleleFretLength);
    const result = cutAdditionalStrings(ukuleleTab);
    return { result: result, transposed: true };
  }
};
export const findNotesToTransposeAfterOctaveTranspose = function (
  strings,
  ukuleleFretLength
) {
  let notesOnLowStrings = [];
  const transposeStrings = [];
  for (let i = 3; i >= 0; i--) {
    let stringsIndexes = findNotesIndexes(strings[i]);
    stringsIndexes.forEach((noteIndex) => {
      if (strings[i][noteIndex] > ukuleleFretLength) {
        transposeStrings.push({
          stringId: i,
          noteIndex: noteIndex,
          string: strings[i],
        });
      }
    });
  }
  if (strings.length > 4) {
    notesOnLowStrings = findNotesToTransposeWhenNotesOnLowStrings(strings);
  }
  return transposeStrings.concat(notesOnLowStrings);
};
export const transposeOctave = function (guitarTab, ukuleleFretLength) {
  ukuleleBasicOctaveTranspose(guitarTab);
  const moveToOtherStrings = isTransposeToOtherStingNeededAfterOctaveTranspose(
    guitarTab,
    ukuleleFretLength
  );
  if (moveToOtherStrings) {
    const notesToTranspose = findNotesToTransposeAfterOctaveTranspose(
      guitarTab,
      ukuleleFretLength
    );
    const transposeSucceded = [];
    const transposeData = findNotesOnOtherString(notesToTranspose);
    transposeData.forEach((data) => {
      transposeSucceded.push(moveToOtherString(guitarTab, data));
    });
    if (!transposeSucceded.includes(false)) {
      return guitarTab;
    } else {
      new Toast({
        message:
          "Transposition failed. Tab is unconvertible or this solution is not good enough ",
        type: "danger",
      });
      throw `Transpose failed`;
    }
  } else return guitarTab;
};
const findNotesToMoveForGString = function (ukuleleTabLine, fretLength) {
  const notes = findNotesIndexes(ukuleleTabLine);
  const notesToMove = [];
  notes.forEach((note) => {
    if (ukuleleTabLine[note] >= fretLength || ukuleleTabLine[note] < 0) {
      notesToMove.push(
        findNoteOnOtherString(3, ukuleleTabLine[note], note, fretLength)
      );
    }
  });
  return notesToMove;
};
const moveTocStringNeeded = function (ukuleleTabLine, ukuleleFretLength) {
  let result = false;
  const notes = findNotesIndexes(ukuleleTabLine);
  notes.forEach((note) => {
    if (ukuleleTabLine[note] > ukuleleFretLength) result = true;
  });
  return result;
};
const moveHighGNotes = function (ukuleleTab, fretLength) {
  const moveNotes = findNotesToMoveForGString(ukuleleTab[3], fretLength);
  const transposeSucceded = [];
  moveNotes.forEach((note) => {
    transposeSucceded.push(moveToOtherString(ukuleleTab, note));
  });
  return transposeSucceded;
};

const transposeOctaveNeededForHighG = function (notesIndexes, string) {
  let transposeOctaveNeeded = false;
  notesIndexes.forEach((note) => {
    if (string[note] < 0) transposeOctaveNeeded = true;
  });
  return transposeOctaveNeeded;
};
export const transposeToHighG = function (ukuleleTab, ukuleleFretLength) {
  let transposed = false;
  substractTwelve(ukuleleTab[3]);
  const notesIndexes = findNotesIndexes(ukuleleTab[3]);
  const transposeOctaveNeeded = transposeOctaveNeededForHighG(
    notesIndexes,
    ukuleleTab[3]
  );
  if (transposeOctaveNeeded) {
    transposeOctave(ukuleleTab);
    transposed = true;
  }
  const moveTocString = moveTocStringNeeded(ukuleleTab[3], ukuleleFretLength);
  if (moveTocString) {
    const transposeSucceded = moveHighGNotes(ukuleleTab, ukuleleFretLength);
    if (transposeSucceded)
      return { result: ukuleleTab, transposed: transposed };
    else {
      new Toast({
        message:
          "Transposition failed. Tab is unconvertible or this solution is not good enough ",
        type: "danger",
      });
      throw `Transpose failed`;
    }
  }
  return { result: ukuleleTab, transposed: transposed };
};

// TODO: export to pdf with song and author name
