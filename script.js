document.addEventListener("DOMContentLoaded", function () {
const opening = document.getElementById("opening");
const invitation = document.getElementById("invitation");
const openButton = document.getElementById("openInvitation");

// Match the exact ID used in your HTML
const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("msicButton");

// -----------------------------
// OPEN THE WEDDING INVITATION
// -----------------------------
if (openButton && opening && invitation) {
openButton.addEventListener("click", async function () {
opening.classList.add("hidden");
invitation.classList.remove("hidden");

  if (musicButton) {
    musicButton.classList.remove("hidden");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  await playBackgroundMusic();
});

}

// -----------------------------
// BACKGROUND MUSIC
// -----------------------------
async function playBackgroundMusic() {
if (!backgroundMusic) return;

try {
  await backgroundMusic.volume = 1;
backgroundMusic.play().catch(error => {
  console.log("Music playback was blocked:", error);
});

  if (musicButton) {
    musicButton.classList.add("is-playing");
    musicButton.textContent = "♫";
    musicButton.setAttribute("aria-label", "Pause music");
  }
} catch (error) {
  console.log("Music could not play. Check the audio file path.", error);

  if (musicButton) {
    musicButton.classList.remove("is-playing");
    musicButton.textContent = "♪";
    musicButton.setAttribute("aria-label", "Play music");
  }
}

}

function pauseBackgroundMusic() {
if (!backgroundMusic) return;

backgroundMusic.pause();

if (musicButton) {
  musicButton.classList.remove("is-playing");
  musicButton.textContent = "♪";
  musicButton.setAttribute("aria-label", "Play music");
}

}

if (musicButton && backgroundMusic) {
musicButton.addEventListener("click", async function () {
if (backgroundMusic.paused) {
await playBackgroundMusic();
} else {
pauseBackgroundMusic();
}
});
}

// Keep the music button synchronized with actual audio playback
if (backgroundMusic) {
backgroundMusic.addEventListener("play", function () {
if (musicButton) {
musicButton.classList.add("is-playing");
musicButton.textContent = "♫";
musicButton.setAttribute("aria-label", "Pause music");
}
});

backgroundMusic.addEventListener("pause", function () {
  if (musicButton) {
    musicButton.classList.remove("is-playing");
    musicButton.textContent = "♪";
    musicButton.setAttribute("aria-label", "Play music");
  }
});

}

// -----------------------------
// COUNTDOWN TO THE WEDDING
// October 27, 2026, at 5:00 PM Cairo time
// -----------------------------
const weddingDate = new Date(
"2026-10-27T17:00:00+03:00"
).getTime();

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function pad(number) {
return String(number).padStart(2, "0");
}

function updateCountdown() {
if (
!daysElement ||
!hoursElement ||
!minutesElement ||
!secondsElement
) {
return;
}

const distance = weddingDate - Date.now();

if (distance <= 0) {
  daysElement.textContent = "00";
  hoursElement.textContent = "00";
  minutesElement.textContent = "00";
  secondsElement.textContent = "00";
  return;
}

const days = Math.floor(distance / 86400000);
const hours = Math.floor((distance % 86400000) / 3600000);
const minutes = Math.floor((distance % 3600000) / 60000);
const seconds = Math.floor((distance % 60000) / 1000);

daysElement.textContent = String(days);
hoursElement.textContent = pad(hours);
minutesElement.textContent = pad(minutes);
secondsElement.textContent = pad(seconds);

}

updateCountdown();
setInterval(updateCountdown, 1000);
});