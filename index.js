window.addEventListener("DOMContentLoaded", Load);


function Load() {

  var tabelControls = document.getElementById('tabelControls');
  var fontColor = document.getElementById('fontColor');
  var fontSize = document.getElementById('fontSize');
  var table = document.getElementById("table");
  var tableBody;
  var arrTableData = [];


  var writeTestTable = tabelControls.onchange = function (data) {

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

          tr.appendChild(td);
          td.dataset.row = i;
          td.dataset.col = j;
          td.id = parseInt(i + "" + j);
          td.style.border = "1px solid #222";
        }
      }
    }

    if (data) {
      document.querySelectorAll("td").forEach(function (index, i) {

        if (index.id == i) {
          index.innerText = data[i].itemData || "";
          index.classList.add('chenges')
        }
      });
    }
  };


  if (localStorage.getItem('table') != null) {
    tableFromLocalStorage();
  } else {
    writeTestTable();
    localSet();
  }

  // table data from local storage

  function tableFromLocalStorage() {
    var data = JSON.parse(localStorage.getItem('table'));
    writeTestTable(data);

  }

  // STEP: Local Storage

  function localSet() {
    var allTd = document.querySelectorAll("td");
    allTd.forEach(function (index, i) {
      arrTableData.push({
        itemID: i,
        rowItemPosition: index.dataset.row,
        colItemPosition: index.dataset.col,
        itemData: index.innerHTML || null
      });

    });
    localStorage.setItem("table", JSON.stringify(arrTableData));

  }


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
    input.onchange = function (e) {
      var res = e.target.value;
      localEdit(tableCell, res)
    };
    input.focus();
    input.onblur = function () {
      tableCell.innerText = input.value;
      tableCell.textContent = input.value;
    };
    localEdit(tableCell, txt)
  }



  function localEdit(tableCell, data) {
    if (tableCell && data) {
      var eddibleCell = tableCell.getAttribute("id");

      var tableLocal = JSON.parse(localStorage.getItem('table'));

      var updateTable = tableLocal[eddibleCell].itemData = data;

      localStorage.setItem("table", JSON.stringify(tableLocal));
    }
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
   var tableTd= document.querySelectorAll("td");

    if (tableTd) {
      var fontSizeTable = fontSize.value;
      console.log("fontSizeTable", fontSizeTable);
      tableTd.forEach(function (data) {
        data.style.fontSize = fontSizeTable + "px";

      })

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

  var td = document.querySelectorAll('td');

  td.forEach(function (index) {

    index.addEventListener('mousemove', function init() {

      index.removeEventListener('mousemove', init, false);
      index.className = index.className + ' resizable';
      var resizer = document.createElement('div');
      resizer.className = 'resizer';
      index.appendChild(resizer);
      resizer.addEventListener('mousedown', initDrag, false);
    }, false);

    var startX, startY, startWidth, startHeight;
    function remove() {
      document.querySelectorAll("td").forEach(function (data) {
        console.log(data,data.removeChild() );
        data.removeChild()
        data.classList.remove("chenges resizable");
      })
    }
    function initDrag(e) {


      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(document.defaultView.getComputedStyle(index).width, 10);
      startHeight = parseInt(document.defaultView.getComputedStyle(index).height, 10);
      document.documentElement.addEventListener('mousemove', doDrag, false);
      document.documentElement.addEventListener('mouseup', stopDrag, false);
    }

    function doDrag(e) {
      index.style.width = (startWidth + e.clientX - startX) + 'px';
      index.style.height = (startHeight + e.clientY - startY) + 'px';

    }

    function stopDrag(e) {
      document.documentElement.removeEventListener('mousemove', doDrag, false);
      document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }
  })
}


