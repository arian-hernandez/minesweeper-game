document.addEventListener("DOMContentLoaded", () => {
  // Renderiza el ejemplo de colocar una bandera
  renderFlagExample();

  // Renderiza el ejemplo de explotar una mina
  renderMineExample();
});

function renderFlagExample() {
  const flagBoard = document.getElementById("flag-board");
  const grid = createExampleGrid([
    ["", "", ""],
    ["", "🚩", ""],
    ["", "", ""],
  ]);
  flagBoard.appendChild(grid);
}

function renderMineExample() {
  const mineBoard = document.getElementById("mine-board");
  const grid = createExampleGrid([
    ["1", "💣", "💣"],
    ["2", "3", "1"],
    ["💣", "1", ""],
  ]);
  mineBoard.appendChild(grid);
}

// Crea un grid de ejemplo para los tableros
function createExampleGrid(data) {
  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = `repeat(${data[0].length}, 40px)`;
  grid.style.gridGap = "5px";

  data.forEach(row => {
    row.forEach(cellContent => {
      const cell = document.createElement("div");
      cell.innerText = cellContent;
      cell.style.width = "40px";
      cell.style.height = "40px";
      cell.style.display = "flex";
      cell.style.justifyContent = "center";
      cell.style.alignItems = "center";
      cell.style.border = "1px solid #ccc";
      cell.style.borderRadius = "4px";
      cell.style.backgroundColor = "#f0f0f0";
      grid.appendChild(cell);
    });
  });

  return grid;
}
