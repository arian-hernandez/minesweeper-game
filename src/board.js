import { Cell, SafeCell } from "./cell.js";
import { getRandomInt } from "./utils.js";
import Game from "./game.js";

export default class Board{
  rows;
  columns;
  numberOfMines;
  board;
  difficulty;

  constructor(game){
    this.rows = game.numberOfRows;
    this.columns = game.numberOfColumns;
    this.numberOfMines = game.numberOfMines;
    this.difficulty = game.difficulty;
    this.board = Array.from({ length: this.rows }, (row, rowIndex) => 
      Array.from({ length: this.columns }, (col, colIndex) => {
        const id = `${rowIndex}${colIndex}`; // Generar ID único basado en la fila y columna
        return new Cell(id); // Pasar el ID al constructor de la clase Cell
      })
    );
    
    
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

  setSafeCells() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j].value === 0) {
          const id = this.board[i][j].id; // Obtener el id de la celda actual
          this.board[i][j] = new SafeCell(id); // Crear una nueva instancia de SafeCell con el mismo id
        }
      }
    }
  }


  renderBoard(){
    console.log('into renderBoard');
    let boardHTML = '';
    let currentRow;
    let currentColumn;

    boardHTML += `<div class="board board-${this.difficulty}">`
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        
        boardHTML += `
        <div class="cell js-cell" data-row="${i}" data-column="${j}" data-id="${i}${j}"></div>
        `
        }
    }
  boardHTML += `</div">`

    document.querySelector('.board')
    .innerHTML = boardHTML;


    document.querySelectorAll('.js-cell')
  .forEach((cell)=>{
    cell.addEventListener('click',() => {
      const cellId = cell.dataset.id;
      this.reveal(cellId);
    });
  });
    
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

  reveal(cellId){
    let matchingCell;
    this.board.flat().forEach((cell)=>{
      if(cell.id === cellId){
        matchingCell = cell;
      }
    });

    if(matchingCell.isMine()){
      console.log('booom');
    }


    
  }


  initializeBoard(){
    this.setMines();
    this.setSafeCells();
    this.renderBoard();
  }



}



