"use strict";
import { findBarreChords, adjustForUkuleleBarres } from "../src/barreChords.js";
describe("barre chords tests", () => {
  test("finds if there are barre chords in tab", () => {
    // Arrange
    const tabWithBarres = [
      ["A", "|", "—", 10, "—", "|"],
      ["E", "|", "—", 10, "—", "|"],
      ["C", "|", "—", 10, "—", "|"],
      ["G", "|", "—", 10, "—", "|"],
      ["A", "|", "—", 10, "—", "|"],
      ["E", "|", "—", 10, "—", "|"],
    ];
    const tabWithoutBarres = [
      ["A", "|", "—", 10, "—", "|"],
      ["E", "|", "—", 12, "—", "|"],
      ["C", "|", "—", 10, "—", "|"],
      ["G", "|", "—", 14, "—", "|"],
      ["A", "|", "—", 10, "—", "|"],
      ["E", "|", "—", 10, "—", "|"],
    ];
    const simpleTab = [
      ["A", "|", "—", 10, "—", "|"],
      ["E", "|", 8, "—", "—", "|"],
      ["C", "|", "—", "—", 11, "|"],
      ["G", "|", "—", 14, "—", "|"],
      ["A", "|", "—", "—", "—", "|"],
      ["E", "|", "—", "—", "—", "|"],
    ];
    const testData = [
      {
        tabToCheck: tabWithBarres,
        expectedResult: [3],
      },
      {
        tabToCheck: tabWithoutBarres,
        expectedResult: [],
      },
      {
        tabToCheck: simpleTab,
        expectedResult: [],
      },
    ];
    // Act
    testData.forEach((data) => {
      const result = findBarreChords(data.tabToCheck);
      // Assert
      expect(result).toStrictEqual(data.expectedResult);
    });
  });

  test("remove low notes for barre chords", () => {
    // Arrange
    const tabWithBarres = [
      ["A", "|", "—", 10, "—", "—", 7, "—", "—", 2, "—", 1, "|"],
      ["E", "|", "—", 10, "—", "—", 7, "—", "—", 2, "—", 1, "|"],
      ["C", "|", "—", 10, "—", "—", 7, "—", "—", 2, "—", 2, "|"],
      ["G", "|", "—", 10, "—", "—", 7, "—", "—", 2, "—", 3, "|"],
      ["A", "|", "—", 10, "—", "—", 7, "—", "—", 2, "—", 4, "|"],
      ["E", "|", "—", 10, "—", "—", 7, "—", "—", 2, "—", 5, "|"],
    ];
    const tabAdjustedForUkuleleBarres = [
      ["A", "|", "—", 10, "—", "—", 7, "—", "—", 2, "—", 1, "|"],
      ["E", "|", "—", 10, "—", "—", 7, "—", "—", 2, "—", 1, "|"],
      ["C", "|", "—", 10, "—", "—", 7, "—", "—", 2, "—", 2, "|"],
      ["G", "|", "—", 10, "—", "—", 7, "—", "—", 2, "—", 3, "|"],
      ["A", "|", "—", "—", "—", "—", "—", "—", "—", "—", "—", 4, "|"],
      ["E", "|", "—", "—", "—", "—", "—", "—", "—", "—", "—", 5, "|"],
    ];

    // Act
    adjustForUkuleleBarres(tabWithBarres);
    // Assert
    expect(tabWithBarres).toStrictEqual(tabAdjustedForUkuleleBarres);
  });

  test("should work if there are no barre chords for remove", () => {
    // Arrange
    const tabWithoutBarres = [
      ["A", "|", "—", 10, "—", "|"],
      ["E", "|", "—", 12, "—", "|"],
      ["C", "|", "—", 10, "—", "|"],
      ["G", "|", "—", 14, "—", "|"],
      ["A", "|", "—", 10, "—", "|"],
      ["E", "|", "—", 10, "—", "|"],
    ];

    const expectedResult = [
      ["A", "|", "—", 10, "—", "|"],
      ["E", "|", "—", 12, "—", "|"],
      ["C", "|", "—", 10, "—", "|"],
      ["G", "|", "—", 14, "—", "|"],
      ["A", "|", "—", 10, "—", "|"],
      ["E", "|", "—", 10, "—", "|"],
    ];
    // Act
    adjustForUkuleleBarres(tabWithoutBarres);
    // Assert
    expect(tabWithoutBarres).toStrictEqual(expectedResult);
  });
});
