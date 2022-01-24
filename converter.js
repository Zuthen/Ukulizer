"use strict";
import {
  ebgdBasicConvert,
  changeStringNames,
  hasNotesOnAEstrings,
} from "./guitarStrings.js";
import { removeRedunantDashes, cutAdditionalStrings } from "./strings.js";

export const convert = function (guitarTab) {
  if (hasNotesOnAEstrings(guitarTab)) {
    console.error(
      `Not implemented convertion for tabs with notes on A and E strings`
    );
    return Error(
      `Not implemented convertion for tabs with notes on A and E strings`
    );
  } else {
    const ebgdBasic = ebgdBasicConvert(guitarTab);
    const cutStrings = cutAdditionalStrings(ebgdBasic);
    removeRedunantDashes(cutStrings);
    changeStringNames(cutStrings);
    return cutStrings;
  }
};
