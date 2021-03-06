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
h2 {font-size: 18px;}
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
  const songTitle = document.getElementById("song-title").value;
  const artist = document.getElementById("artist").value;
  document.getElementById("pdf-song-title").textContent = songTitle;
  document.getElementById("pdf-artist").textContent = artist;
  const printContent = document.getElementById("html-template").innerHTML;
  const file = window.open("");
  if (file) {
    file.document.write(printContent);
    file.document.title = "Ukelizer";
    file.print();
  }
}
