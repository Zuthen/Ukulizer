"use strict";
import { convert } from "../src/converter";

describe("Converter tests", () => {
  const stringWithNotes = ["G", "|", "-", "-", 7, "-", 12, "-"];
  const stringWithNotes1 = ["G", "|", "-", "-", 7, "-", 12, "-"];
  const stringWithNotes2 = ["G", "|", "-", "-", 7, "-", 12, "-"];

  const stringWithoutNotes = ["C", "|", "-", "-", "-", "-", "-", "-"];
  const stringWithoutNotes1 = ["C", "|", "-", "-", "-", "-", "-", "-"];
  const stringWithoutNotes2 = ["C", "|", "-", "-", "-", "-", "-", "-"];
  test("convert if there are no notes on AE strings", () => {
    // Arrange
    const input = [
      stringWithNotes,
      stringWithoutNotes,
      stringWithNotes1,
      stringWithNotes2,
      stringWithoutNotes1,
      stringWithoutNotes2,
    ];
    // Act
    const result = convert(input);
    // Assert
    expect(result).toBeTruthy();
  });
  test("when basic convert fails, move notes", () => {
    // Arrange
    const aString = ["A", "|", "-", 1, "-", 2];
    const eString = ["E", "|", "-", 0, "-", "-"];
    const cString = ["C", "|", "-", "-", "-", 1];
    const gString = ["G", "|", "-", "-", "-", "-"];
    const dString = ["D", "|", 2, "-", 4, "-"];
    const e2String = ["E", "|", "-", "-", "-", "-"];
    const input = [aString, eString, cString, gString, dString, e2String];
    const expectedResult = [
      ["A", "|", "-", "-", 8, "-", 9, "-", "|"],
      ["E", "|", "-", "-", 7, "-", "-", "-", "|"],
      ["C", "|", "-", "-", "-", "-", 8, "-", "|"],
      ["G", "|", "-", 4, "-", 6, "-", "-", "|"],
    ];
    // Act
    const result = convert(input);
    // Assert
    expect(result.lowGresult).toStrictEqual(expectedResult);
  });
});
