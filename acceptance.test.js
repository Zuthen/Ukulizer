"use strict";
import {
  splitGuitarTabByStrings,
  ebgdBasicConvert as ebgdBasicConvert,
  changeStringNames,
} from "./guitarStrings.js";

import { prepareForConvert } from "./strings.js";
describe("dupa", () => {
  test("dupa", () => {
    const test = true;
    expect(test).toBe(true);
  });
});
/*
describe("acceptance tests", () => {
  test("Basic convertion from eBGD", () => {
    const guitarStringNames = ["e", "B", "G", "D", "A", "E"];
    const input = `e|-12-12-12-12-12-11--9-9-9-9-11-9-------------|
    B|----------------------------------14-12-11---|
    G|---------------------------------------------|
    D|---------------------------------------------|
    A|---------------------------------------------|
    E|---------------------------------------------|`;

    const aString = Array.from(`A|-7-7-7-7-7-6--4-4-4-4-7-4----------|`);
    const eString = Array.from(`E|---------------------------9-7-6---|`);
    const cString = Array.from(`C|-----------------------------------|`);
    const gString = Array.from(`G|-----------------------------------|`);

    const strings = splitGuitarTabByStrings(input);
    const tabSplittedByNotes = prepareForConvert(strings, guitarStringNames);
    const basicConvert = ebgdBasicConvert(tabSplittedByNotes);
    const result = changeStringNames(basicConvert);

    expect(result[0]).toBe(aString);
    expect(result[1]).toBe(eString);
    expect(result[2]).toBe(cString);
    expect(result[3]).toBe(gString);
  });
});
*/
