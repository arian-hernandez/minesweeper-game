import { Cell, SafeCell } from "./cell.js";
import Board from "./board.js";
import Game from "./game.js";



  // Obtener los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const difficulty = params.get("difficulty");

 
    const settings = { difficulty };

    // Inicializar el juego
    let game = new Game(settings);
    let board = new Board(game);
    

    // Aquí puedes inicializar o renderizar el tablero
    board.initializeBoard();
  


const ElementResetButton = document.querySelector('.js-reset-button');
ElementResetButton.addEventListener('click',()=>{
  game = new Game(settings);
  board = new Board(game);
  board.initializeBoard();  
  const loseText = document.querySelector('.js-title-baner');
  loseText.innerHTML = 'Minesweeper';
  //in the future reset score here
});

const elementTrampa = document.querySelector('.js-latrampa');
elementTrampa.addEventListener('click',()=>{
  board.revealMines();
});
