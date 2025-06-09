const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressFill = document.getElementById('progressFill');
const trackListContainer = document.getElementById('trackList');

const songs = [
  'full/song1.mp3',
  'full/song2.mp3',
  'full/song3.mp3',
  'full/song4.mp3',
  'full/song5.mp3',
  'full/song6.mp3',
  'full/song7.mp3',
  'full/song8.mp3',
  'full/song9.mp3',
  'full/song10.mp3',
  'full/song11.mp3'
];

const songTitles = [
  'Track 1',
  'Track 2',
  'Track 3',
  'Track 4',
  'Track 5',
  'Track 6',
  'Track 7',
  'Track 8',
  'Track 9',
  'Track 10',
  'Track 11'
];

let currentSongIndex = 0;
let isPlaying = false;

function loadTrack(index) {
  audioPlayer.src = songs[index];
  updateTrackListHighlight();
}

function togglePlayPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.textContent = '⏸';
  } else {
    audioPlayer.pause();
    isPlaying = false;
    playPauseBtn.textContent = '▶️';
  }
}

function nextTrack() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadTrack(currentSongIndex);
  if (isPlaying) audioPlayer.play();
}

function prevTrack() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadTrack(currentSongIndex);
  if (isPlaying) audioPlayer.play();
}

function updateProgress() {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressFill.style.width = progress + '%';
}

function updateTrackListHighlight() {
  const trackItems = document.querySelectorAll('.track');
  trackItems.forEach((item, idx) => {
    if (idx === currentSongIndex) {
      item.style.fontWeight = 'bold';
      item.style.color = '#b6ff9c';
    } else {
      item.style.fontWeight = 'normal';
      item.style.color = '';
    }
  });
}

function renderTrackList() {
  trackListContainer.innerHTML = '';
  songs.forEach((song, index) => {
    const trackItem = document.createElement('div');
    trackItem.className = 'track';
    trackItem.setAttribute('data-title', songTitles[index]);
    trackItem.setAttribute('data-artist', 'CAEV');
    trackItem.textContent = songTitles[index];
    trackItem.onclick = () => {
      currentSongIndex = index;
      loadTrack(index);
      audioPlayer.play();
      isPlaying = true;
      playPauseBtn.textContent = '⏸';
    };
    trackListContainer.appendChild(trackItem);
  });
}

// Initial setup
renderTrackList();
loadTrack(currentSongIndex);

audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', nextTrack);
