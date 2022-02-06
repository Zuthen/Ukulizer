"use strict";
import { changeStringNames } from "./guitarStrings.js";
import {
  removeRedunantDashes,
  cutAdditionalStrings,
  isTransposeToOtherStingNeeded,
  prepareForConvert,
} from "./strings.js";
import { transpose as transpose, transposeToHighG } from "./transposition.js";
import { ebgdBasicConvert } from "./guitarStrings.js";

const formatResult = function (tab) {
  cutAdditionalStrings(tab);
  removeRedunantDashes(tab);
  changeStringNames(tab);
};

export const convertToLowG = function (tabStrings) {
  const tab = prepareForConvert(tabStrings);
  ebgdBasicConvert(tab);
  const moveToOtherString = isTransposeToOtherStingNeeded(tab);
  let transposeSucceded = true;
  let result;
  if (moveToOtherString) {
    result = transpose(tab);
  } else result = { result: cutAdditionalStrings(tab), transposed: false };
  if (result.result.includes(undefined)) {
    transposeSucceded = false;
    console.error("transpostiton for low g failed");
  } else {
    formatResult(result.result);
    return result;
  }
};
export const convertToHighG = function (tabStrings) {
  const lowG = convertToLowG(tabStrings);
  let result;
  if (lowG === undefined) {
    console.error("transpostiton for low g failed");
    return;
  } else {
    result = transposeToHighG(lowG.result);
    if (result.result !== undefined) {
      formatResult(result.result);
      return result;
    } else console.error("transpostition to high G failed");
  }
};
