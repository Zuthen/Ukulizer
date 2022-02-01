"use strict";
import { findNotesIndexes, cutAdditionalStrings } from "./strings.js";
import {
  ukuleleBasicOctaveTranspose,
  isTransposeToOtherStingNeededAfterOctaveTranspose,
  addTwelve,
} from "./ukuleleStrings.js";
/*
  MAP
  UKULELE low g: 
  string  index   note
  0       0       A4
  1       0       E4
  2       0       C4
  3       0       G3

  0       5        A4    
  1       10       A4    
  2       14       A4    
  3       19       A4    
  4       24       A4    
  5       29       A4    
*/

export const findNoteOnOtherString = function (stringNumber, note, noteIndex) {
  const ukuleleFretLength = 18; // might be configurable in the future
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
  const mappedString = stringMap[stringNumber];
  const newNotes = [];
  const addToNewNotes = function (noteToAdjust, stringMapItem) {
    newNotes.push({
      string: stringNumber,
      noteIndex: noteIndex,
      stringToMove: stringMapItem.stringIndex,
      newNote: stringMapItem.noteDifference + noteToAdjust,
    });
  };
  if (
    mappedString.goUp !== undefined &&
    mappedString.goUp.noteDifference + note >= 0
  ) {
    let currentNote = note;
    let currentStringMap = stringMap[stringNumber];
    while (currentStringMap.goUp !== undefined) {
      if (currentNote + currentStringMap.goUp.noteDifference >= 0)
        addToNewNotes(currentNote, currentStringMap.goUp);
      if (stringMap[currentStringMap.goUp.stringIndex] === undefined) break;
      currentNote += currentStringMap.goUp.noteDifference;
      currentStringMap = stringMap[currentStringMap.goUp.stringIndex];
    }
  } else if (
    mappedString.goDown !== undefined &&
    mappedString.goDown.noteDifference + note <= ukuleleFretLength
  ) {
    let currentNote = note;
    let currentStringMap = stringMap[stringNumber];
    while (
      currentNote <= ukuleleFretLength &&
      currentStringMap.goDown !== undefined
    ) {
      if (currentNote + currentStringMap.goDown.noteDifference >= 0)
        addToNewNotes(currentNote, currentStringMap.goDown);
      if (stringMap[currentStringMap.goDown.stringIndex] === undefined) break;
      currentNote += currentStringMap.goDown.noteDifference;
      currentStringMap = stringMap[currentStringMap.goDown.stringIndex];
    }
  }
  return newNotes;
};
export const findNotesToTranspose = function (strings) {
  const transposeStrings = [];
  for (let i = 3; i >= 0; i--) {
    let stringsIndexes = findNotesIndexes(strings[i]);
    stringsIndexes.forEach((noteIndex) => {
      if (strings[i][noteIndex] < 0) {
        transposeStrings.push({
          stringId: i,
          noteIndex: noteIndex,
          string: strings[i],
        });
      }
    });
  }
  for (let i = 4; i < 6; i++) {
    let notesIndexes = findNotesIndexes(strings[i]);
    notesIndexes.forEach((noteIndex) => {
      if (typeof strings[i][noteIndex] === "number")
        transposeStrings.push({
          stringId: i,
          noteIndex: noteIndex,
          string: strings[i],
        });
    });
  }
  return transposeStrings;
};
const isArrayElementNumber = function (array, arrayRow, arrayIndex) {
  return typeof array[arrayRow][arrayIndex] === "number" ? true : false;
};

const moveToOtherString = function (guitarTab, transposeDataForOneNote) {
  let movedSuccesfully = false;
  for (let i = 0; i < transposeDataForOneNote.length; i++) {
    if (
      !isArrayElementNumber(
        guitarTab,
        transposeDataForOneNote[i].stringToMove,
        transposeDataForOneNote[i].noteIndex
      )
    ) {
      guitarTab[transposeDataForOneNote[i].string].splice(
        transposeDataForOneNote[i].noteIndex,
        1,
        "—"
      );
      guitarTab[transposeDataForOneNote[i].stringToMove].splice(
        transposeDataForOneNote[i].noteIndex,
        1,
        transposeDataForOneNote[i].newNote
      );
      movedSuccesfully = true;
      break;
    }
  }
  return movedSuccesfully;
};
const findNotesOnOtherString = function (notesToTransform) {
  const transposeData = [];
  notesToTransform.forEach((note) => {
    let noteValue = note.string[note.noteIndex];
    let data = findNoteOnOtherString(note.stringId, noteValue, note.noteIndex);
    transposeData.push(data);
  });
  return transposeData;
};

export const transpose = function (guitarTab) {
  const tabToTranspose = JSON.parse(JSON.stringify(guitarTab));

  const notesToTranspose = findNotesToTranspose(tabToTranspose);

  const transposeSucceded = [];
  const transposeData = findNotesOnOtherString(notesToTranspose);
  transposeData.forEach((data) => {
    transposeSucceded.push(moveToOtherString(tabToTranspose, data));
  });
  if (!transposeSucceded.includes(false)) {
    const result = cutAdditionalStrings(tabToTranspose);
    return result;
  } else {
    const ukuleleTab = transposeOctave(guitarTab);
    const result = cutAdditionalStrings(ukuleleTab);
    return result;
  }
};
export const findNotesToTransposeAfterOctaveTranspose = function (
  strings,
  ukuleleFretLength
) {
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
  for (let i = 4; i < 6; i++) {
    let notesIndexes = findNotesIndexes(strings[i]);
    notesIndexes.forEach((noteIndex) => {
      if (typeof strings[i][noteIndex] === "number")
        transposeStrings.push({
          stringId: i,
          noteIndex: noteIndex,
          string: strings[i],
        });
    });
  }
  return transposeStrings;
};
export const transposeOctave = function (guitarTab) {
  ukuleleBasicOctaveTranspose(guitarTab);
  const ukuleleFretLength = 18; // might be configurable in the future
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
    } else return Error(`Transpose failed`);
  } else return guitarTab;
};

export const transposeToHighG = function (ukuleleTab) {
  const ukuleleFretLength = 18; // might be configurable in the future
  addTwelve(ukuleleTab[3]);
  const moveTocString = function (ukuleleTabLine) {
    let result = false;
    const notes = findNotesIndexes(ukuleleTabLine);
    notes.forEach((note) => {
      if (ukuleleTabLine[note] > ukuleleFretLength) result = true;
    });
    return result;
  };
  const findNotesToMove = function (ukuleleTabLine) {
    const notes = findNotesIndexes(ukuleleTabLine);
    const notesToMove = [];
    notes.forEach((note) => {
      if (ukuleleTabLine[note] > ukuleleFretLength) {
        notesToMove.push(findNoteOnOtherString(3, ukuleleTabLine[note], note));
      }
    });
    return notesToMove;
  };
  if (moveTocString(ukuleleTab[3])) {
    const moveNotes = findNotesToMove(ukuleleTab[3]);
    moveNotes.forEach((note) => {
      moveToOtherString(ukuleleTab, note);
    });
  }
  return ukuleleTab;
};

// TODO: fix notes spaces when moved note is > 9
// TODO: fix dashes ending
// TODO: fretLength as parameter
// TODO: export to pdf with song and author name
