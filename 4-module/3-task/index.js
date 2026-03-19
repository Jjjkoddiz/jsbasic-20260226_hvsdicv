function highlight(table) {
  const tbody = table.tBodies[0];
  if (!tbody) return;

  for (let row of tbody.rows) {
    const cells = row.cells;

    if (cells.length < 4) continue;

    const statusCell = cells[3];
    const genderCell = cells[2];
    const ageCell = cells[1];

    if (statusCell.hasAttribute("data-available")) {
      const available = statusCell.getAttribute("data-available");
      if (available === "true") {
        row.classList.add("available");
      } else if (available === "false") {
        row.classList.add("unavailable");
      }
    } else {
      row.hidden = true;
    }

    const gender = genderCell.textContent.trim();
    if (gender === "m") {
      row.classList.add("male");
    } else if (gender === "f") {
      row.classList.add("female");
    }

    const age = parseInt(ageCell.textContent.trim(), 10);
    if (!isNaN(age) && age < 18) {
      row.style.textDecoration = "line-through";
    }
  }
}
