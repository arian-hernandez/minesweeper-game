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

 

  /*In expand() notice that you have to
  1- Change the cell to empty and reveal
  2- check the adjacent cells 
  3- if they have neighbors: call getNeighbors() on those cells
  4- if they are empty reCall expand recursively
  */
  expand(board){

    if (this.isRevealed) return;


    this.isRevealed = true;
    const cellElement = document.querySelector(`.js-cell-${this.id}`);
    cellElement.classList.add('js-safe'); 

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
        if (neighborCell.isRevealed) continue;
        
        const adjacentMines = neighborCell.getNeighbors(board);

        if(adjacentMines === 0){

        neighborCell.expand(board);
        
        }
        else{
          const cellElement = document.querySelector(`.js-cell-${neighborCell.id}`);
          cellElement.innerHTML = `${adjacentMines}`;
          neighborCell.isRevealed = true;
        }
        
      }
    }
    


    }


  }



  
 