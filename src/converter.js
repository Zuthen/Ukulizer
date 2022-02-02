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
  let lowGResultSucceded = false;
  let highGResultSucceded = false;
  ebgdBasicConvert(guitarTab);
  const moveToOtherString = isTransposeToOtherStingNeeded(guitarTab);
  if (moveToOtherString) {
    lowGresult = transpose(guitarTab, 5);
  } else lowGresult = cutAdditionalStrings(guitarTab);
  const highGresult = JSON.parse(JSON.stringify(lowGresult));
  if (!highGresult.includes(null)) {
    removeRedunantDashes(highGresult);
    transposeToHighG(highGresult);
    removeRedunantDashes(highGresult);
    changeStringNames(highGresult);
    highGResultSucceded = true;
  }
  if (!lowGresult.includes(undefined)) {
    removeRedunantDashes(lowGresult);
    changeStringNames(lowGresult);
    lowGResultSucceded = true;
  }
  if (highGResultSucceded || lowGResultSucceded) {
    return { lowGresult, highGresult };
  } else return Error(`Transpose failed for both low and high g result`);
};
