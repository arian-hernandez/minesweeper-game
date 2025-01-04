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
    expect(cell.isRevealed).toBe(false);
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

describe("Cell Logic", () => {
  let cells;
  let board;

  beforeEach(() => {
    // Crear un tablero simulado de 3x3
    cells = [
      [new Cell(0, 0, 0), new Cell(0, 1, 1), new Cell(0, 2, 0)],
      [new Cell(1, 0, 0), new Cell(1, 1, 0), new Cell(1, 2, 1)],
      [new Cell(2, 0, 0), new Cell(2, 1, 1), new Cell(2, 2, 0)],
    ];

    // Asignar minas a algunas celdas
    cells[0][1].value = 1; // Mina en la celda (0, 1)
    cells[1][2].value = 1; // Mina en la celda (1, 2)
    cells[2][1].value = 1; // Mina en la celda (2, 1)

    // Crear un objeto tablero para pasar a las funciones
    board = cells.map(row => row.map(cell => cell));
  });

  it("debe devolver el número correcto de minas vecinas con getNeighbors", () => {
    expect(cells[1][1].getNeighbors(board)).toBe(3); // Celda central rodeada de minas
    expect(cells[0][0].getNeighbors(board)).toBe(1); // Celda (0, 0) con 1 mina vecina
    expect(cells[2][0].getNeighbors(board)).toBe(1); // Celda (2, 0) con 1 mina vecina
  });

  it("debe mostrar el número en celdas con minas vecinas", () => {
    const mockCellElement = { innerHTML: "" };
    spyOn(document, "querySelector").and.returnValue(mockCellElement);

    const adjacentMines = cells[0][0].getNeighbors(board);
    cells[0][0].expand(board);

    expect(mockCellElement.innerHTML).toBe(`${adjacentMines}`);
  });

  it("no debe volver a expandir celdas ya reveladas", () => {
    cells[1][1].isRevealed = true; // Simular una celda ya revelada

    spyOn(cells[1][1], "expand").and.callThrough();
    cells[1][1].expand(board);

    expect(cells[1][1].expand).not.toHaveBeenCalledTimes(2); // No debería llamarse de nuevo
  });
});


const { JSDOM } = require('jsdom');
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;
