"use strict";
import { findBarreChords } from "../src/barreChords.js";
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
});
