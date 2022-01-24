"use strict";
import { convert } from "./converter.js";

describe("Converter tests", () => {
  const stringWithNotes = ["G", "|", "-", "-", 7, "-", 12, "-"];
  const stringWithoutNotes = ["C", "|", "-", "-", "-", "-", "-", "-"];
  test("convert if there are no notes on AE strings", () => {
    // Arrange
    const input = [
      stringWithNotes,
      stringWithoutNotes,
      stringWithNotes,
      stringWithNotes,
      stringWithoutNotes,
      stringWithoutNotes,
    ];
    // Act
    const result = convert(input);
    // Assert
    expect(result).toBeTruthy();
  });
});
