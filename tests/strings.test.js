"use strict";
import {
  mergeNumbers,
  convertToNumber,
  isTransposeToOtherStingNeeded,
  removeAllAsterisks,
  prepareForConvert,
} from "../src/strings";

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
        string: [
          ["A", "|", "-", -1, "-", -5, "-", 4, "-", "|"],
          ["A", "|", "-", -1, "-", -5, "-", 4, "-", "|"],
          ["A", "|", "-", -1, "-", -5, "-", 4, "-", "|"],
          ["A", "|", "-", -1, "-", -5, "-", 4, "-", "|"],
          ["E", "|", "-", "-", "-", "-", "-", "-", "|"],
          ["E", "|", "-", "-", "-", "-", "-", "-", "|"],
        ],
        expectedResult: true,
      },
      {
        string: [
          ["C", "|", "-", 12, "-", 13, "-", "|"],
          ["C", "|", "-", 12, "-", 13, "-", "|"],
          ["E", "|", "-", "-", "-", "-", "-", "-", "|"],
          ["E", "|", "-", "-", "-", "-", "-", "-", "|"],
          ["E", "|", "-", "-", "-", "-", "-", "-", "|"],
          ["E", "|", "-", "-", "-", "-", "-", "-", "|"],
        ],
        expectedResult: false,
      },
      {
        string: [
          ["E", "|", "-", "-", "-", "-", "-", "-", "|"],
          ["E", "|", "-", "-", "-", "-", "-", "-", "|"],
          ["E", "|", "-", "-", "-", "-", "-", "-", "|"],
          ["E", "|", "-", "-", "-", "-", "-", "-", "|"],
          ["C", "|", "-", "-", "-", 1, "-", "|"],
          ["C", "|", "-", "-", "-", "-", "-", "|"],
        ],
        expectedResult: true,
      },
      {
        string: [
          ["E", "|", "-", "-", "-", "-", "-", "-", "|"],
          ["E", "|", "-", "-", "-", "-", "-", "-", "|"],
          ["E", "|", "-", "-", "-", "-", "-", "-", "|"],
          ["E", "|", "-", "-", "-", "-", "-", "-", "|"],
          ["C", "|", "-", "-", "-", "-", "-", "|"],
          ["C", "|", "-", 3, "-", "-", "-", "|"],
        ],
        expectedResult: true,
      },
    ];
    inputs.forEach((input) => {
      // Act
      let output = isTransposeToOtherStingNeeded(input.string);
      // Assert
      expect(output).toStrictEqual(input.expectedResult);
    });
  });
  test("remove asterisks", () => {
    // Arrange
    const input = ["C", "|", 14, "*", "-", 12, "*"];
    const expectedResult = ["C", "|", 14, "-", 12];
    // Act
    const removedIndexes = removeAllAsterisks(input);
    // Assert
    expect(removedIndexes).toStrictEqual([3, 5]);
    expect(input).toStrictEqual(expectedResult);
  });
  test("prepare for convert", () => {
    // Arrange
    const input = ["A|-12--1--8-|", "E|-6--17---|"];
    const expectedResult = [
      ["A", "|", "-", 12, "*", "-", "-", 1, "-", "-", 8, "-", "|"],
      ["E", "|", "-", 6, "-", "-", 17, "*", "-", "-", "-", "|"],
    ];
    // Act
    const result = prepareForConvert(input);
    // Assert
    expect(result).toStrictEqual(expectedResult);
  });
  //TODO: adjustEnd
});
