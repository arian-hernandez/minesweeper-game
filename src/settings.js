document.addEventListener("DOMContentLoaded", () => {
  const playerNameInput = document.getElementById("player-name");
  const themeToggle = document.getElementById("theme-toggle");
  const soundToggle = document.getElementById("sound-toggle");
  const resetDataBtn = document.getElementById("reset-data");

  // Load saved settings
  const savedName = localStorage.getItem("playerName");
  const savedTheme = localStorage.getItem("theme") || "light";
  const savedSound = localStorage.getItem("sound") === "true";

  if (savedName) playerNameInput.value = savedName;

  document.body.dataset.theme = savedTheme;
  soundToggle.textContent = savedSound ? "Disable Sound" : "Enable Sound";

  // Save player name
  playerNameInput.addEventListener("input", () => {
    localStorage.setItem("playerName", playerNameInput.value);
  });

  // Toggle theme
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.dataset.theme === "light" ? "dark" : "light";
    document.body.dataset.theme = currentTheme;
    localStorage.setItem("theme", currentTheme);
  });

  // Toggle sound
  soundToggle.addEventListener("click", () => {
    const soundEnabled = soundToggle.textContent.includes("Enable");
    soundToggle.textContent = soundEnabled ? "Disable Sound" : "Enable Sound";
    localStorage.setItem("sound", soundEnabled);
  });

  // Reset data
  resetDataBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all data?")) {
      localStorage.clear();
      location.reload();
    }
  });
});
