"use strict";
import {
  mergeNumbers,
  convertToNumber,
  isTransposeToOtherStingNeeded,
  isTransposeStringsNeeded,
} from "./strings.js";
//node --experimental-vm-modules node_modules/jest/bin/jest.js

describe("strings operations tests", () => {
  const stringWithMergedNumbers = [
    "e",
    "|",
    "-",
    "12",
    "*",
    "-",
    "12",
    "*",
    "-",
    "12",
    "*",
    "-",
    "12",
    "*",
    "-",
    "12",
    "*",
    "-",
    "11",
    "*",
    "-",
    "-",
    "12",
    "*",
    "-",
    "12",
    "*",
    "-",
    "12",
    "*",
    "-",
    "12",
    "*",
    "-",
    "12",
    "*",
    "-",
    "11",
    "*",
    "-",
    "-",
    "9",
    "-",
    "9",
  ];

  test("merge numbers", () => {
    const input = [
      "e",
      "|",
      "-",
      "1",
      "2",
      "-",
      "1",
      "2",
      "-",
      "1",
      "2",
      "-",
      "1",
      "2",
      "-",
      "1",
      "2",
      "-",
      "1",
      "1",
      "-",
      "-",
      "1",
      "2",
      "-",
      "1",
      "2",
      "-",
      "1",
      "2",
      "-",
      "1",
      "2",
      "-",
      "1",
      "2",
      "-",
      "1",
      "1",
      "-",
      "-",
      "9",
      "-",
      "9",
    ];
    const removedIndexes = [4, 7, 10, 13, 16, 19, 23, 26, 29, 32, 35, 38];
    mergeNumbers(input);
    expect(input).toStrictEqual(stringWithMergedNumbers);
    removedIndexes.forEach((element) => {
      expect(input[element]).toBe("*");
    });
  });
  test("convert to number", () => {
    const expectedOutput = [
      "e",
      "|",
      "-",
      12,
      "*",
      "-",
      12,
      "*",
      "-",
      12,
      "*",
      "-",
      12,
      "*",
      "-",
      12,
      "*",
      "-",
      11,
      "*",
      "-",
      "-",
      12,
      "*",
      "-",
      12,
      "*",
      "-",
      12,
      "*",
      "-",
      12,
      "*",
      "-",
      12,
      "*",
      "-",
      11,
      "*",
      "-",
      "-",
      9,
      "-",
      9,
    ];
    convertToNumber(stringWithMergedNumbers);
    expect(stringWithMergedNumbers).toStrictEqual(expectedOutput);
  });
  test("check if move to other string needed", () => {
    // Arrange
    const inputs = [
      {
        string: ["A", "|", "-", -1, "-", -5, "-", 4, "-", "|"],
        expectedResult: true,
      },
      { string: ["C", "|", "-", 12, "-", 13, "-", "|"], expectedResult: false },
    ];
    inputs.forEach((input) => {
      // Act
      let output = isTransposeToOtherStingNeeded(input.string);
      // Assert
      expect(output).toStrictEqual(input.expectedResult);
    });
  });
  test("check if tab needs transpose to other strings", () => {
    // Arrange
    const stringToTranspose1 = [
      "A",
      "|",
      "-",
      "-",
      2,
      "-",
      -5,
      "-",
      4,
      "-",
      "|",
    ];
    const stringToTranspose2 = ["E", "|", "-", -1, "-", -5, "-", 4, "-", "|"];
    const stringToSkipTranspose1 = ["C", "|", "-", 12, "-", 13, "-", "|"];
    const stringToSkipTranspose2 = ["G", "|", "-", "-", 0, "-", 15, "-", "|"];
    const testCases = [
      {
        stringsToCheck: [
          stringToTranspose1,
          stringToTranspose2,
          stringToTranspose1,
          stringToTranspose2,
          stringToSkipTranspose1,
          stringToSkipTranspose2,
        ],
        expectedResult: {
          transpose: true,
          notesToTranspose: [
            { string: 0, noteIndex: 6 },
            { string: 1, noteIndex: 3 },
            { string: 1, noteIndex: 5 },
            { string: 2, noteIndex: 6 },
            { string: 3, noteIndex: 3 },
            { string: 3, noteIndex: 5 },
          ],
        },
      },
      {
        stringsToCheck: [
          stringToSkipTranspose1,
          stringToSkipTranspose1,
          stringToSkipTranspose2,
          stringToSkipTranspose2,
          stringToSkipTranspose1,
          stringToSkipTranspose2,
        ],
        expectedResult: {
          transpose: false,
          notesToTranspose: [],
        },
      },
    ];
    testCases.forEach((testCase) => {
      // Act
      let result = isTransposeStringsNeeded(testCase.stringsToCheck);
      // Assert
      expect(result).toStrictEqual(testCase.expectedResult);
    });
  });
});
