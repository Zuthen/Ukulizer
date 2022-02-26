"use strict";

import { Toast } from "./toasts.js";
export const throwErrorWithToast = function (text) {
  new Toast({
    message: text,
    type: "danger",
  });
  throw text;
};
export const throwWarningToast = function (text) {
  new Toast({
    message: text,
    type: "warning",
  });
};
