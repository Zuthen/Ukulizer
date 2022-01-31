"use strict";
import { changeStringNames } from "./guitarStrings.js";
import {
  removeRedunantDashes,
  cutAdditionalStrings,
  isTransposeToOtherStingNeeded,
} from "./strings.js";
import { transpose as transpose, transposeToHighG } from "./transposition.js";
import { ebgdBasicConvert } from "./guitarStrings.js";

export const convert = function (guitarTab) {
  let lowGresult = [];
  ebgdBasicConvert(guitarTab);
  const moveToOtherString = isTransposeToOtherStingNeeded(guitarTab);
  if (moveToOtherString) {
    lowGresult = transpose(guitarTab);
  } else lowGresult = cutAdditionalStrings(guitarTab);
  const highGresult = JSON.parse(JSON.stringify(lowGresult));
  transposeToHighG(highGresult);
  removeRedunantDashes(lowGresult);
  removeRedunantDashes(highGresult);
  changeStringNames(lowGresult);
  changeStringNames(highGresult);
  return { lowGresult, highGresult };
};
