import { Cell, SafeCell } from "./cell.js";
import { getRandomInt } from "./utils.js";
import Game from "./game.js";

export default class Board{
  rows;
  columns;
  numberOfMines;
  board;
  difficulty;
  game;

  constructor(game) {
    this.rows = game.numberOfRows;
    this.columns = game.numberOfColumns;
    this.numberOfMines = game.numberOfMines;
    this.difficulty = game.difficulty;
    this.game = game;

    // Update the board generation with new ID format
    this.board = Array.from({ length: this.rows }, (row, rowIndex) =>
      Array.from({ length: this.columns }, (col, colIndex) => {
        const id = `cell-${rowIndex}-${colIndex}`; // New ID format using dashes
        return new Cell(id, rowIndex, colIndex);
      })
    );
    console.log(this.board);
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



  renderBoard() {
    let boardHTML = '';
    boardHTML += `<div class="board board-${this.difficulty}">`
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        boardHTML += `
          <div class="cell js-cell js-cell-${i}-${j}" 
               data-row="${i}" 
               data-column="${j}" 
               data-id="cell-${i}-${j}"
               title="Cell ${i},${j}">
          </div>
        `;
      }
    }
    boardHTML += `</div>`

    document.querySelector('.board').innerHTML = boardHTML;

    // Update event listeners to use new ID format
    document.querySelectorAll('.js-cell').forEach((cell) => {
      cell.addEventListener('click', () => {
        const cellId = cell.dataset.id;
        this.reveal(cellId);
      });

      cell.addEventListener('contextmenu', (event) => {
        event.preventDefault();
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

  getTotalCellFlagged(){
    let totalFlagged = 0;
    this.board.flat().forEach((cell)=>{
      if(cell.isFlagged){
        totalFlagged++;
      }
    });
    return totalFlagged;
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

  async handleMineReveal() {
    try {
      this.disableBoard();
      await this.revealMines();
      this.game.lose();
    } catch (error) {
      console.error("Algo salió mal al revelar las minas:", error);
    }
  }


  reveal(cellId){
    let matchingCell = this.getCellFromLogic(cellId);
    if (matchingCell.isRevealed) return; // already revealed
    
    
    if(matchingCell.isMine(game)){
    
    this.handleMineReveal();
     

      //       this.disableBoard();
//       this.revealMines().then(() => {
//       this.game.lose();
// });

      
      
    }else{
      let adjacentMines = matchingCell.getNeighbors(this.board);
      
      if(adjacentMines){//if neighbors are at least 1
        this.showNeighbors(cellId,adjacentMines);
      }else{//if neighbors is 0 means we have to expand
        matchingCell.expand(this.board);
      
      }
    }
    this.isWin();
  }

  flag(cellId){
    
    let matchingCell = this.getCellFromLogic(cellId);
    if (matchingCell.isRevealed) return; // already revealed
    
    matchingCell.isFlagged = !matchingCell.isFlagged;

    const cellElement = document.querySelector(`[data-id="${cellId}"]`);
    if (matchingCell.isFlagged) {
      cellElement.classList.add('js-flagged'); 
    } else {
      cellElement.classList.remove('js-flagged'); 
    }
    this.updateMinesStatus();
    this.isWin();
  }

   // It's going to return a value from 0(no neighbors) to 8

   showNeighbors(cellId, adjacentMines) {
    const cell = this.getCellFromLogic(cellId);
    this.getCellFromLogic(cellId).isRevealed = true;

    const cellElement = document.querySelector(`.js-cell-${cell.row}-${cell.column}`);
    if (cellElement) {
      cellElement.classList.remove('js-flagged'); // Remove flag class
      cellElement.innerHTML = `${adjacentMines}`;
      cellElement.setAttribute('data-neighbors', adjacentMines); // Add data attribute
    }
  }


  updateDifficultyGame(){
    const difficultyElement = document.querySelector('.js-difficulty-selected');
    difficultyElement.textContent = `Difficulty: ${this.difficulty}`;
    const minesElement = document.querySelector('.js-mines-total');
    minesElement.textContent = `Total mines: ${this.numberOfMines}`;
  }

  updateMinesStatus(){
    const flaggedElement = document.querySelector('.js-mines-detected');
    const counter = this.getTotalCellFlagged();
    flaggedElement.textContent = `Mines detected: ${counter}`;
  }

  disableBoard() {
    // Selecciona todas las celdas en el DOM
    const cells = document.querySelectorAll('.js-cell');
  
    // Remueve los event listeners de cada celda
    cells.forEach((cell) => {
      const newCell = cell.cloneNode(true); // Crea una copia del nodo sin los event listeners
      cell.replaceWith(newCell); // Reemplaza el nodo original con el nuevo nodo
    });
    const flaggedElement = document.querySelector('.js-mines-detected');
    flaggedElement.textContent = 'Mines detected: 0';
  }

  isWin(){
    let bombsFlagged = 0;
    let cellsRevealed = 0;
    let cellsFlagged = 0;
    
    this.board.flat().forEach((cell)=>{
      if(cell.isFlagged){cellsFlagged++;}
      if(cell.isRevealed){cellsRevealed++;}
      if(!(cell instanceof SafeCell)){
        if(cell.isFlagged){
          bombsFlagged++;
        }
      }
    });

    console.log('bombas reales marcads',bombsFlagged);
    console.log('celdas reveladas',cellsRevealed);
    if(bombsFlagged === this.numberOfMines && (cellsRevealed + cellsFlagged) === this.board.flat().length){
      this.game.win();
    }
  }

  revealMines() {
    this.mineRevealTimeouts = []; // Almacenar los timeouts
    return new Promise((resolve) => {
      const mines = this.board.flat().filter(cell => cell.isMine());
  
      mines.forEach((cell, index) => {
        const timeout = setTimeout(() => {
          const mineElement = document.querySelector(`[data-id="${cell.id}"]`);
          if (mineElement) {
            mineElement.classList.add('js-mine-revealed');
          }
          // Si es el último, completamos la promesa
          if (index === mines.length - 1) {
            resolve();
          }
        }, index * 50); // 50ms de retraso por mina
  
        this.mineRevealTimeouts.push(timeout); // Guardar timeout
      });
    });
  }

  cancelRevealMines() {
    if (this.mineRevealTimeouts) {
      this.mineRevealTimeouts.forEach(timeout => clearTimeout(timeout));
      this.mineRevealTimeouts = []; // Limpiar los timeouts
    }
  }
  
  
  
  




  initializeBoard(){
    this.setMines();
    this.setSafeCells();
    this.renderBoard();
    this.updateDifficultyGame();
  }

}





