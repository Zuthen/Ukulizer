"use strict";
import {
  mergeNumbers,
  convertToNumber,
  isTransponeToOtherStingNeeded,
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
      let output = isTransponeToOtherStingNeeded(input.string);
      // Assert
      expect(output).toStrictEqual(input.expectedResult);
    });
  });
});
