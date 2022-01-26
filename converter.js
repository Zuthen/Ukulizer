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
      transpone(guitarTab);
    } else cutAdditionalStrings(guitarTab);
    removeRedunantDashes(guitarTab);
    changeStringNames(guitarTab);
    return guitarTab;
  }
};
