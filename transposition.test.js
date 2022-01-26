import {
  findNoteOnOtherString,
  transpone,
  validateTransponeResult,
} from "./transposition.js";
describe("transposition", () => {
  const testData = [
    {
      string: 0,
      note: -1,
      noteIndex: 2,
      expectedResult: { string: 0, noteIndex: 2, stringToMove: 1, newNote: 4 },
    },
    {
      string: 1,
      note: -1,
      noteIndex: 3,
      expectedResult: { string: 1, noteIndex: 3, stringToMove: 2, newNote: 3 },
    },
    {
      string: 2,
      note: -1,
      noteIndex: 4,
      expectedResult: { string: 2, noteIndex: 4, stringToMove: 0, newNote: 2 },
    },
    {
      string: 3,
      note: -1,
      noteIndex: 5,
      expectedResult: { string: 3, noteIndex: 5, stringToMove: 1, newNote: 2 },
    },
    {
      string: 4,
      note: -1,
      noteIndex: 6,
      expectedResult: { string: 4, noteIndex: 6, stringToMove: 2, newNote: 1 },
    },
    {
      string: 5,
      note: -1,
      noteIndex: 7,
      expectedResult: { string: 5, noteIndex: 7, stringToMove: 3, newNote: 1 },
    },
  ];
  test("find note on other string", () => {
    testData.forEach((data) => {
      const result = findNoteOnOtherString(
        data.string,
        data.note,
        data.noteIndex
      );
      expect(result).toStrictEqual(data.expectedResult);
    });
  });
  test("transpone", () => {
    // Arrange
    const eString = ["e", "|", "-", "-", -1, "-", "-", "-"];
    const bString = ["B", "|", "-", -2, "-", "-", "-", "-"];
    const gString = ["G", "|", -3, "-", "-", "-", "-", "-"];
    const dString = ["D", "|", "-", "-", "-", "-", "-", -3];
    const aString = ["A", "|", "-", "-", "-", -2, "-", "-"];
    const e1String = ["E", "|", "-", "-", "-", "-", -1, "-"];
    const tabToTranspone = [
      eString,
      bString,
      gString,
      dString,
      aString,
      e1String,
    ];
    const eStringConverted = ["e", "|", -5, "-", "-", "-", "-", "-"];
    const bStringConverted = ["B", "|", "-", "-", -1, "-", "-", -5];
    const gStringConverted = ["G", "|", "-", -3, "-", -5, "-", "-"];
    const dStringConverted = ["D", "|", "-", "-", "-", "-", -4, "-"];

    const transponedTab = [
      eStringConverted,
      bStringConverted,
      gStringConverted,
      dStringConverted,
    ];

    // Act

    let result = transpone(tabToTranspone);
    // Assert
    expect(result.length).toStrictEqual(4);
    expect(result).toStrictEqual(transponedTab);
  });
  test("validate transpone result", () => {
    // Arrange
    const stringWithoutNotesBelowZero = ["G", "|", "-", 2, "-", 0, "-", 3];
    const stringWithNotesBelowZero = ["G", "|", "-", 6, "-", -1, "-", "-"];
    const testcases = [
      {
        input: [
          stringWithNotesBelowZero,
          stringWithoutNotesBelowZero,
          stringWithoutNotesBelowZero,
          stringWithoutNotesBelowZero,
        ],
        expectedResult: false,
      },
      {
        input: [
          stringWithoutNotesBelowZero,
          stringWithNotesBelowZero,
          stringWithoutNotesBelowZero,
          stringWithoutNotesBelowZero,
        ],
        expectedResult: false,
      },
      {
        input: [
          stringWithoutNotesBelowZero,
          stringWithoutNotesBelowZero,
          stringWithNotesBelowZero,
          stringWithoutNotesBelowZero,
        ],
        expectedResult: false,
      },
      {
        input: [
          stringWithoutNotesBelowZero,
          stringWithoutNotesBelowZero,
          stringWithoutNotesBelowZero,
          stringWithNotesBelowZero,
        ],
        expectedResult: false,
      },
      {
        input: [
          stringWithoutNotesBelowZero,
          stringWithoutNotesBelowZero,
          stringWithoutNotesBelowZero,
          stringWithoutNotesBelowZero,
        ],
        expectedResult: true,
      },
    ];

    testcases.forEach((testcase) => {
      // Act
      const valid = validateTransponeResult(testcase.input);
      // Assert
      expect(valid).toBe(testcase.expectedResult);
    });
  });
});
