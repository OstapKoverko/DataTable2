const table = document.getElementById('table');
let rowIndex;
renderData();
selectRow();

document.getElementById('buttonAdd').onclick = function() {
  sendData();
};

document.getElementById('buttonChange').onclick = function() {
  editSelectedRow();
};

document.getElementById('buttonDelete').onclick = function() {
  deleteSelectedRow();
};

function getdata() {
  return JSON.parse(window.localStorage.getItem('customers'));
}

function sendData(index) {
  let storedData = getdata() || [];
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = dd + '/' + mm + '/' + yyyy;
  let itemData = {
    name: document.getElementById('name').value,
    surname: document.getElementById('surname').value,
    email: document.getElementById('email').value,
    date: yyyy + '/' + mm + '/' + dd
  };

  if (index) {
    storedData[index] = itemData;
  } else {
    storedData.push(itemData);
  }
  window.localStorage.setItem('customers', JSON.stringify(storedData));
  renderData();
  selectRow();
}

function renderData() {
  const table = document.getElementById('table');
  let storedData = getdata() || [];
  // Clearing table
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  // Rendering table data
  for (let i = 0; i < storedData.length; i++) {
    let row = table.insertRow();
    let name = row.insertCell(0);
    let surname = row.insertCell(1);
    let email = row.insertCell(2);
    let date = row.insertCell(3);
    let rowData = storedData[i];
    name.innerHTML = rowData.name;
    surname.innerHTML = rowData.surname;
    email.innerHTML = rowData.email;
    date.innerHTML = rowData.date;
  }
}

function selectRow() {
  for (let i = 1; i < table.rows.length; i++) {
    table.rows[i].onclick = function() {
      document.getElementById('name').value = this.cells[0].innerHTML;
      document.getElementById('surname').value = this.cells[1].innerHTML;
      document.getElementById('email').value = this.cells[2].innerHTML;
      rowIndex = this.rowIndex - 1;
    };
  }
}

function editSelectedRow() {
  sendData(rowIndex);
  selectRow();
}

function deleteSelectedRow() {
  let storedData = getdata();
  storedData.splice(rowIndex, 1);
  window.localStorage.clear();
  window.localStorage.setItem('customers', JSON.stringify(storedData));
  renderData();
  selectRow();
}
