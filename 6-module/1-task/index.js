/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement("table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = ["Имя", "Возраст", "Зарплата", "Город", ""];

    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    this.elem.appendChild(thead);

    const tbody = document.createElement("tbody");

    rows.forEach((item) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = item.name;
      row.appendChild(nameCell);

      const ageCell = document.createElement("td");
      ageCell.textContent = item.age;
      row.appendChild(ageCell);

      const salaryCell = document.createElement("td");
      salaryCell.textContent = item.salary;
      row.appendChild(salaryCell);

      const cityCell = document.createElement("td");
      cityCell.textContent = item.city;
      row.appendChild(cityCell);

      const buttonCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", () => {
        row.remove();
      });
      buttonCell.appendChild(deleteButton);
      row.appendChild(buttonCell);

      tbody.appendChild(row);
    });

    this.elem.appendChild(tbody);
  }
}
