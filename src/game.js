import Board from "./board.js";

export default class Game {
  difficulty = "easy";
  numberOfRows = 5;
  numberOfColumns = 5;
  numberOfMines = 8;

  constructor(settings) {
    if (settings && settings.difficulty) {
      this.difficulty = settings.difficulty;
    }

    switch (this.difficulty) {
      case "easy":
        this.numberOfRows = 8;
        this.numberOfColumns = 8;
        this.numberOfMines = 10;
        break;

      case "normal":
        this.numberOfRows = 16;
        this.numberOfColumns = 16;
        this.numberOfMines = 40;
        break;

      case "hard":
        this.numberOfRows = 16;
        this.numberOfColumns = 30;
        this.numberOfMines = 99;
        break;

      case "extreme":
        this.numberOfRows = 24;
        this.numberOfColumns = 30;
        this.numberOfMines = 200;
        break;

      default:
        throw new Error(`Unknown difficulty level: ${this.difficulty}`);
    }
  }

  isWin(board) {
    // Implementar lógica para verificar si el jugador ha ganado
  }

  isLose() {
    // Implementar lógica para verificar si el jugador ha perdido
  }

  timer() {
    // Implementar lógica para el temporizador
  }
}
