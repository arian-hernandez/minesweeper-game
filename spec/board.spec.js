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
