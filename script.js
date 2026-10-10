const opening = document.getElementById("opening");
const invitation = document.getElementById("invitation");
const openButton = document.getElementById("openInvitation");
const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

async function playBackgroundMusic() {
try {
await backgroundMusic.play();
musicButton.classList.add("is-playing");
musicButton.setAttribute("aria-label", "Pause music");
} catch (error) {
musicButton.classList.remove("is-playing");
musicButton.setAttribute("aria-label", "Play music");
}
}

function pauseBackgroundMusic() {
backgroundMusic.pause();
musicButton.classList.remove("is-playing");
musicButton.setAttribute("aria-label", "Play music");
}

openButton.addEventListener("click", async () => {
opening.classList.add("hidden");
invitation.classList.remove("hidden");
musicButton.classList.remove("hidden");

window.scrollTo({ top: 0, behavior: "smooth" });

await playBackgroundMusic();
});

musicButton.addEventListener("click", async () => {
if (backgroundMusic.paused) {
await playBackgroundMusic();
} else {
pauseBackgroundMusic();
}
});

// Countdown to October 27, 2026, at 5:00 PM Cairo time.
const weddingDate = new Date(
"2026-10-27T17:00:00+02:00"
).getTime();

const pad = (number) => String(number).padStart(2, "0");

function updateCountdown() {
const distance = weddingDate - Date.now();

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

if (!days || !hours || !minutes || !seconds) return;

if (distance <= 0) {
days.textContent = "00";
hours.textContent = "00";
minutes.textContent = "00";
seconds.textContent = "00";
return;
}

days.textContent = Math.floor(distance / 86400000);
hours.textContent = pad(
Math.floor((distance % 86400000) / 3600000)
);
minutes.textContent = pad(
Math.floor((distance % 3600000) / 60000)
);
seconds.textContent = pad(
Math.floor((distance % 60000) / 1000)
);
}

updateCountdown();
setInterval(updateCountdown, 1000);