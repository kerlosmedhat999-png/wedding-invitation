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
  } catch (err) {
    console.log("المتصفح منع التشغيل التلقائي:", err);
  }
}

function pauseBackgroundMusic() {
  backgroundMusic.pause();
  musicButton.classList.remove("is-playing");
}

openButton.addEventListener("click", async () => {
  opening.classList.add("hidden");
  invitation.classList.remove("hidden");
  musicButton.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  await playBackgroundMusic();
});

musicButton.addEventListener("click", () => {
  if (backgroundMusic.paused) {
    playBackgroundMusic();
  } else {
    pauseBackgroundMusic();
  }
});

coupleVideo.addEventListener("play", () => {
  musicWasPlayingBeforeVideo = !backgroundMusic.paused;
  if (musicWasPlayingBeforeVideo) pauseBackgroundMusic();
});

coupleVideo.addEventListener("pause", () => {
  if (musicWasPlayingBeforeVideo) playBackgroundMusic();
});

coupleVideo.addEventListener("ended", () => {
  if (musicWasPlayingBeforeVideo) playBackgroundMusic();
});

// العداد - 27 اكتوبر 2026 الساعة 5 بتوقيت القاهرة
const weddingDate = new Date("2026-10-27T17:00:00+02:00").getTime();
const pad = (n) => String(n).padStart(2, "0");

function updateCountdown() {
  const distance = weddingDate - Date.now();
  const daysEl = document.getElementById("days");
  if (!daysEl) return;

  if (distance <= 0) {
    daysEl.textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  daysEl.textContent = Math.floor(distance / 86400000);
  document.getElementById("hours").textContent = pad(Math.floor((distance % 86400000) / 3600000));
  document.getElementById("minutes").textContent = pad(Math.floor((distance % 3600000) / 60000));
  document.getElementById("seconds").textContent = pad(Math.floor((distance % 60000) / 1000));
}

updateCountdown();
setInterval(updateCountdown, 1000);