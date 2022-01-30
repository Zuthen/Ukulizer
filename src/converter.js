"use strict";
import { changeStringNames } from "./guitarStrings.js";
import {
  removeRedunantDashes,
  cutAdditionalStrings,
  isTransposeToOtherStingNeeded,
} from "./strings.js";
import { transpose as transpose } from "./transposition.js";
import { ebgdBasicConvert } from "./guitarStrings.js";

export const convert = function (guitarTab) {
  let result = [];
  ebgdBasicConvert(guitarTab);
  const moveToOtherString = isTransposeToOtherStingNeeded(guitarTab);
  if (moveToOtherString) {
    result = transpose(guitarTab);
  } else result = cutAdditionalStrings(guitarTab);
  removeRedunantDashes(result);
  changeStringNames(result);
  return result;
};
