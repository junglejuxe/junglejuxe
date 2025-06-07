<script>
const tracks = [
  { title: "Track 1", artist: "CAEV", src: "previews/track1.mp3", duration: "0:30" },
  { title: "Track 2", artist: "CAEV", src: "previews/track2.mp3", duration: "0:30" },
  // ... Add all tracks here
];
let currentTrack = 0;
let audio = new Audio(tracks[currentTrack].src);

const trackListEl = document.getElementById('trackList');
const progressFill = document.getElementById('progressFill');

tracks.forEach((track, index) => {
  const el = document.createElement('div');
  el.className = "track";
  el.innerHTML = `
    <div class="track-info">
      <span>${track.title}</span>
      <span>${track.duration}</span>
    </div>
  `;
  el.onclick = () => playTrack(index);
  trackListEl.appendChild(el);
});

function playTrack(index) {
  currentTrack = index;
  audio.src = tracks[index].src;
  audio.play();
}

function togglePlay() {
  if (audio.paused) audio.play();
  else audio.pause();
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length;
  playTrack(currentTrack);
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  playTrack(currentTrack);
}

audio.ontimeupdate = () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = percent + "%";
};
</script>
