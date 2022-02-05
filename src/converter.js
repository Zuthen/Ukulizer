"use strict";
import { changeStringNames } from "./guitarStrings.js";
import {
  removeRedunantDashes,
  cutAdditionalStrings,
  isTransposeToOtherStingNeeded,
  adjustEnd,
  adjustStart,
} from "./strings.js";
import { transpose as transpose, transposeToHighG } from "./transposition.js";
import { ebgdBasicConvert } from "./guitarStrings.js";

export const convert = function (guitarTab) {
  let lowGresult = [];
  let lowGResultSucceded = false;
  let highGResultSucceded = false;
  ebgdBasicConvert(guitarTab);
  const moveToOtherString = isTransposeToOtherStingNeeded(guitarTab);
  if (moveToOtherString) {
    lowGresult = transpose(guitarTab);
  } else {
    lowGresult = { result: cutAdditionalStrings(guitarTab), transposed: false };
  }
  let highGtab;
  let highGresult;
  if (!lowGresult.result.includes(undefined)) {
    highGtab = lowGresult.result.map((item) => Array.from(item));
    if (!highGtab.includes(null)) {
      highGresult = transposeToHighG(highGtab);
      removeRedunantDashes(highGresult.result);
      changeStringNames(highGresult.result);
      highGResultSucceded = true;
    }
    removeRedunantDashes(lowGresult.result);
    changeStringNames(lowGresult.result);
    lowGResultSucceded = true;
  }
  if (highGResultSucceded || lowGResultSucceded) {
    return { lowGresult, highGresult };
  } else return Error(`Transpose failed for both low and high g result`);
};
