"use strict";
import { findNotesIndexes, cutAdditionalStrings } from "./strings.js";
import { ebgdBasicConvert } from "./guitarStrings.js";

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
    mappedString.goUp.noteDifference + note > 0
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
    mappedString.goDown.noteDifference + note < ukuleleFretLength
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
export const findNotesToTranspone = function (strings) {
  const transponeStrings = [];
  for (let i = 0; i < 4; i++) {
    const stringsIndexes = findNotesIndexes(strings[i]);
    stringsIndexes.forEach((noteIndex) => {
      if (strings[i][noteIndex] < 0) {
        transponeStrings.push({
          stringId: i,
          noteIndex: noteIndex,
          string: strings[i],
        });
      }
    });
  }
  for (let i = 4; i < 6; i++) {
    const notesIndexes = findNotesIndexes(strings[i]);
    notesIndexes.forEach((noteIndex) => {
      if (typeof strings[i][noteIndex] === "number")
        transponeStrings.push({
          stringId: i,
          noteIndex: noteIndex,
          string: strings[i],
        });
    });
  }
  return transponeStrings;
};

export const transpone = function (guitarTab) {
  const notesToTransform = findNotesToTranspone(guitarTab);
  const transponeData = [];
  notesToTransform.forEach((note) => {
    let noteValue = note.string[note.noteIndex];
    let data = findNoteOnOtherString(note.stringId, noteValue, note.noteIndex);
    transponeData.push(data);
  });
  transponeData.forEach((data) => {
    if (typeof guitarTab[data.stringToMove][data.noteIndex] !== "number") {
      guitarTab[data.string].splice(data.noteIndex, 1, "-");
      guitarTab[data.stringToMove].splice(data.noteIndex, 1, data.newNote);
    } else
      Error(`Position ${data.stringToMove}:${data.noteIndex} already taken!`);
  });
  ebgdBasicConvert(guitarTab);
  let result = cutAdditionalStrings(guitarTab);
  return result;
};

export const validateTransponeResult = function (ukuleleTab) {
  let result = true;
  ukuleleTab.forEach((string) => {
    const notesIndexes = findNotesIndexes(string);
    notesIndexes.forEach((noteIndex) => {
      if (string[noteIndex] < 0) result = false;
    });
  });
  return result;
};
