"use strict";
import { isTransponeToOtherStingNeeded, findNotesIndexes } from "./strings.js";

export const findNoteOnOtherString = function (stringNumber, noteNumber) {
  const stringMap = [
    { string: 0, stringToMove: 1, note: 5 },
    { string: 1, stringToMove: 2, note: 4 },
    { string: 2, stringToMove: 0, note: 3 },
    { string: 3, stringToMove: 1, note: 3 },
    { string: 4, stringToMove: 2, note: 2 },
    { string: 5, stringToMove: 3, note: 2 },
  ];
  console.log(`STRING: ${stringNumber}, NOTE: ${noteNumber}`);
  const mappedString = stringMap[stringNumber];
  console.log(
    `STRING TO MOVE: ${mappedString.stringToMove}, NOTE TO ADD: ${mappedString.note}`
  );
  console.log(`newSTRING= ${noteNumber}+${mappedString.note}`);
  const newString = {
    string: stringNumber,
    note: noteNumber,
    stringToMove: mappedString.stringToMove,
    newNote: mappedString.note + noteNumber,
  };

  if (newString.newNote < 0)
    return Error(
      `Note number for ${newString.string}, ${newString.note} is lower than 0: ${newString.note}`
    );
  return newString;
};
export const findTransponeData = function (strings) {
  const transposeStrings = {
    transpone: false,
    notesToTranspone: [],
  };
  for (let i = 0; i < strings.length; i++) {
    if (isTransponeToOtherStingNeeded(strings[i])) {
      transposeStrings.transpone = true;
      const stringsIndexes = findNotesIndexes(strings[i]);
      stringsIndexes.forEach((noteIndex) => {
        if (strings[i][noteIndex] < 0) {
          transposeStrings.notesToTranspone.push({
            string: i,
            noteIndex: noteIndex,
          });
        }
      });
    }
  }
  return transposeStrings;
};
