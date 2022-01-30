import {
  findNoteOnOtherString,
  transpose as transpose,
} from "../src/transposition";
describe("transposition", () => {
  test("find note on other string", () => {
    const testData = [
      {
        string: 0,
        note: -5,
        noteIndex: 12,
        expectedResult: [
          { string: 0, noteIndex: 12, stringToMove: 1, newNote: 0 },
          { string: 0, noteIndex: 12, stringToMove: 2, newNote: 4 },
          { string: 0, noteIndex: 12, stringToMove: 3, newNote: 9 },
        ],
      },
      {
        string: 0,
        note: -1,
        noteIndex: 8,
        expectedResult: [
          { string: 0, noteIndex: 8, stringToMove: 1, newNote: 4 },
          { string: 0, noteIndex: 8, stringToMove: 2, newNote: 8 },
          { string: 0, noteIndex: 8, stringToMove: 3, newNote: 13 },
        ],
      },
      {
        string: 1,
        note: -6,
        noteIndex: 3,
        expectedResult: [
          { string: 1, noteIndex: 3, stringToMove: 3, newNote: 3 },
        ],
      },
      {
        string: 2,
        note: -8,
        noteIndex: 7,
        expectedResult: [],
      },
      {
        string: 2,
        note: -1,
        noteIndex: 5,
        expectedResult: [
          { string: 2, noteIndex: 5, stringToMove: 3, newNote: 4 },
        ],
      },
      {
        string: 3,
        note: -3,
        noteIndex: 9,
        expectedResult: [],
      },
      {
        string: 4,
        note: -1,
        noteIndex: 6,
        expectedResult: [],
      },
      {
        string: 4,
        note: 12,
        noteIndex: 7,
        expectedResult: [
          { string: 4, noteIndex: 7, stringToMove: 3, newNote: 7 },
          { string: 4, noteIndex: 7, stringToMove: 2, newNote: 2 },
        ],
      },
      {
        string: 5,
        note: 18,
        noteIndex: 3,
        expectedResult: [
          { string: 5, noteIndex: 3, stringToMove: 3, newNote: 8 },
          { string: 5, noteIndex: 3, stringToMove: 2, newNote: 3 },
        ],
      },
      {
        string: 5,
        note: -1,
        noteIndex: 6,
        expectedResult: [],
      },
    ];
    // każda struna >> każdy sukces >> każdy error
    //
    testData.forEach((data) => {
      const result = findNoteOnOtherString(
        data.string,
        data.note,
        data.noteIndex
      );
      expect(result).toStrictEqual(data.expectedResult);
    });
  });
  test("transpose", () => {
    // Arrange
    const eString = ["e", "|", "-", "-", -1, "-", "-", "-"];
    const bString = ["B", "|", "-", -2, "-", "-", "-", "-"];
    const gString = ["G", "|", -3, "-", "-", "-", "-", "-"];
    const dString = ["D", "|", "-", "-", "-", "-", "-", 12];
    const aString = ["A", "|", "-", "-", "-", 10, "-", "-"];
    const e1String = ["E", "|", "-", "-", "-", "-", 11, "-"];
    const tabToTranspose = [
      eString,
      bString,
      gString,
      dString,
      aString,
      e1String,
    ];
    const eStringConverted = ["e", "|", "-", "-", "-", "-", "-", "-"];
    const bStringConverted = ["B", "|", "-", "-", 4, "-", "-", "-"];
    const gStringConverted = ["G", "|", "-", 2, "-", "-", "-", "-"];
    const dStringConverted = ["D", "|", 2, "-", "-", 5, 1, 12];

    const transposedTab = [
      eStringConverted,
      bStringConverted,
      gStringConverted,
      dStringConverted,
    ];

    // Act
    let result = transpose(tabToTranspose);
    // Assert
    expect(result.length).toStrictEqual(4);
    expect(result).toStrictEqual(transposedTab);
  });
});
