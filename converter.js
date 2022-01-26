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
import { findNotesToTranspone, transpone } from "./transposition.js";

export const convert = function (guitarTab) {
  ebgdBasicConvert(guitarTab);
  let result = [];
  if (hasNotesOnAEstrings(guitarTab)) {
    console.error(
      `Not implemented convertion for tabs with notes on A and E strings`
    );
    return Error(
      `Not implemented convertion for tabs with notes on A and E strings`
    );
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
