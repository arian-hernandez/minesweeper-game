import { Cell } from "./cell.js";
import { getRandomInt } from "./utils.js";

export default class Board{
  rows;
  columns;
  numberOfMines;
  board;

  constructor(game){
    this.rows = game.numberOfRows;
    this.columns = game.numberOfColumns;
    this.numberOfMines = game.numberOfMines;
    this.board = Array.from( { length: this.rows }, () => 
      Array.from( { length: this.columns }, () => new Cell())
  )
  }

  setMines(){
    let mines = 0;
    let randomX;
    let randomY;
    

    while(mines < this.numberOfMines){
    randomX = getRandomInt(this.rows - 1);
    randomY = getRandomInt(this.columns - 1);
    const cell = this.board[randomX][randomY];
    if(!cell.value){
      cell.value = 1;
      mines++;
      }
    }
  }

}



