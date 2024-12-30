import { Cell, SafeCell } from '../src/cell.js';

describe('Cell', () => {
  let cell;

  beforeEach(() => {
    cell = new Cell();
  });

  it('should correctly identify if it is a mine', () => {
    cell.value = 1;
    expect(cell.isMine()).toBe(1);
    cell.value = 0;
    expect(cell.isMine()).toBe(0);
  });

  it('should initialize with default properties', () => {
    expect(cell.value).toBe(0);
    expect(cell.isFlagged).toBe(false);
    expect(cell.isReleaved).toBe(false);
  });
});

describe('SafeCell', () => {
  let safeCell;

  beforeEach(() => {
    safeCell = new SafeCell();
  });

  it('should inherit from Cell', () => {
    expect(safeCell instanceof Cell).toBe(true);
  });

  it('should return undefined for getNeighbors (needs implementation)', () => {
    expect(safeCell.getNeighbors()).toBeUndefined();
  });

  it('should not throw an error when expanding (placeholder test)', () => {
    expect(() => safeCell.expand()).not.toThrow();
  });
});
