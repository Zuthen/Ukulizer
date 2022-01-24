"use strict";
import {
  ebgdBasicConvert,
  changeStringNames,
  hasNotesOnAEstrings,
} from "./guitarStrings.js";
import { removeRedunantDashes } from "./strings.js";

export const convert = function (guitarTab) {
  if (hasNotesOnAEstrings(guitarTab))
    return Error(
      `Not implemented convertion for tabs with notes on A and E strings`
    );
  else {
    const ebgdBasic = ebgdBasicConvert(guitarTab);
    removeRedunantDashes(ebgdBasic);
    changeStringNames(ebgdBasic);
    return ebgdBasic;
  }
};
