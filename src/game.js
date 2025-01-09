import Board from "./board.js";
import Timer from "./timer.js";

export default class Game {
  difficulty = "easy";
  numberOfRows = 5;
  numberOfColumns = 5;
  numberOfMines = 8;
  seconds = 0;
  timer = null; // Add timer reference

  constructor(settings) {
    if (settings && settings.difficulty) {
      this.difficulty = settings.difficulty;
    }

    switch (this.difficulty) {
      case "easy":
        this.numberOfRows = 8;
        this.numberOfColumns = 8;
        this.numberOfMines = 10;
        this.seconds = 60;
        break;

      case "normal":
        this.numberOfRows = 16;
        this.numberOfColumns = 16;
        this.numberOfMines = 40;
        this.seconds = 180;
        break;

      case "hard":
        this.numberOfRows = 16;
        this.numberOfColumns = 30;
        this.numberOfMines = 99;
        this.seconds = 300;
        break;

      case "extreme":
        this.numberOfRows = 24;
        this.numberOfColumns = 30;
        this.numberOfMines = 200;
        this.seconds = 480;
        break;

      default:
        throw new Error(`Unknown difficulty level: ${this.difficulty}`);
    }
  }

  setTimer(timer) {
    this.timer = timer;
  }

  win() {
    if (this.timer) {
      this.timer.stop();
    }
    showWinPopup();
  }

  lose() {
    if (this.timer) {
      this.timer.stop();
    }
    const loseText = document.querySelector('.js-title-baner');
    loseText.innerHTML = 'Explotaste como cafunga';
    showLosePopup();
  }
}

// Mostrar el popup
function showWinPopup() {
  const popup = document.getElementById("end-popup");
  popup.classList.remove("hidden");
  popup.innerHTML = `
   <div class="popup-content">
      <h2>This field is safe now <br><b>thanks to you.</b></h2>
      <p>You discovered all the mines in the board.</p>
      <button id="close-popup">Hurray!</button>
    </div>
  `;
  document.getElementById("close-popup").addEventListener("click", hideEndPopup);
}

export function showLosePopup() {
  const popup = document.getElementById("end-popup");
  popup.classList.remove("hidden");
  popup.innerHTML = `
   <div class="popup-content">
      <h2>You blew it, literally...</b></h2>
      <p>But because it's just a game you can try again.</p>
      <button id="close-popup">Oopsy</button>
    </div>
  `;
  document.getElementById("close-popup").addEventListener("click", hideEndPopup);
}

// Ocultar el popup
function hideEndPopup() {
  const popup = document.getElementById("end-popup");
  popup.classList.add("hidden");
}

//get the theme customization
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);