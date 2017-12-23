window.addEventListener("DOMContentLoaded", Load);

function Load() {

  var tabelControls = document.getElementById('tabelControls');
  var fontColor = document.getElementById('fontColor');
  var fontSize = document.getElementById('fontSize');
  var table = document.getElementById("table");
  var tableBody;
  var arrTableData = [];

  var writeTestTable = tabelControls.onchange = function () {

    if (document.querySelector('TBODY') != null) {
      document.querySelector('TBODY').remove()
    }

    var row = document.getElementById("row").value || 10;
    var col = document.getElementById("col").value || 10;


    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    if (row > 0 && col > 0 && table != null) {
      for (var i = 0; i < row; i++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        for (var j = 0; j < col; j++) {
          var td = document.createElement('TD');
          td.width = '75';

          if (col[j] == 1) {
            td.appendChild(document.createTextNode(i + 1));
            td.classList.add('notEdible')
            td.width = '10'
          }
          // td.appendChild(document.createTextNode("Cell " + i + "," + j));
          tr.appendChild(td);
          td.dataset.row = i;
          td.dataset.col = j;
          td.id = parseInt(i + "" + j);
          td.style.border = "1px solid #222";
        }
      }
    }
  };
  writeTestTable()


// STEP: EDIT CELL
  table.addEventListener("click", function (e) {
    if (e.target.tagName === "TD" && e.target.className !== 'notEdible') {
      editText(e.target);
    }
  }, false);

  function editText(tableCell) {
    var txt = tableCell.innerText || tableCell.textContent;
    tableCell.innerText = tableCell.textContent = "";
    var input = document.createElement("input");
    input.type = "text";
    tableCell.appendChild(input);
    input.value = txt;
    input.focus();
    input.onblur = function () {
      tableCell.innerText = input.value;
      tableCell.textContent = input.value;
    };
    localSet()
  }

  function leaveCell(tableCell) {
    tableCell.innerText = input.value;
    tableCell.textContent = input.value;

  }

// STEP: EDIT Font property

  fontColor.onchange = function () {
    var r = document.getElementById("redFont").value;
    var g = document.getElementById("greenFont").value;
    var b = document.getElementById("blueFont").value;
    table.style.color = "#" + dh(r) + dh(g) + dh(b);
    document.getElementById("fontSelector").innerHTML = "rgb(" + r + "," + g + "," + b + ")=" + table.style.color;
  };

  fontSize.onchange = function () {
    tableBody = document.querySelector("tBody");
    if (tableBody) {
      var fontSizeTable = fontSize.value;
      tableBody.style.size = fontSizeTable;
    }
  };

// STEP: Change Color background
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


  // STEP: Local Storage

  arrTableData

  function localSet() {
    localStorage.clear()
    var allTd = document.querySelectorAll("td");
    var allTdLength = document.querySelectorAll("td").length;
    allTd.forEach( function (index,i ) {


        arrTableData.push({
          itemID: i,
          rowItemPosition: index.dataset.row,
          colItemPosition: index.dataset.col,
          itemData: index.innerHTML
        });

    });
    localStorage.setItem("table", JSON.stringify(arrTableData));

  }



  function localEdit(tableCell, data) {
    tableCell;
    console.log(data);
    var eddibleCell = tableCell.getAttribute("id");
    console.log(eddibleCell);
    var tableLocal = JSON.parse(localStorage.getItem('table'));
    tableLocal[eddibleCell].itemData = data;
    var rowItemPosition = tableLocal.rowItemPosition;
    var colItemPosition = tableLocal.colItemPosition;
    var itemData = tableLocal.itemData;

  }
}
