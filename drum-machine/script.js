const drumPads = document.querySelectorAll(".drum-pad");
const display = document.getElementById("display");

function formatPadName(padId) {
  return padId
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function activatePad(pad) {
  const audio = pad.querySelector("audio");

  if (!audio) return;

  audio.currentTime = 0;
  audio.play();
  display.textContent = formatPadName(pad.id);

  pad.classList.add("active");
  window.setTimeout(() => {
    pad.classList.remove("active");
  }, 120);
}

drumPads.forEach((pad) => {
  pad.addEventListener("click", () => {
    activatePad(pad);
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  const audio = document.getElementById(key);
  const pad = audio?.closest(".drum-pad");

  if (pad) {
    activatePad(pad);
  }
});
