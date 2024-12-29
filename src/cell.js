export class Cell {
  value; //0 or 1
  isFlagged; // true or false
  releaved;

  isMine(){
    return this.value;
  }

  reveal(){

  }

  flagCell(){

  }
}

class SafeCell extends Cell{
  constructor(){
    super();
  }

  // It's going to return a value from 0(no neighbors) to 8
  getNeighbors(){
    let adjacentMines;

    return adjacentMines;
  }

  /*In expand() notice that you have to
  1- Change the cell to empty and reveal
  2- check the adjacent cells 
  3- if they have neighbors: call getNeighbors() on those cells
  4- if they are empty reCall expand recursively
  */
  expand(){
      if(!this.getNeighbors()){

      };
    }
  }
