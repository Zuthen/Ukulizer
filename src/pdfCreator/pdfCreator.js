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
  font-size: 20px;
}
#songTitle {
  font-size: 24px;
}
#songTitle,
#artist {
  text-align: center;
}
#pageFooter {
  position: running(pageFooter);
}
@page {
  size: auto;
  margin: 0mm;
  @bottom-left {
    content: element(pageFooter);
  }
}
</style>`;

export function createPDF() {
  const printContent = document.getElementById("html-template").innerHTML;
  const printSettingsWindow = window.open("");
  const songTitle = `Maryśka mówią mi`;
  const artist = `Maryla Rodowicz`;
  if (printSettingsWindow) {
    printSettingsWindow.document.write(pdfStyle);
    printSettingsWindow.document.write(
      `</br><h1 id="songTitle">${songTitle}</h1><h2 id="artist">${artist}</h2></br>`
    );
    printSettingsWindow.document.write(printContent);
    printSettingsWindow.document.write(
      '<footer id="pageFooter"><p>Generated with Ukelizer</p></footer>'
    );
    printSettingsWindow.document.close();
    printSettingsWindow.print();
  }
}
