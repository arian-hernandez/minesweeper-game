import { Cell, SafeCell } from "./cell.js";
import Board from "./board.js";
import Game from "./game.js";

//Test game

const settings1 = {difficulty: 'easy'}

const game1 = new Game(settings1)

const board1 = new Board(game1);

board1.initializeBoard();





console.log(board1);

console.log(board1.getTotalCells());

console.log(board1.getTotalSafeCells());





