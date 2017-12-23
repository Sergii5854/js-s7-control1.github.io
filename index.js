window.addEventListener("DOMContentLoaded", Load);

function Load() {


}

function Table() {

}


function redrawTable() {


}
var tabelControls = document.getElementById('tabelControls');

tabelControls.onchange = function () {
  var row = document.getElementById("row").value;
  var col = document.getElementById("col").value;
  var table = document.getElementById("table");


  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);
  tableBody.border = '1';
  for (var i = 0; i < row; i++) {
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);

    for (var j = 0; j < col; j++) {
      var td = document.createElement('TD');
      td.width = '75';
      td.appendChild(document.createTextNode("Cell " + i + "," + j));
      tr.appendChild(td);
    }
  }
  // table.appendChild(table);
}


// STEP: Change Color
function changeBackground(newColor) {
  document.bgColor = newColor;
}
var colorControls = document.getElementById("colorControls");

colorControls.onchange = function () {
  var r = document.getElementById("red").value;
  var g = document.getElementById("green").value;
  var b = document.getElementById("blue").value;
  document.bgColor = "#" + dh(r) + dh(g) + dh(b);
  document.getElementById("colorSelector").innerHTML = "rgb(" + r + "," + g + "," + b + ")=" + document.bgColor;
};
function dh(d) {
  var hex = Number(d).toString(16);
  if (hex.length < 2) hex = "0" + hex;
  return hex;
}
