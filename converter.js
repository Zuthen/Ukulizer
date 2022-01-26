"use strict";
import { changeStringNames } from "./guitarStrings.js";
import {
  removeRedunantDashes,
  cutAdditionalStrings,
  isTransponeToOtherStingNeeded,
} from "./strings.js";
import { validateTransponeResult, transpone } from "./transposition.js";

export const convert = function (guitarTab) {
  let result = [];
  const moveToOtherString = isTransponeToOtherStingNeeded(guitarTab);
  if (moveToOtherString) {
    result = transpone(guitarTab);
  } else result = cutAdditionalStrings(guitarTab);
  removeRedunantDashes(result);
  changeStringNames(result);
  validateTransponeResult(result);
  return result;
};
