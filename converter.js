"use strict";
import {
  ebgdBasicConvert,
  changeStringNames,
  hasNotesOnAEstrings,
} from "./guitarStrings.js";
import {
  removeRedunantDashes,
  cutAdditionalStrings,
  isTransponeToOtherStingNeeded,
} from "./strings.js";
import { validateTransponeResult, transpone } from "./transposition.js";

export const convert = function (guitarTab) {
  let result = [];
  if (hasNotesOnAEstrings(guitarTab)) {
    /*
    return Error(
      `Not implemented convertion for tabs with notes on A and E strings`
    );*/

    const moveToOtherString = isTransponeToOtherStingNeeded(guitarTab);
    if (moveToOtherString) {
      result = transpone(guitarTab);
    } else result = cutAdditionalStrings(guitarTab);
    removeRedunantDashes(result);
    changeStringNames(result);
    validateTransponeResult(result);
    return result;
  } else {
    const moveToOtherString = isTransponeToOtherStingNeeded(guitarTab);
    if (moveToOtherString) {
      result = transpone(guitarTab);
    } else result = cutAdditionalStrings(guitarTab);
    removeRedunantDashes(result);
    changeStringNames(result);
    validateTransponeResult(result);
    return result;
  }
};
