/**
 * @jest-environment jsdom
 */

const splitGuitarTabByStrings = require("../script.js");

describe("Splitting guitar tab tests", () => {
  test("split guitar tabs to tablines", () => {
    const input = `
    e|-12-12-11--9-9-9-9-11-9--------------12-12-12-12-12-11-
    B|-------------------------14-12-11----------------------
    G|-------------------------------------------------------
    D|-------------------------------------------------------
    A|-------------------------------------------------------
    E|-------------------------------------------------------`;
    const splittedStrings = splitGuitarTabByStrings(input);
  });
});
