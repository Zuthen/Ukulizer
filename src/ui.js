"use strict";
export function addTable(resultTable, stringLines) {
  let table = document.createElement("TABLE");
  table.border = "1";

  let tableBody = document.createElement("TBODY");
  table.appendChild(tableBody);

  for (let i = 0; i < stringLines.length; i++) {
    let tr = document.createElement("TR");
    tableBody.appendChild(tr);

    for (let j = 0; j < stringLines[i].length; j++) {
      let td = document.createElement("TD");
      td.width = "75";
      td.appendChild(document.createTextNode(stringLines[i][j]));
      tr.appendChild(td);
    }
  }
  resultTable.appendChild(table);
}
export function addTableWarning(tableId, headerText) {
  let warning = document.createElement("p");
  let text = document.createTextNode(headerText);
  warning.appendChild(text);
  let element = document.getElementById(tableId);
  element.appendChild(warning);
}
export function instructions() {
  const text1 = `        ❔ How to use that tool? It's simple!
  ➖ Paste a guitar tab into field below
  ➖ You can change the number of frets on the neck if it is different from 18 
  ➖ Click Convert to ukulele tab button
  ➖ If everything is fine result should appear below.
  ➖ If You want to export result to pdf file just click on Download pdf button 
  (You can set the song title and/or artist name in the corresponding field)
`;
  const text2 = `  ℹ️ For best results 
  ⭐ make sure that each string notations starts with exactly one letter and one "|" sign 
  For example string like 
    D|-12-10--|  will work properly ✔️
     but 
    D4-||------| won't ❌

  ⭐ make sure that each string notations ends with | sign. All other endings may affect the rhythmics
  For example string like 
    e|-12-12-12-| will work properly ✔️
    but D|------|- won't ❌`;
  const instructions1 = document.getElementById("instructions1");
  instructions1.innerText = text1;
  const instructions2 = document.getElementById("instructions2");
  instructions2.innerText = text2;
}
