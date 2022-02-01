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