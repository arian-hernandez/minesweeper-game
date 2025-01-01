export class Cell {
  value = 0; //0 or 1
  isFlagged = false; // true or false
  isReleaved = false;
  id;

  constructor(id) {
    this.id = id; // Asignar el ID al atributo de la celda
  }
  isMine(){
    return this.value;
  }

  
}

export class SafeCell extends Cell{
  constructor(id){
    super(id);
  }

  // It's going to return a value from 0(no neighbors) to 8
  getNeighbors(){
    let adjacentMines;
    console.log('into get neighbors ()');
    return adjacentMines;
  }

  /*In expand() notice that you have to
  1- Change the cell to empty and reveal
  2- check the adjacent cells 
  3- if they have neighbors: call getNeighbors() on those cells
  4- if they are empty reCall expand recursively
  */
  expand(){
      console.log('into expand()');
    }


  }



  
 