import { Cell, SafeCell } from "./cell.js";
import Board from "./board.js";
import Game from "./game.js";

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Obtener los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const difficulty = params.get("difficulty");

  if (difficulty) {
    const settings = { difficulty };
    console.log("Starting game with settings:", settings);

    // Inicializar el juego
    const game = new Game(settings);
    const board = new Board(game);
    

    // Aquí puedes inicializar o renderizar el tablero
    board.initializeBoard();
  } else {
    console.error("No difficulty selected!");
    // Opcional: Redirigir de vuelta al menú principal
    window.location.href = "index.html";
  }
});
