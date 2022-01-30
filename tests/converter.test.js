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
});
