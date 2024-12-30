import { Cell, SafeCell } from "./cell.js";
import Board from "./board.js";
import Game from "./game.js";

//Test game

const settings1 = {difficulty: 'easy'}

const game1 = new Game(settings1)

const board1 = new Board(game1);
board1.initializeBoard();


console.log(board1);

let numberCell = 0;

// Usando flat() y filter()
numberCell = board1.board
  .flat() // Aplana la matriz bidimensional en un arreglo unidimensional
  .filter(cell => cell instanceof Cell).length;

console.log(numberCell);


let numberSafeCell = 0;

board1.board.forEach((row)=>{
  row.forEach((index)=>{
    if(index instanceof SafeCell){
      numberSafeCell++;
    }
  })
});

console.log(numberSafeCell);




