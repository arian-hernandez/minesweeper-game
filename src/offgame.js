document.addEventListener("DOMContentLoaded", () => {
  const startGameBtn = document.getElementById("start-game");
  const difficultyModal = document.getElementById("difficulty-modal");
  const difficultyForm = document.getElementById("difficulty-form");
  const closeModalBtn = document.getElementById("close-modal");

  // Mostrar el modal al hacer clic en "Start Game"
  startGameBtn.addEventListener("click", () => {
    difficultyModal.classList.remove("hidden");
  });

  // Cerrar el modal al hacer clic en la "X"
  closeModalBtn.addEventListener("click", () => {
    difficultyModal.classList.add("hidden");
  });

  // Capturar la selección de dificultad y redirigir
  difficultyForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    const difficulty = document.querySelector('input[name="difficulty"]:checked').value;

    // Redirigir con parámetros en la URL
    window.location.href = `game.html?difficulty=${difficulty}`;
  });
});
