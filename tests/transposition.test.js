import { findNotesIndexes, removeRedunantDashes } from "../src/strings";
import {
  findNoteOnOtherString,
  transpose as transpose,
  transposeOctave,
  transposeToHighG,
  moveHighGNotes,
  findNotesToMoveForGString,
  findNotesToTranspose,
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
          },
          {
            string: 0,
            noteIndex: 12,
            stringToMove: 2,
            newNote: 4,
          },
          {
            string: 0,
            noteIndex: 12,
            stringToMove: 3,
            newNote: 9,
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
          },
          {
            string: 0,
            noteIndex: 8,
            stringToMove: 2,
            newNote: 8,
          },
          {
            string: 0,
            noteIndex: 8,
            stringToMove: 3,
            newNote: 13,
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
          },
        ],
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
          },
        ],
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
          },
          {
            string: 4,
            noteIndex: 7,
            stringToMove: 2,
            newNote: 2,
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
          },
          {
            string: 5,
            noteIndex: 3,
            stringToMove: 2,
            newNote: 3,
          },
        ],
      },
    ];
    testData.forEach((data) => {
      const result = findNoteOnOtherString(
        data.string,
        data.note,
        data.noteIndex,
        18
      );
      expect(result).toStrictEqual(data.expectedResult);
    });
  });

  test("when find notes on other string is empty, throw an error", () => {
    // Arrange
    const testData = [
      {
        string: 2,
        note: -8,
        noteIndex: 7,
      },
      {
        string: 3,
        note: -3,
        noteIndex: 9,
      },
      {
        string: 4,
        note: -1,
        noteIndex: 6,
      },
      {
        string: 5,
        note: -1,
        noteIndex: 6,
      },
    ];

    // Act
    testData.forEach((data) => {
      const tryMove = function () {
        findNoteOnOtherString(data.string, data.note, data.noteIndex, 18);
      };
      // Assert
      expect(tryMove).toThrow(`Find note on other string failed`);
    });
  });
  test("find note on other string should return notes lower than fret length only", () => {
    // Arrange
    const noteToMove = { string: 5, note: 40, noteIndex: 12 };
    const expectedResult = [
      {
        string: 5,
        noteIndex: 12,
        stringToMove: 0,
        newNote: 16,
      },
    ];
    const fretLength = 17;
    // Act
    const result = findNoteOnOtherString(
      noteToMove.string,
      noteToMove.note,
      noteToMove.noteIndex,
      fretLength
    );
    // Assert
    expect(result).toStrictEqual(expectedResult);
  });
  test("transpose", () => {
    // Arrange
    const eString = ["e", "|", "???", "???", -1, "???", "???", "???"];
    const bString = ["B", "|", "???", -2, "???", "???", "???", "???"];
    const gString = ["G", "|", -3, "???", "???", "???", "???", "???"];
    const dString = ["D", "|", "???", "???", "???", "???", "???", 12];
    const aString = ["A", "|", "???", "???", "???", 10, "???", "???"];
    const e1String = ["E", "|", "???", "???", "???", "???", 11, "???"];
    const tabToTranspose = [
      eString,
      bString,
      gString,
      dString,
      aString,
      e1String,
    ];
    const eStringConverted = ["e", "|", "???", "???", "???", "???", "???", "???", "???", "|"];
    const bStringConverted = ["B", "|", "???", "???", 4, "???", "???", "???", "|"];
    const gStringConverted = ["G", "|", "???", 2, "???", "???", "???", "???", "|"];
    const dStringConverted = ["D", "|", 2, "???", "???", 5, 1, 12, "|"];

    const transposedTab = [
      eStringConverted,
      bStringConverted,
      gStringConverted,
      dStringConverted,
    ];
    const input = [
      [
        "E",
        "|",
        "???",
        "???",
        -3,
        "???",
        -2,
        "???",
        -3,
        "???",
        "???",
        -2,
        "???",
        0,
        "???",
        -2,
        "???",
        "???",
        0,
        "???",
        2,
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "|",
      ],
      [
        "B",
        "|",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        3,
        "???",
        0,
        "???",
        0,
        "???",
        "???",
        "???",
        "???",
        "???",
        "|",
      ],
      [
        "G",
        "|",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        -1,
        "???",
        "???",
        "|",
      ],
      [
        "D",
        "|",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "|",
      ],
      [
        "A",
        "|",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "|",
      ],
      [
        "E",
        "|",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "???",
        "|",
      ],
    ];
    const output = {
      result: [
        [
          "E",
          "|",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          0,
          "???",
          "???",
          "???",
          "???",
          0,
          "???",
          2,
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "|",
        ],
        [
          "B",
          "|",
          "???",
          2,
          "???",
          3,
          "???",
          2,
          "???",
          "???",
          3,
          "???",
          "???",
          "???",
          3,
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          3,
          "???",
          0,
          "???",
          0,
          "???",
          "???",
          "???",
          "???",
          "???",
          "|",
        ],
        [
          "G",
          "|",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "|",
        ],
        [
          "D",
          "|",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          4,
          "???",
          "???",
          "|",
        ],
        [
          "A",
          "|",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "|",
        ],
        [
          "E",
          "|",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "???",
          "|",
        ],
      ],
      transposed: true,
    };
    // Act
    let result = transpose(input, 18);
    removeRedunantDashes(result.result);
    let aReturnedString = findNotesIndexes(result.result[4]);
    let eReturnedString = findNotesIndexes(result.result[5]);
    // Assert
    expect(result).toStrictEqual(output);
    expect(aReturnedString.length).toStrictEqual(0);
    expect(eReturnedString.length).toStrictEqual(0);
  });
  test("find notes to transpose after octave transpose", () => {
    // Arrange
    const aString = ["A", "|", "???", 10, "???", 14];
    const eString = ["E", "|", "???", 11, "???", "???"];
    const cString = ["C", "|", "???", 12, "???", 1];
    const gString = ["G", "|", "???", 13, "???", 11];
    const emptyString = ["G", "|", "???", "???", "???", "???"];
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
    const result = findNotesToTranspose(strings, ukuleleFretLength);
    // Assert
    expect(result).toStrictEqual(expectedResult);
  });
  test("move an octave", () => {
    // Arrange
    const aString = ["A", "|", "???", -3, "???", -7];
    const eString = ["E", "|", "???", -1, "???", "???"];
    const cString = ["C", "|", "???", -6, "???", -10];
    const gString = ["G", "|", "???", "???", "???", "???"];
    const dString = ["D", "|", 2, "???", 0, "???"];
    const e2String = ["E", "|", "???", 12, "???", 10];
    const strings = [aString, eString, cString, gString, dString, e2String];

    const expectedResult = [
      ["A", "|", "???", "???", 9, "???", 5, "|"],
      ["E", "|", "???", "???", 11, "???", "???", "|"],
      ["C", "|", "???", "???", 6, "???", 2, "|"],
      ["G", "|", "???", 9, 14, 7, 12, "|"],
      ["D", "|", "???", "???", "???", "???", "???", "|"],
      ["E", "|", "???", "???", "???", "???", "???", "|"],
    ];
    // Act
    const result = transposeOctave(strings, 18, "transpose octave test");
    removeRedunantDashes(result);
    // Assert
    expect(result).toStrictEqual(expectedResult);
  });
  test("when basic convert fails, move an octave", () => {
    // Arrange
    const aString = ["A", "|", "-", 1, "-", 2];
    const eString = ["E", "|", "-", 0, "-", "-"];
    const cString = ["C", "|", "-", "-", "-", 1];
    const gString = ["G", "|", "-", "-", "-", "-"];
    const dString = ["D", "|", 7, "-", 4, "-"];
    const e2String = ["E", "|", "-", "-", "-", "-"];
    const input = [aString, eString, cString, gString, dString, e2String];
    const expectedResult = {
      result: [
        ["A", "|", "???", "-", 13, "-", 14, "|"],
        ["E", "|", "???", "-", 12, "-", "-", "|"],
        ["C", "|", "???", "-", "-", "-", 13, "|"],
        ["G", "|", "???", 14, "-", 11, "-", "|"],
        ["D", "|", "???", "???", "-", "???", "-", "|"],
        ["E", "|", "???", "-", "-", "-", "-", "|"],
      ],
      transposed: true,
    };
    // Act
    const result = transpose(input, 20);
    removeRedunantDashes(result.result);
    // Assert
    expect(result).toStrictEqual(expectedResult);
  });
  test("transpone from low G to high G tab with octave transpose", () => {
    // Arrange
    const aString = ["A", "|", "???", "???", 1, "???", 3, "???", "|"];
    const eString = ["E", "|", "???", "???", "???", "???", 1, "???", "|"];
    const cString = ["C", "|", "???", "???", 1, "???", "???", "???", "|"];
    const gString = ["G", "|", 7, "???", "???", "???", 0, "???", "|"];
    const input = [aString, eString, cString, gString];
    const expectedResult = {
      result: [
        ["A", "|", "???", "???", "???", 13, "???", 15, "???", "|"],
        ["E", "|", "???", "???", "???", "???", "???", 13, "???", "|"],
        ["C", "|", "???", "???", "???", 13, "???", "???", "???", "|"],
        ["G", "|", "???", 7, "???", "???", "???", 0, "???", "|"],
      ],
      transposed: true,
    };
    // Act
    const highGukuleleTab = transposeToHighG(input);
    removeRedunantDashes(highGukuleleTab.result);
    // Assert
    expect(highGukuleleTab).toStrictEqual(expectedResult);
  });
  test("transpone from low G to high G without octave transpose", () => {
    // Arrange
    const aString = ["A", "|", "???", "???", 1, "???", 3, "???", "|"];
    const eString = ["E", "|", "???", "???", "???", "???", 1, "???", "|"];
    const cString = ["C", "|", "???", "???", 1, "???", "???", "???", "|"];
    const gString = ["G", "|", 17, "???", "???", "???", "???", "???", "|"];
    const input = [aString, eString, cString, gString];
    const expectedResult = {
      result: [
        ["A", "|", "???", "???", "???", 1, "???", 3, "???", "|"],
        ["E", "|", "???", "???", "???", "???", "???", 1, "???", "|"],
        ["C", "|", "???", "???", "???", 1, "???", "???", "???", "|"],
        ["G", "|", "???", 5, "???", "???", "???", "???", "???", "|"],
      ],
      transposed: false,
    };
    // Act
    const highGukuleleTab = transposeToHighG(input);
    removeRedunantDashes(highGukuleleTab.result);
    // Assert
    expect(highGukuleleTab).toStrictEqual(expectedResult);
  });

  test("transpone from low G to high G with move from G string", () => {
    // Arrange
    const aString = ["A", "|", "???", "???", 1, "???", 3, "???", "|"];
    const eString = ["E", "|", "???", "???", "???", "???", 1, "???", "|"];
    const cString = ["C", "|", "???", "???", 1, "???", "???", "???", "|"];
    const gString = ["G", "|", "???", 20, "???", "???", "???", "???", "|"];
    const input = [aString, eString, cString, gString];
    const expectedResult = {
      result: [
        ["A", "|", "???", "???", 1, "???", 3, "???", "|"],
        ["E", "|", "???", "???", "???", "???", 1, "???", "|"],
        ["C", "|", "???", "???", 1, "???", "???", "???", "|"],
        ["G", "|", "???", 8, "???", "???", "???", "???", "|"],
      ],
      transposed: false,
    };
    // Act
    const highGukuleleTab = transposeToHighG(input, 18);
    removeRedunantDashes(highGukuleleTab.result);
    // Assert
    expect(highGukuleleTab).toStrictEqual(expectedResult);
  });

  test("move high G notes", () => {
    // Arrange
    const aString = ["A", "|", "???", "???", 1, "???", 3, "???", "|"];
    const eString = ["E", "|", "???", "???", "???", "???", 1, "???", "|"];
    const cString = ["C", "|", "???", "???", 1, "???", "???", "???", "|"];
    const gString = ["G", "|", 22, "???", "???", "???", "???", "???", "|"];

    const tab = [aString, eString, cString, gString];
    const transposedTab = [
      ["A", "|", "???", "???", 1, "???", 3, "???", "|"],
      ["E", "|", "???", "???", "???", "???", 1, "???", "|"],
      ["C", "|", 17, "???", 1, "???", "???", "???", "|"],
      ["G", "|", "???", "???", "???", "???", "???", "???", "|"],
    ];
    // Act
    moveHighGNotes(tab, 18);
    // Assert
    expect(tab).toStrictEqual(transposedTab);
  });

  test("find notes to move for G string with success", () => {
    // Arrange
    const gString = ["G", "|", 22, "???", "???", "???", "???", "???", "|"];
    const ukuleleFretLength = 18;
    const expectedResult = [
      [
        { string: 3, noteIndex: 2, stringToMove: 2, newNote: 17 },
        {
          newNote: 13,
          noteIndex: 2,
          string: 3,
          stringToMove: 1,
        },
        {
          newNote: 8,
          noteIndex: 2,
          string: 3,
          stringToMove: 0,
        },
      ],
    ];
    // Act
    const result = findNotesToMoveForGString(gString, ukuleleFretLength);

    // Assert
    expect(result).toStrictEqual(expectedResult);
  });

  test("find notes to move for G string with fail", () => {
    // Arrange
    const gString = ["G", "|", 32, "???", "???", "???", "???", "???", "|"];
    const ukuleleFretLength = 18;
    const expectedResult = [
      [{ string: 3, noteIndex: 2, stringToMove: 2, newNote: 17 }],
    ];
    // Act
    const result = function () {
      findNotesToMoveForGString(gString, ukuleleFretLength);
    };
    // Assert
    expect(result).toThrow("Find note on other string failed");
  });
});
