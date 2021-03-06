"use strict";
import { changeStringNames } from "./guitarStrings.js";
import {
  removeRedunantDashes,
  cutAdditionalStrings,
  prepareForConvert,
} from "./strings.js";
import { transpose as transpose, transposeToHighG } from "./transposition.js";
import { ebgdBasicConvert } from "./guitarStrings.js";
import { isTransposeNeeded } from "./transposeDecider.js";
import { throwErrorWithToast } from "./errors.js";
import { adjustForUkuleleBarres } from "./barreChords.js";

const formatResult = function (tab) {
  cutAdditionalStrings(tab);
  removeRedunantDashes(tab);
  changeStringNames(tab);
  return tab;
};

export const convertToLowG = function (tabStrings, fretLength) {
  const strings = prepareForConvert(tabStrings);
  ebgdBasicConvert(strings);
  adjustForUkuleleBarres(strings);
  const moveToOtherString = isTransposeNeeded(strings, fretLength);
  let result;
  if (moveToOtherString) {
    try {
      result = transpose(strings, fretLength);
      formatResult(result.result);
    } catch (error) {
      throwErrorWithToast("convert to Low G failed");
    } finally {
    }
  } else {
    const formatedResult = formatResult(strings);
    result = { result: formatedResult, transposed: false };
  }
  return result;
};

export const convertToHighG = function (tabStrings, fretLength) {
  let result;
  try {
    const lowG = convertToLowG(tabStrings, fretLength);
    try {
      result = transposeToHighG(lowG.result, fretLength);
      return result;
    } finally {
    }
  } catch {
    throwErrorWithToast(
      "Transposition for High G failed. Tab is unconvertible or this solution is not good enough "
    );
  } finally {
  }
};
