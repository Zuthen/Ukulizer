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
import { findNotesToTranspone } from "./transposition.js";

export const convert = function (guitarTab) {
  if (hasNotesOnAEstrings(guitarTab)) {
    console.error(
      `Not implemented convertion for tabs with notes on A and E strings`
    );
    return Error(
      `Not implemented convertion for tabs with notes on A and E strings`
    );
  } else {
    const cutStrings = cutAdditionalStrings(guitarTab);
    ebgdBasicConvert(cutStrings);
    const moveToOtherString = isTransponeToOtherStingNeeded(cutStrings);
    if (moveToOtherString) {
      findNotesToTranspone(cutStrings);
      // transpone
    }
    removeRedunantDashes(cutStrings);
    changeStringNames(cutStrings);
    return cutStrings;
  }
};
