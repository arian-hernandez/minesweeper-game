import Board from '../src/board.js';
import { Cell, SafeCell } from '../src/cell.js';

describe('Board', () => {
  const game = { numberOfRows: 5, numberOfColumns: 5, numberOfMines: 3 };
  let board;

  beforeEach(() => {
    board = new Board(game);
  });

  it('should initialize with the correct dimensions', () => {
    expect(board.rows).toBe(5);
    expect(board.columns).toBe(5);
    expect(board.board.length).toBe(5);
    expect(board.board[0].length).toBe(5);
  });

  it('should set the correct number of mines', () => {
    board.setMines();
    const mines = board.board.flat().filter(cell => cell.value === 1).length;
    expect(mines).toBe(3);
  });

  it('should replace safe cells after initialization', () => {
    board.initializeBoard();
    const safeCells = board.board.flat().filter(cell => cell instanceof SafeCell).length;
    expect(safeCells).toBe(22); // Total cells (5x5) - mines (3)
  });
});


describe("Board Logic", () => {
  let cells;
  let board;

  beforeEach(() => {
    // Crear un tablero simulado de 3x3
    cells = [
      [new Cell(0, 0, 0), new Cell(0, 1, 1), new Cell(0, 2, 0)],
      [new Cell(1, 0, 0), new Cell(1, 1, 0), new Cell(1, 2, 1)],
      [new Cell(2, 0, 0), new Cell(2, 1, 1), new Cell(2, 2, 0)],
    ];

    // Crear un objeto tablero para pasar a las funciones
    board = cells.map(row => row.map(cell => cell));
  });

  it("debe expandir correctamente las celdas vacías", () => {
    spyOn(cells[1][1], "expand").and.callThrough();
    cells[1][1].expand(board);

    expect(cells[1][1].isReleaved).toBeTrue();
    expect(cells[1][0].isReleaved).toBeTrue(); // Vecino vacío
    expect(cells[0][0].isReleaved).toBeTrue(); // Vecino vacío
    expect(cells[0][1].isReleaved).toBeFalse(); // Mina vecina, no se expande
  });
});



const { JSDOM } = require('jsdom');
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;
