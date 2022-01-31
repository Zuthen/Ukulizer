import {
  isTransposeToOtherStingNeededAfterOctaveTranspose,
  ukuleleBasicOctaveTranspose,
} from "../src/ukuleleStrings";

describe("ukulele strings tests", () => {
  test("check if transpose needed", () => {
    // Arrange
    const aString = ["A", "|", "-", 10];
    const eString = ["E", "|", "-", 11];
    const cString = ["C", "|", "-", 12];
    const gString = ["G", "|", "-", 13];
    const strings = [aString, eString, cString, gString];
    const testcases = [
      { fretLength: 14, expectedResult: false },
      { fretLength: 13, expectedResult: false },
      { fretLength: 12, expectedResult: true },
    ];
    testcases.forEach((testcase) => {
      // Act
      let result = isTransposeToOtherStingNeededAfterOctaveTranspose(
        strings,
        testcase.fretLength
      );
      // Assert
      expect(result).toStrictEqual(testcase.expectedResult);
    });
  });
  test("basic octave transpose", () => {
    // Arrange
    const input = [
      ["A", "|", "-", 12, "-", 1, "-", 3],
      ["E", "|", "-", 1, "-", 7, "-", "-"],
      ["C", "|", "-", "-", 2, "-", "-", "-"],
      ["G", "|", "-", "-", "-", 5, "-", 0],
    ];
    const expectedResult = [
      ["A", "|", "-", 24, "-", 13, "-", 15],
      ["E", "|", "-", 13, "-", 19, "-", "-"],
      ["C", "|", "-", "-", 14, "-", "-", "-"],
      ["G", "|", "-", "-", "-", 17, "-", 12],
    ];
    // Act
    ukuleleBasicOctaveTranspose(input);
    // Assert
    expect(input).toStrictEqual(expectedResult);
  });
});
