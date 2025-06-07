const tracks = [
  { title: "Track 1", artist: "CAEV", src: "previews/track1.mp3", duration: "0:30" },
  { title: "Track 2", artist: "CAEV", src: "previews/track2.mp3", duration: "0:30" },
  { title: "Track 3", artist: "CAEV", src: "previews/track3.mp3", duration: "0:30" },
  { title: "Track 4", artist: "CAEV", src: "previews/track4.mp3", duration: "0:30" },
  { title: "Track 5", artist: "CAEV", src: "previews/track5.mp3", duration: "0:30" },
  { title: "Track 6", artist: "CAEV", src: "previews/track6.mp3", duration: "0:30" },
  { title: "Track 7", artist: "CAEV", src: "previews/track7.mp3", duration: "0:30" },
  { title: "Track 8", artist: "CAEV", src: "previews/track8.mp3", duration: "0:30" },
  { title: "Track 9", artist: "CAEV", src: "previews/track9.mp3", duration: "0:30" },
  { title: "Track 10", artist: "CAEV", src: "previews/track10.mp3", duration: "0:30" },
  { title: "Track 11", artist: "CAEV", src: "previews/track11.mp3", duration: "0:30" }
];

let currentTrackIndex = 0;
let isPlaying = false;
const audio = new Audio(tracks[currentTrackIndex].src);

const playBtn = document.querySelector(".player-controls button:nth-child(2)");
const prevBtn = document.querySelector(".player-controls button:nth-child(1)");
const nextBtn = document.querySelector(".player-controls button:nth-child(3)");
const progressBar = document.getElementById("progressFill");
const trackListContainer = document.getElementById("trackList");

function renderTrackList() {
  trackListContainer.innerHTML = "";
  tracks.forEach((track, index) => {
    const div = document.createElement("div");
    div.classList.add("track");
    div.dataset.index = index;
    div.dataset.title = track.title;
    div.dataset.artist = track.artist;
    div.innerHTML = `
      <div class="track-info">
        <span>${track.title}</span>
        <span>${track.duration}</span>
      </div>
    `;
    div.addEventListener("click", () => {
      loadTrack(index);
      playTrack();
    });
    trackListContainer.appendChild(div);
  });
}

function loadTrack(index) {
  currentTrackIndex = index;
  audio.src = tracks[index].src;
  audio.load();
  if (isPlaying) {
    playTrack();
  }
}

function playTrack() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸️";
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶️";
}

function togglePlay() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
}

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = percent + "%";
});

audio.addEventListener("ended", nextTrack);

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevTrack);
nextBtn.addEventListener("click", nextTrack);

renderTrackList();
