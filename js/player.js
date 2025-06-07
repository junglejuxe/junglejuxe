function purchaseAlbum() {
  alert("Redirecting to payment... (Stripe integration placeholder)");
}

document.addEventListener('DOMContentLoaded', () => {
  const allAudio = document.querySelectorAll('audio');
  allAudio.forEach(audio => {
    audio.addEventListener('play', () => {
      allAudio.forEach(other => {
        if (other !== audio) {
          other.pause();
        }
      });
    });
  });
});

const tracks = [
  "track1.mp3", "track2.mp3", "track3.mp3", "track4.mp3", "track5.mp3",
  "track6.mp3", "track7.mp3", "track8.mp3", "track9.mp3", "track10.mp3", "track11.mp3"
];
let currentTrack = 0;
let audio = new Audio(`previews/${tracks[currentTrack]}`);
let isPlaying = false;

const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const trackList = document.getElementById("trackList");

// Generate track list display
tracks.forEach((track, i) => {
  const div = document.createElement("div");
  div.className = "track";
  div.innerHTML = `
    <div class="track-info"><span>Track ${i + 1}</span><span>CAEV</span></div>
  `;
  trackList.appendChild(div);
});

// Controls
function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  } else {
    audio.play();
    playPauseBtn.textContent = "⏸️";
  }
  isPlaying = !isPlaying;
}

function nextTrack() {
  audio.pause();
  currentTrack = (currentTrack + 1) % tracks.length;
  audio = new Audio(`previews/${tracks[currentTrack]}`);
  audio.play();
  playPauseBtn.textContent = "⏸️";
  isPlaying = true;
}

function prevTrack() {
  audio.pause();
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  audio = new Audio(`previews/${tracks[currentTrack]}`);
  audio.play();
  playPauseBtn.textContent = "⏸️";
  isPlaying = true;
}

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = percent || 0;
});

progressBar.addEventListener("input", () => {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

