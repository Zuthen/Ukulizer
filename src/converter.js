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
    lowGresult = transpose(guitarTab);
  } else lowGresult = cutAdditionalStrings(guitarTab);
  let highGresult;

  if (!lowGresult.includes(undefined)) {
    highGresult = lowGresult.map((item) => Array.from(item));
    if (!highGresult.includes(null)) {
      removeRedunantDashes(highGresult);
      transposeToHighG(highGresult);
      changeStringNames(highGresult);
      highGResultSucceded = true;
    }
    removeRedunantDashes(lowGresult);
    changeStringNames(lowGresult);
    lowGResultSucceded = true;
  }
  if (highGResultSucceded || lowGResultSucceded) {
    return { lowGresult, highGresult };
  } else return Error(`Transpose failed for both low and high g result`);
};
