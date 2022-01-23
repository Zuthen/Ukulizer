"use strict";
export const findNoteOnOtherString = function (stringNumber, noteNumber) {
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
    string: mappedString.stringToMove,
    note: mappedString.note + noteNumber,
  };

  if (newString.note < 0)
    return Error(`Note number is lower than 0: ${newString.note}`);
  return newString;
};
