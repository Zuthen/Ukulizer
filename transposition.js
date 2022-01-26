"use strict";
import {
  isTransponeToOtherStingNeeded,
  findNotesIndexes,
  cutAdditionalStrings,
} from "./strings.js";

export const findNoteOnOtherString = function (stringNumber, note, noteIndex) {
  const stringMap = [
    { string: 0, stringToMove: 1, note: 5 },
    { string: 1, stringToMove: 2, note: 4 },
    { string: 2, stringToMove: 0, note: 3 },
    { string: 3, stringToMove: 1, note: 3 },
    { string: 4, stringToMove: 2, note: 2 },
    { string: 5, stringToMove: 3, note: 2 },
  ];
  const mappedString = stringMap[stringNumber];

  const newString = {
    string: stringNumber,
    noteIndex: noteIndex,
    stringToMove: mappedString.stringToMove,
    newNote: mappedString.note + note,
  };

  if (newString.newNote < 0)
    return Error(
      `Note number for ${newString.string}, ${newString.noteIndex} is lower than 0: ${newString.newNote}`
    );
  return newString;
};
export const findNotesToTranspone = function (strings) {
  const transponeStrings = [];
  for (let i = 0; i < strings.length; i++) {
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
    console.log(`DATA`, data);
    console.log(`STRING TO MOVE`, data.stringToMove);
    console.log(`TAB`, guitarTab);
    console.log(`TAB`, guitarTab[data.stringToMove]);
    console.log(`WTF`, guitarTab[data.stringToMove][data.noteIndex]);
    if (typeof guitarTab[data.stringToMove][data.noteIndex] !== "number") {
      guitarTab[data.string].splice(data.noteIndex, 1, "-");
      guitarTab[data.stringToMove].splice(data.noteIndex, 1, data.newNote);
    } else
      Error(`Position ${data.stringToMove}:${data.noteIndex} already taken!`);
  });
  let result = cutAdditionalStrings(guitarTab);
  return result;
};
