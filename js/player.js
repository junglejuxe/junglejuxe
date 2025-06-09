// player.js

const audioPlayer = new Audio();
const playPauseBtn = document.getElementById("playPauseBtn");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const songList = document.getElementById("song-list");

const tracks = [
  { title: "1. IT’S GOING DOWN", file: "previews/song1.mp3" },
  { title: "2. PROPER", file: "previews/song2.mp3" },
  { title: "3. GOGOCLUB", file: "previews/song3.mp3" },
  { title: "4. NECK BACK", file: "previews/song4.wav" },
  { title: "5. MY MONEY FT. NIKO VALID", file: "previews/song5.mp3" },
  { title: "6. JHE’S INTERLUDE (DUTTY BWOY)", file: "previews/song6.mp3" },
  { title: "7.  UUU KNOW ILOVEUUU", file: "previews/song7.mp3" },
  { title: "8. CAUGHT A PLAY FT. DONALD GRUNGE", file: "previews/song8.mp3" },
  { title: "9. NO SLOW MOTION", file: "previews/song9.mp3" },
  { title: "10. SWAG SURFIN", file: "previews/song10.m4a" },
  { title: "11. STAND ON IT", file: "previews/song9.mp3" },
  { title: "12. LOW TIDES", file: "previews/song9.mp3" }
];

let currentTrackIndex = 0;
let isPlaying = false;

function renderTrackList() {
  songList.innerHTML = "";
  tracks.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = track.title;
    if (index === currentTrackIndex) {
      li.style.fontWeight = "bold";
      li.style.color = "#00f5ff";
    }
    li.addEventListener("click", () => {
      currentTrackIndex = index;
      loadTrack(currentTrackIndex);
      playTrack();
    });
    songList.appendChild(li);
  });
}

function loadTrack(index) {
  audioPlayer.src = tracks[index].file;
  highlightCurrentTrack();
}

function playTrack() {
  audioPlayer.play();
  isPlaying = true;
  playPauseBtn.textContent = "⏸";
}

function pauseTrack() {
  audioPlayer.pause();
  isPlaying = false;
  playPauseBtn.textContent = "▶️";
}

function togglePlay() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

function highlightCurrentTrack() {
  const listItems = songList.querySelectorAll("li");
  listItems.forEach((item, index) => {
    item.style.fontWeight = index === currentTrackIndex ? "bold" : "normal";
    item.style.color = index === currentTrackIndex ? "#00f5ff" : "#fff";
  });
}

audioPlayer.addEventListener("timeupdate", () => {
  const current = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  progress.value = (current / duration) * 100;
  currentTimeEl.textContent = formatTime(current);
  durationEl.textContent = formatTime(duration);
});

progress.addEventListener("input", () => {
  const duration = audioPlayer.duration;
  audioPlayer.currentTime = (progress.value / 100) * duration;
});

audioPlayer.addEventListener("ended", () => {
  nextTrack();
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Init
renderTrackList();
loadTrack(currentTrackIndex);
