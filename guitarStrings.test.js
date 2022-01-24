"use strict";
import {
  splitGuitarTabByStrings,
  hasNotesOnAEstrings,
} from "./guitarStrings.js";
//node --experimental-vm-modules node_modules/jest/bin/jest.js
describe("Splitting guitar tab tests", () => {
  test("split guitar tabs to tablines", () => {
    const input = `e|-12-12-11--9-9-9-9-11-9--------------12-12-12-12-12-11-
    B|-------------------------14-12-11----------------------
    G|-------------------------------------------------------
    D|-------------------------------------------------------
    A|-------------------------------------------------------
    E|-------------------------------------------------------`;
    const splittedStrings = splitGuitarTabByStrings(input);
    expect(splittedStrings.length).toBe(6);
  });
  test("check if tab needs to move notes from lower strings", () => {
    // Arrange
    const stringWithNotes = ["G", "|", "-", "-", 7, "-", 12, "-"];
    const stringWithoutNotes = ["C", "|", "-", "-", "-", "-", "-", "-"];
    const tabWithoutNotesOnAEStrings = [
      stringWithNotes,
      stringWithoutNotes,
      stringWithNotes,
      stringWithNotes,
      stringWithoutNotes,
      stringWithoutNotes,
    ];
    const tabWithNotesOnAstring = [
      stringWithNotes,
      stringWithoutNotes,
      stringWithNotes,
      stringWithoutNotes,
      stringWithNotes,
      stringWithoutNotes,
    ];
    const tabWithNotesOnEstring = [
      stringWithNotes,
      stringWithoutNotes,
      stringWithNotes,
      stringWithoutNotes,
      stringWithoutNotes,
      stringWithNotes,
    ];
    const tabWithNotesOnAEstring = [
      stringWithNotes,
      stringWithoutNotes,
      stringWithoutNotes,
      stringWithoutNotes,
      stringWithNotes,
      stringWithNotes,
    ];
    const testCases = [
      { input: tabWithoutNotesOnAEStrings, expectedResult: false },
      { input: tabWithNotesOnAstring, expectedResult: true }, // fails
      { input: tabWithNotesOnEstring, expectedResult: true }, // fails
      { input: tabWithNotesOnAEstring, expectedResult: true },
    ];

    testCases.forEach((testCase) => {
      // Act

      const result = hasNotesOnAEstrings(testCase.input);
      // Assert
      expect(result).toStrictEqual(testCase.expectedResult);
    });
  });
});
