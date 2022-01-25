import { findNoteOnOtherString } from "./transposition.js";
// C, C#,D,D#,E,F,F#,G,G#,A,A#,B

describe("transposition", () => {
  const testData = [
    {
      string: 0,
      note: -1,
      expectedResult: { string: 0, note: -1, stringToMove: 1, newNote: 4 },
    },
    {
      string: 1,
      note: -1,
      expectedResult: { string: 1, note: -1, stringToMove: 2, newNote: 3 },
    },
    {
      string: 2,
      note: -1,
      expectedResult: { string: 2, note: -1, stringToMove: 0, newNote: 2 },
    },
    {
      string: 3,
      note: -1,
      expectedResult: { string: 3, note: -1, stringToMove: 1, newNote: 2 },
    },
    {
      string: 4,
      note: -1,
      expectedResult: { string: 4, note: -1, stringToMove: 2, newNote: 1 },
    },
    {
      string: 5,
      note: -1,
      expectedResult: { string: 5, note: -1, stringToMove: 3, newNote: 1 },
    },
  ];
  test("find note on other string", () => {
    testData.forEach((data) => {
      const result = findNoteOnOtherString(data.string, data.note);
      expect(result).toStrictEqual(data.expectedResult);
    });
  });
});
