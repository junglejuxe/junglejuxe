const audioPlayer = new Audio();
const playPauseBtn = document.getElementById("playPauseBtn");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const trackListContainer = document.getElementById("trackList");

const tracks = [
  {
    title: "1. IT’S GOING DOWN",
    file: "previews/song1.mp3"
  },
  {
    title: "2. PROPER",
    file: "previews/song2.mp3"
  },
  {
    title: "3. GOGOCLUB",
    file: "previews/song3.mp3"
  },
  {
    title: "4. NECK BACK",
    file: "previews/song4.wav"
  },
  {
    title: "5. MY MONEY FT. NIKO VALID",
    file: "previews/song5.mp3"
  },
  {
    title: "6. JHE’S INTERLUDE (DUTTY BWOY)",
    file: "previews/song6.mp3"
  },
  {
    title: "7.  UUU KNOW ILOVEUUU",
    file: "previews/song7.mp3"
  },
  {
    title: "8. CAUGHT A PLAY FT. DONALD GRUNGE",
    file: "previews/song8.mp3"
  },
  {
    title: "9. NO SLOW MOTION",
    file: "previews/song9.mp3"
  },
  {
    title: "10. SWAG SURFIN",
    file: "previews/song10.m4a"
  },
  {
    title: "11. STAND ON IT",
    file: "previews/song9.mp3"
  },
  {
    title: "12. LOW TIDES",
    file: "previews/song9.mp3"
  }
];

let currentTrackIndex = 0;
let isPlaying = false;

// Load and display tracklist
function renderTrackList() {
  trackListContainer.innerHTML = "";
  tracks.forEach((track, index) => {
    const trackEl = document.createElement("div");
    trackEl.classList.add("track");
    trackEl.setAttribute("data-title", track.title);
    trackEl.setAttribute("data-artist", "CAEV");
    if (index === currentTrackIndex) {
      trackEl.style.backgroundColor = "#1d3d0f";
    }
    trackEl.addEventListener("click", () => {
      currentTrackIndex = index;
      loadTrack(currentTrackIndex);
      playTrack();
    });
    trackListContainer.appendChild(trackEl);
  });
}

// Load track by index
function loadTrack(index) {
  audioPlayer.src = tracks[index].file;
  highlightCurrentTrack();
}

// Play the current track
function playTrack() {
  audioPlayer.play();
  isPlaying = true;
  playPauseBtn.textContent = "⏸";
}

// Pause playback
function pauseTrack() {
  audioPlayer.pause();
  isPlaying = false;
  playPauseBtn.textContent = "▶️";
}

// Toggle play/pause
function togglePlay() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

// Next track
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

// Previous track
function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

// Highlight current track in list
function highlightCurrentTrack() {
  const trackEls = document.querySelectorAll(".track");
  trackEls.forEach((el, idx) => {
    el.style.backgroundColor = idx === currentTrackIndex ? "#1d3d0f" : "rgba(0,0,0,0.4)";
  });
}

// Progress bar update
audioPlayer.addEventListener("timeupdate", () => {
  const current = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  progress.value = (current / duration) * 100;
  currentTimeEl.textContent = formatTime(current);
  durationEl.textContent = formatTime(duration);
});

// Seek
progress.addEventListener("input", () => {
  const duration = audioPlayer.duration;
  audioPlayer.currentTime = (progress.value / 100) * duration;
});

// Format time
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Auto play next track
audioPlayer.addEventListener("ended", () => {
  nextTrack();
});

// Initialize
renderTrackList();
loadTrack(currentTrackIndex);
