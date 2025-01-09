export class AudioManager {
  constructor() {
    this.sounds = {
      flag: new Audio('/assets/sounds/flag.m4a'), // Sonido al poner una bandera
      win: new Audio('/assets/sounds/win.wav'), // Sonido al ganar
      lose: new Audio('/assets/sounds/lose.m4a'), // Sonido al perder
      reveal: new Audio('/assets/sounds/reveal.wav'),
    };
  }

  playSound(soundKey) {
    const sound = this.sounds[soundKey];
    if (sound) {
      sound.currentTime = 0; // Reinicia el sonido por si ya se estaba reproduciendo
      sound.play();
    } else {
      console.error(`Sound ${soundKey} not found!`);
    }
  }
}

export const audioManager = new AudioManager();
