"use strict";
import {
  splitGuitarTabByStrings,
  ebgdBasicConvert as ebgdBasicConvert,
  changeStringNames,
} from "./guitarStrings.js";

import { prepareForConvert, removeRedunantDashes } from "./strings.js";

describe("acceptance tests", () => {
  test("Basic convertion from eBGD", () => {
    const guitarStringNames = ["e", "B", "G", "D", "A", "E"];
    const input = `e|-12-12-12-12-12-11--9-9-9-9-11-9-------------|
    B|----------------------------------14-12-11---|
    G|---------------------------------------------|
    D|---------------------------------------------|
    A|---------------------------------------------|
    E|---------------------------------------------|`;

    const aString = [
      "A",
      "|",
      "-",
      7,
      "-",
      7,
      "-",
      7,
      "-",
      7,
      "-",
      7,
      "-",
      6,
      "-",
      "-",
      4,
      "-",
      4,
      "-",
      4,
      "-",
      4,
      "-",
      7,
      "-",
      4,
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "|",
    ];
    const eString = [
      "E",
      "|",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      9,
      "-",
      7,
      "-",
      6,
      "-",
      "|",
    ];
    const cString = [
      "C",
      "|",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "|",
    ];
    const gString = [
      "G",
      "|",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "|",
    ];

    const strings = splitGuitarTabByStrings(input);
    const tabSplittedByNotes = prepareForConvert(strings, guitarStringNames);
    const basicConvert = ebgdBasicConvert(tabSplittedByNotes);
    const result = removeRedunantDashes(basicConvert);
    const renamed = changeStringNames(result);

    expect(renamed[0]).toStrictEqual(aString);
    expect(renamed[1]).toStrictEqual(eString);
    expect(renamed[2]).toStrictEqual(cString);
    expect(renamed[3]).toStrictEqual(gString);
  });
});
