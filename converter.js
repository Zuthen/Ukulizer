"use strict";
import { changeStringNames } from "./guitarStrings.js";
import {
  removeRedunantDashes,
  cutAdditionalStrings,
  isTransposeToOtherStingNeeded,
} from "./strings.js";
import {
  validateTransposeResult,
  transpose as transpose,
} from "./transposition.js";
import { ebgdBasicConvert } from "./guitarStrings.js";

export const convert = function (guitarTab) {
  let result = [];
  ebgdBasicConvert(guitarTab);
  const moveToOtherString = isTransposeToOtherStingNeeded(guitarTab);
  if (moveToOtherString) {
    // jeżeli nuta na strunie 0 < 0 przesuń o oktawę!!
    result = transpose(guitarTab);
  } else result = cutAdditionalStrings(guitarTab);
  removeRedunantDashes(result);
  changeStringNames(result);
  validateTransposeResult(result);
  return result;
};
