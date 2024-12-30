import { Cell, SafeCell } from "./cell.js";
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

  setSafeCells(){
   let boardWithSafeCells;
   for(let i=0; i < this.board.length; i++){
    for(let j=0; j < this.board[i].length; j++){
      if(this.board[i][j].value === 0){
        this.board[i][j] = new SafeCell();
      }
    }
   }
  }


  renderBoard(){
    console.log('into renderBoard');
    let boardHTML = '';
    let currentRow;
    let currentColumn;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        boardHTML += `
        <div class="cell js-cell" data-row="${i}" data-column="${j}"></div>
        `
        }
    }
    document.querySelector('.board')
    .innerHTML = boardHTML;
    
  }

  getTotalCells(){
  let numberCell = 0;
  // Usando flat() y filter()
  numberCell = this.board
  .flat() // Aplana la matriz bidimensional en un arreglo unidimensional
    .filter(cell => cell instanceof Cell).length;
  
  return numberCell;
  }

  getTotalSafeCells(){
  let numberSafeCell = 0;
  this.board.forEach((row)=>{
    row.forEach((index)=>{
      if(index instanceof SafeCell){
        numberSafeCell++;
      }
    })
  });
  
  return numberSafeCell;
  } 


  initializeBoard(){
    this.setMines();
    this.setSafeCells();
    this.renderBoard();
  }



}



