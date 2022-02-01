import {
  findNoteOnOtherString,
  findNotesToTransposeAfterOctaveTranspose,
  transpose as transpose,
  transposeOctave,
  transposeToHighG,
} from "../src/transposition";
describe("transposition", () => {
  test("find note on other string", () => {
    const testData = [
      {
        string: 0,
        note: -5,
        noteIndex: 12,
        expectedResult: [
          {
            string: 0,
            noteIndex: 12,
            stringToMove: 1,
            newNote: 0,
            originalNote: -4,
          },
          {
            string: 0,
            noteIndex: 12,
            stringToMove: 2,
            newNote: 4,
            originalNote: -4,
          },
          {
            string: 0,
            noteIndex: 12,
            stringToMove: 3,
            newNote: 9,
            originalNote: -4,
          },
        ],
      },
      {
        string: 0,
        note: -1,
        noteIndex: 8,
        expectedResult: [
          {
            string: 0,
            noteIndex: 8,
            stringToMove: 1,
            newNote: 4,
            originalNote: 0,
          },
          {
            string: 0,
            noteIndex: 8,
            stringToMove: 2,
            newNote: 8,
            originalNote: 0,
          },
          {
            string: 0,
            noteIndex: 8,
            stringToMove: 3,
            newNote: 13,
            originalNote: 0,
          },
        ],
      },
      {
        string: 1,
        note: -6,
        noteIndex: 3,
        expectedResult: [
          {
            string: 1,
            noteIndex: 3,
            stringToMove: 3,
            newNote: 3,
            originalNote: -5,
          },
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
          {
            string: 2,
            noteIndex: 5,
            stringToMove: 3,
            newNote: 4,
            originalNote: 0,
          },
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
          {
            string: 4,
            noteIndex: 7,
            stringToMove: 3,
            newNote: 7,
            originalNote: 13,
          },
          {
            string: 4,
            noteIndex: 7,
            stringToMove: 2,
            newNote: 2,
            originalNote: 13,
          },
        ],
      },
      {
        string: 5,
        note: 18,
        noteIndex: 3,
        expectedResult: [
          {
            string: 5,
            noteIndex: 3,
            stringToMove: 3,
            newNote: 8,
            originalNote: 19,
          },
          {
            string: 5,
            noteIndex: 3,
            stringToMove: 2,
            newNote: 3,
            originalNote: 19,
          },
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
        data.noteIndex,
        1
      );
      expect(result).toStrictEqual(data.expectedResult);
    });
  });
  test("transpose", () => {
    // Arrange
    const eString = ["e", "|", "—", "—", -1, "—", "—", "—"];
    const bString = ["B", "|", "—", -2, "—", "—", "—", "—"];
    const gString = ["G", "|", -3, "—", "—", "—", "—", "—"];
    const dString = ["D", "|", "—", "—", "—", "—", "—", 12];
    const aString = ["A", "|", "—", "—", "—", 10, "—", "—"];
    const e1String = ["E", "|", "—", "—", "—", "—", 11, "—"];
    const tabToTranspose = [
      eString,
      bString,
      gString,
      dString,
      aString,
      e1String,
    ];
    const eStringConverted = ["e", "|", "—", "—", "—", "—", "—", "—"];
    const bStringConverted = ["B", "|", "—", "—", 4, "—", "—", "—"];
    const gStringConverted = ["G", "|", "—", 2, "—", "—", "—", "—"];
    const dStringConverted = ["D", "|", 2, "—", "—", 5, 1, 12];

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
  test("find notes to transpose after octave transpose", () => {
    // Arrange
    const aString = ["A", "|", "—", 10, "—", 14];
    const eString = ["E", "|", "—", 11, "—", "—"];
    const cString = ["C", "|", "—", 12, "—", 1];
    const gString = ["G", "|", "—", 13, "—", 11];
    const emptyString = ["G", "|", "—", "—", "—", "—"];
    const strings = [
      aString,
      eString,
      cString,
      gString,
      emptyString,
      emptyString,
    ];
    const ukuleleFretLength = 12;

    const expectedResult = [
      { stringId: 3, noteIndex: 3, string: gString },
      { stringId: 0, noteIndex: 5, string: aString },
    ];
    // Act
    const result = findNotesToTransposeAfterOctaveTranspose(
      strings,
      ukuleleFretLength
    );
    // Assert
    expect(result).toStrictEqual(expectedResult);
  });
  test("move an octave", () => {
    // Arrange
    const aString = ["A", "|", "—", -3, "—", -7];
    const eString = ["E", "|", "—", -1, "—", "—"];
    const cString = ["C", "|", "—", -6, "—", -10];
    const gString = ["G", "|", "—", "—", "—", "—"];
    const dString = ["D", "|", 2, "—", 4, "—"];
    const e2String = ["E", "|", "—", -2, "—", -2];
    const strings = [aString, eString, cString, gString, dString, e2String];

    const expectedResult = [
      ["A", "|", "—", 9, "—", 5],
      ["E", "|", "—", 11, "—", "—"],
      ["C", "|", "—", 6, "—", 2],
      ["G", "|", 9, 0, 11, 0],
      ["D", "|", "—", "—", "—", "—"],
      ["E", "|", "—", "—", "—", "—"],
    ];
    // Act
    const result = transposeOctave(strings);
    // Assert
    expect(result).toStrictEqual(expectedResult);
  });
  test("when basic convert fails, move an octave", () => {
    // Arrange
    const aString = ["A", "|", "-", 1, "-", 2];
    const eString = ["E", "|", "-", 0, "-", "-"];
    const cString = ["C", "|", "-", "-", "-", 1];
    const gString = ["G", "|", "-", "-", "-", "-"];
    const dString = ["D", "|", 2, "-", 4, "-"];
    const e2String = ["E", "|", "-", "-", "-", "-"];
    const input = [aString, eString, cString, gString, dString, e2String];
    const expectedResult = [
      ["A", "|", "-", 13, "-", 14],
      ["E", "|", "-", 12, "-", "-"],
      ["C", "|", "-", "-", "-", 13],
      ["G", "|", 9, "-", 11, "-"],
    ];
    // Act
    const result = transpose(input);
    // Assert
    expect(result).toStrictEqual(expectedResult);
  });
  test("transpone from low G to high G tab", () => {
    // Arrange
    const aString = ["A", "|", "—", "—", 1, "—", 3, "—", "|"];
    const eString = ["E", "|", "—", "—", "—", "—", 1, "—", "|"];
    const cString = ["C", "|", "—", "—", 1, "—", "—", "—", "|"];
    const gString = ["G", "|", 7, "—", "—", "—", 0, "—", "|"];
    const input = [aString, eString, cString, gString];
    const expectedResult = [
      ["A", "|", "—", "—", 1, "—", 3, "—", "|"],
      ["E", "|", "—", "—", "—", "—", 1, "—", "|"],
      ["C", "|", 14, "—", 1, "—", "—", "—", "|"],
      ["G", "|", "—", "—", "—", "—", 12, "—", "|"],
    ];
    // Act
    const highGukuleleTab = transposeToHighG(input);
    // Assert
    expect(highGukuleleTab).toStrictEqual(expectedResult);
  });
});
