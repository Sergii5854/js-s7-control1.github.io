window.addEventListener("DOMContentLoaded", Load);

function Load() {

  var tabelControls = document.getElementById('tabelControls');
  var table = document.getElementById("table");


  tabelControls.onchange = function () {

    if(document.querySelector('TBODY') != null ){
      document.querySelector('TBODY').remove()
    }

    var row = document.getElementById("row").value;
    var col = document.getElementById("col").value;


    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    if (row > 0 && col > 0 && table != null) {
      for (var i = 0; i < row; i++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        for (var j = 0; j < col; j++) {
          var td = document.createElement('TD');
          td.width = '75';
          td.borderColor = ' black';
          td.border = "1";
          console.log(col[j] === 0);
          if(col[j] ){
            td.appendChild(document.createTextNode( i + 1) );
            td.classList.add('notEdible')
            td.width = '10'
          }
           // td.appendChild(document.createTextNode("Cell " + i + "," + j));
          tr.appendChild(td);

        }
      }
    }
  };
// STEP: EDIT CELL
  table.addEventListener("click", function (e) {
    if (e.target.tagName === "TD"  && e.target.className !== 'notEdible' ) {
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
    }
  }

  function leaveCell(tableCell) {
    tableCell.innerText = input.value;
    tableCell.textContent = input.value;
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


}
