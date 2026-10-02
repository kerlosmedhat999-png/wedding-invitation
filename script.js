const opening = document.getElementById("opening");
const invitation = document.getElementById("invitation");
const openButton = document.getElementById("openInvitation");
const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const coupleVideo = document.getElementById("coupleVideo");

let musicWasPlayingBeforeVideo = false;

async function playBackgroundMusic() {
  try {
    await backgroundMusic.play();
    musicButton.classList.add("is-playing");
    musicButton.setAttribute("aria-label", "Pause music");
  } catch (error) {
    musicButton.classList.remove("is-playing");
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

// Pause background music when the video starts.
coupleVideo.addEventListener("play", () => {
  musicWasPlayingBeforeVideo = !backgroundMusic.paused;

  if (musicWasPlayingBeforeVideo) {
    pauseBackgroundMusic();
  }
});

// Resume music when the video is paused.
coupleVideo.addEventListener("pause", async () => {
  if (musicWasPlayingBeforeVideo) {
    musicWasPlayingBeforeVideo = false;
    await playBackgroundMusic();
  }
});

// Resume music when the video finishes.
coupleVideo.addEventListener("ended", async () => {
  if (musicWasPlayingBeforeVideo) {
    musicWasPlayingBeforeVideo = false;
    await playBackgroundMusic();
  }
});

// Countdown: October 27, 2026, at 5:00 PM Cairo time.
const weddingDate = new Date(
  "2026-10-27T17:00:00+02:00"
).getTime();

const pad = (number) => String(number).padStart(2, "0");

function updateCountdown() {
  const distance = weddingDate - Date.now();

  if (distance <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  document.getElementById("days").textContent =
    Math.floor(distance / 86400000);

  document.getElementById("hours").textContent =
    pad(Math.floor((distance % 86400000) / 3600000));

  document.getElementById("minutes").textContent =
    pad(Math.floor((distance % 3600000) / 60000));

  document.getElementById("seconds").textContent =
    pad(Math.floor((distance % 60000) / 1000));
}

updateCountdown();
setInterval(updateCountdown, 1000);