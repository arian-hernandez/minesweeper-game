import { Cell, SafeCell } from "./cell.js";
import Board from "./board.js";
import Game from "./game.js";
import Timer from "./timer.js";



  // Obtener los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const difficulty = params.get("difficulty");

 
    const settings = { difficulty };

    // Inicializar el juego
    let game = new Game(settings);
    let board = new Board(game);
    let timer = new Timer(game);

    // Initialize board and timer
    board.initializeBoard();
    timer.start();
  


const ElementResetButton = document.querySelector('.js-reset-button');
ElementResetButton.addEventListener('click',()=>{
  if (board) {
    board.cancelRevealMines(); // Detener animación
  }
  
  game = new Game(settings);
  board = new Board(game);
  board.initializeBoard();
  timer.stop();
  timer = new Timer(game);
  timer.start();
  const loseText = document.querySelector('.js-title-baner');
  loseText.innerHTML = 'Minesweeper';
  //in the future reset score here
});


//DELETE - it is only to test code and see where the mines are baby
const elementTrampa = document.querySelector('.js-latrampa');
elementTrampa.addEventListener('click',()=>{
  board.revealMines();
});


 