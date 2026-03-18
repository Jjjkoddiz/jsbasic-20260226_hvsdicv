function makeDiagonalRed(table) {
  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];

    const cell = row.cells[i];

    if (cell) {
      cell.style.backgroundColor = "red";
    }
  }
}
