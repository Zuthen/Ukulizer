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
import { Toast } from "./toasts.js";

const formatResult = function (tab) {
  cutAdditionalStrings(tab);
  removeRedunantDashes(tab);
  changeStringNames(tab);
};

export const convertToLowG = function (tabStrings, fretLength) {
  console.log(tabStrings);
  const tab = prepareForConvert(tabStrings);
  ebgdBasicConvert(tab);
  const moveToOtherString = isTransposeToOtherStingNeeded(tab);
  let transposeSucceded = true;
  let result;
  if (moveToOtherString) {
    result = transpose(tab, fretLength);
  } else result = { result: cutAdditionalStrings(tab), transposed: false };
  if (result.result.includes(undefined)) {
    transposeSucceded = false;
    new Toast({
      message:
        "Transposition for Low G failed. Tab is unconvertible or this solution is not good enough ",
      type: "warning",
    });
    throw `Transpose for Low G failed`;
  } else {
    formatResult(result.result);
    console.log("RESULT", result);
    return result;
  }
};
export const convertToHighG = function (tabStrings, fretLength) {
  const lowG = convertToLowG(tabStrings, fretLength);
  let result;
  if (lowG === undefined) {
    throw `convertToHighG: Transpose for Low G failed`;
    return;
  } else {
    result = transposeToHighG(lowG.result, fretLength);
    if (result.result !== undefined) {
      formatResult(result.result);
      return result;
    } else {
      new Toast({
        message:
          "Transposition for High G failed. Tab is unconvertible or this solution is not good enough ",
        type: "warning",
      });
      throw `Transpose for High G failed`;
    }
  }
};
