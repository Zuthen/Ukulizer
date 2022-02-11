"use strict";
import { Toast } from "./toasts.js";

export function splitGuitarTabByStrings(guitarTab) {
  let newstrings = guitarTab.split("\n");
  if (newstrings.length !== 6) {
    new Toast({
      message: `Unexpected lines count: ${newstrings.length} lines.
      Guitar tab should consist of exactly 6 lines.
      Make sure the tab is correct and try again.
      `,
      type: "warning",
    });
    throw `Unexpected lines count: ${newstrings.length}`;
  } else return newstrings;
}
export const substractFive = function (tabLine) {
  for (let i = 0; i < tabLine.length; i++) {
    if (typeof tabLine[i] != "number") continue;
    tabLine[i] = tabLine[i] - 5;
  }
};

export const ebgdBasicConvert = function (tabSplittedByStrings) {
  for (let i = 0; i < tabSplittedByStrings.length; i++)
    substractFive(tabSplittedByStrings[i]);
};

export const changeStringNames = function (convertedTabSplittedByNotes) {
  convertedTabSplittedByNotes[0][0] = "A";
  convertedTabSplittedByNotes[1][0] = "E";
  convertedTabSplittedByNotes[2][0] = "C";
  convertedTabSplittedByNotes[3][0] = "G";
};
