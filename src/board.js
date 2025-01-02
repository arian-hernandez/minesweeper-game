import { Cell, SafeCell } from "./cell.js";
import { getRandomInt } from "./utils.js";
import Game from "./game.js";

export default class Board{
  rows;
  columns;
  numberOfMines;
  board;
  difficulty;

  constructor(game) {
    this.rows = game.numberOfRows;
    this.columns = game.numberOfColumns;
    this.numberOfMines = game.numberOfMines;
    this.difficulty = game.difficulty;

    // Generar el tablero con las celdas
    this.board = Array.from({ length: this.rows }, (row, rowIndex) =>
      Array.from({ length: this.columns }, (col, colIndex) => {
        const id = `${rowIndex}${colIndex}`; // ID único basado en fila y columna
        return new Cell(id, rowIndex, colIndex); // Pasar ID, fila y columna al constructor
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
          const row = this.board[i][j].row; // Obtener la fila de la celda actual
          const column = this.board[i][j].column;
          this.board[i][j] = new SafeCell(id, row, column); // Crear una nueva instancia de SafeCell con el mismo id
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
        <div class="cell js-cell js-cell-${i}${j}" data-row="${i}" data-column="${j}" data-id="${i}${j}"></div>
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

  document.querySelectorAll('.js-cell')
  .forEach((cell)=>{
    cell.addEventListener('contextmenu', (event) => {
      event.preventDefault(); //prevents default right click from happening
      const cellId = cell.dataset.id;
      this.flag(cellId); 
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

  getCellFromLogic(cellId){
    let matchingCell;
    this.board.flat().forEach((cell)=>{
      if(cell.id === cellId){
        matchingCell = cell;
      }
    });

    return matchingCell;
  }

  reveal(cellId){
    let matchingCell = this.getCellFromLogic(cellId);

    if(matchingCell.isMine()){
      console.log('booom');//implement lose here
    }else{
      if(matchingCell.getNeighbors(this.board)){//if neighbors are at least 1
        this.showNeighbors(cellId);
      }else{//if neighbors is 0 means we have to expand
        matchingCell.expand(cellId);
      }
    }
  }

  flag(cellId){
    let matchingCell = this.getCellFromLogic(cellId);
    
    matchingCell.isFlagged = !matchingCell.isFlagged;

    const cellElement = document.querySelector(`[data-id="${cellId}"]`);
    if (matchingCell.isFlagged) {
      cellElement.classList.add('js-flagged'); 
    } else {
      cellElement.classList.remove('js-flagged'); 
    }


    console.log(`right click on ${cellId}`);
  }

   // It's going to return a value from 0(no neighbors) to 8

  showNeighbors(cellId){
    const cell = this.getCellFromLogic(cellId);
    const adjacentMines = cell.getNeighbors(this.board);

    const cellElement = document.querySelector(`.js-cell-${cell.id}`);
            if (cellElement) {
                // Muestra el número de minas adyacentes en el selector
                cellElement.innerHTML = `${adjacentMines}`;
                console.log('entra');
                console.log(adjacentMines);
            }
         else {
            console.log('Celda no encontrada');
        }

    
  }


  initializeBoard(){
    this.setMines();
    this.setSafeCells();
    this.renderBoard();
  }



}





