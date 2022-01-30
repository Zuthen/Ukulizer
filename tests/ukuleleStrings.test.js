import { isTransposeToOtherStingNeededAfterOctaveTranspose } from "../src/ukuleleStrings";

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
});
