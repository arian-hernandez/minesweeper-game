import { showLosePopup } from "./game.js";

export default class Timer {
  constructor(game) {
    this.initialDuration = game.seconds; // Duración inicial en segundos
    this.remainingTime = this.initialDuration; // Tiempo restante
    this.intervalId = null; // ID del temporizador
    this.game = game;
  }

  start() {
    if (this.intervalId) return; // Evita múltiples intervalos

    this.intervalId = setInterval(() => {
      this.remainingTime -= 1; // Reduce el tiempo en 1 segundo
      this.updateTimerUI(this.remainingTime); // Actualiza la UI

      if (this.remainingTime <= 0) {
        this.stop(); // Detiene el temporizador
        showLosePopup();
      }
    }, 1000);
    console.log('timer started');
  }

  updateTimerUI(remainingTime) {
    const timerElement = document.getElementById('timer'); // Asume que tienes un elemento para el tiempo
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
  
    timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }


  pause() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  reset() {
    this.stop();
    this.remainingTime = this.initialDuration;
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}
