export class Cell {
  value = 0; //0 or 1
  isFlagged = false; // true or false
  isRevealed = false;
  id;
  row;
  column;

  constructor(id,row,column) {
    this.id = id; // Asignar el ID al atributo de la celda
    this.row = row;
    this.column = column;
  }
  isMine(){
    return this.value;
  }

  
}

export class SafeCell extends Cell{
  constructor(id, row, column) {
    super(id, row, column); 
  }

  getNeighbors(board) {    
    let adjacentMines = 0;

    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    for (const [dx, dy] of directions) {
        const newRow = this.row + dx;
        const newCol = this.column + dy;

        // Make sure values are in the matrix
        if (
            newRow >= 0 &&
            newRow < board.length &&
            newCol >= 0 &&
            newCol < board[0].length
        ) {
            const neighborCell = board[newRow][newCol];
            if (neighborCell instanceof Cell && neighborCell.value === 1) {
                adjacentMines++;
            }
        }
    }

    return adjacentMines;
}

  expand(board) {

    


    if (this.isRevealed) return;

    
  
    this.isRevealed = true;
    this.isFlagged = false; // Remove flag if it exists
    const cellElement = document.querySelector(`.js-cell-${this.row}-${this.column}`);
    cellElement.classList.add('js-safe');
  
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
  
    for (const [dx, dy] of directions) {
      const newRow = this.row + dx;
      const newCol = this.column + dy;
  
      if (
        newRow >= 0 &&
        newRow < board.length &&
        newCol >= 0 &&
        newCol < board[0].length
      ) {
        const neighborCell = board[newRow][newCol];
        if (neighborCell.isRevealed) continue;
        
        const adjacentMines = neighborCell.getNeighbors(board);
        const cellElement = document.querySelector(`.js-cell-${neighborCell.row}-${neighborCell.column}`);
      
      // Remove flag if cell was flagged
      if (neighborCell.isFlagged) {
        neighborCell.isFlagged = false;
        cellElement.classList.remove('js-flagged');
      }

  
        if (adjacentMines === 0) {
          neighborCell.expand(board);
        } else {
          const cellElement = document.querySelector(`.js-cell-${neighborCell.row}-${neighborCell.column}`);
          cellElement.innerHTML = `${adjacentMines}`;
          cellElement.setAttribute('data-neighbors', adjacentMines);
          neighborCell.isRevealed = true;
        }
      }
    }

    

  }


  }



  
 