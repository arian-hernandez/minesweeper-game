import { Cell } from "./cell.js";
import Board from "./board.js";

//Test game
const game = {
  numberOfRows: 5,
  numberOfColumns: 5,
  numberOfMines: 8,
}

const board1 = new Board(game);
board1.initializeBoard();


console.log(board1);


