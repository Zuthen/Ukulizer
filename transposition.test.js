"use strict";

import { transponeToOtherString } from "./transposition";
// C, C#, D, D#,E,F,F#,G,G#,A,A#,B

describe("transposition", () => {
  const testData = [
    { string: 0, note: -1, expectedResult: { string: 1, note: 4 } },
    { string: 1, note: -1, expectedResult: { string: 2, note: 3 } },
    { string: 2, note: -1, expectedResult: { string: 0, note: 2 } },
    { string: 3, note: -1, expectedResult: { string: 1, note: 2 } },
    { string: 4, note: -1, expectedResult: { string: 2, note: 1 } },
    { string: 5, note: -1, expectedResult: { string: 3, note: 1 } },
  ];
  test("transpone to other string", () => {
    testData.forEach((data) => {
      const dataToTranspone = { string: data.string, note: data.note };
      const result = transponeToOtherString(dataToTranspone);
      expect(result).toBe(data.expectedResult);
    });
  });
});
