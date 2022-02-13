"use strict";
const pdfStyle = `<style>
body {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
table {
  width: 90%;
  font: 17px;
  margin: 25px;
}
table,
th,
td {
  border: none;
}
#artist {
  font-style: italic;
  font-size: 18px;
}
#songTitle {
  font-size: 22px;
}
#songTitle,
#artist {
  text-align: center;
}
p {
  display: none;
}
@page {
  size: A4;
  margin: 3mm;
}
footer {
  font-size: 9px;
  color: rgb(80, 75, 75);
  text-align: center;
}

@media print {
  footer {
    position: fixed;
    bottom: 0;
    text-align: center;
  }
}
</style>`;

export function createPDF() {
  const printContent = document.getElementById("html-template").innerHTML;
  const file = window.open("");
  const songTitle = `Maryśka mówią mi`;
  const artist = `Maryla Rodowicz`;
  if (file) {
    file.document.write(pdfStyle);
    file.document.write(
      `</br><h1 id="songTitle">${songTitle}</h1><h2 id="artist">${artist}</h2>`
    );
    file.document.write(printContent);
    file.document.write("<footer><span>Generated by Ukelizer</span></footer>");
    file.document.close();
    file.document.title = "Ukelizer";
    file.print();
  }
}
