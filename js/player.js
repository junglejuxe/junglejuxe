const tracks = [
  { title: "1. IT’S GOING DOWN *preview*", file: "previews/song1.mp3" },
  { title: "2. PROPER *preview*", file: "previews/song2.mp3" },
  { title: "3. GOGOCLUB *preview*", file: "previews/song3.mp3" },
  { title: "4. NECK BACK *preview*", file: "previews/song4.mp3" },
  { title: "5. MY MONEY FT. NIKO VALID *preview*", file: "previews/song5.mp3" },
  { title: "6. JHE’S INTERLUDE (DUTTY BWOY) *preview*", file: "previews/song6.mp3" },
  { title: "7. UUU KNOW ILOVEUUU *preview*", file: "previews/song7.mp3" },
  { title: "8. CAUGHT A PLAY FT. DONALD GRUNGE *preview*", file: "previews/song8.mp3" },
  { title: "9. NO SLOW MOTION *preview*", file: "previews/song9.mp3" },
  { title: "10. SWAG SURFIN *preview*", file: "previews/song10.mp3" },
  { title: "11. STAND ON IT *preview*", file: "previews/song11.mp3" },
  { title: "12. LOW TIDES *preview*", file: "previews/song12.mp3" }
];

let currentTrackIndex = 0;
const audio = new Audio();
const trackListContainer = document.getElementById("trackList");

function renderTrackList() {
  trackListContainer.innerHTML = "";
  tracks.forEach((track, index) => {
    const trackElement = document.createElement("div");
    trackElement.classList.add("track-item");
    trackElement.textContent = track.title;
    trackElement.onclick = () => {
      currentTrackIndex = index;
      playTrack();
    };
    trackListContainer.appendChild(trackElement);
  });
}

function playTrack() {
  const track = tracks[currentTrackIndex];
  audio.src = track.file;
  audio.play();
  updateTrackHighlight();
  document.getElementById("playPauseBtn").textContent = "⏸";
}

function updateTrackHighlight() {
  const items = document.querySelectorAll(".track-item");
  items.forEach((item, i) => {
    item.classList.toggle("active", i === currentTrackIndex);
  });
}

function togglePlay() {
  if (!audio.src) {
    // No song loaded yet — start with the first track
    currentTrackIndex = 0;
    playTrack();
    return;
  }

  if (audio.paused) {
    audio.play();
    document.getElementById("playPauseBtn").textContent = "⏸";
  } else {
    audio.pause();
    document.getElementById("playPauseBtn").textContent = "▶️";
  }
}


function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  playTrack();
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  playTrack();
}

audio.ontimeupdate = () => {
  const progress = document.getElementById("progress");
  const current = document.getElementById("currentTime");
  const duration = document.getElementById("duration");

  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  current.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
};

function formatTime(t) {
  const minutes = Math.floor(t / 60);
  const seconds = Math.floor(t % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

document.getElementById("progress").addEventListener("input", (e) => {
  const seekTime = (audio.duration * e.target.value) / 100;
  audio.currentTime = seekTime;
});

// Initialize
renderTrackList();
