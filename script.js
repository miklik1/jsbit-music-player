// DOM elements
const elements = {
  image: document.querySelector('img'),
  title: document.getElementById('title'),
  artist: document.getElementById('artist'),
  music: document.querySelector('audio'),
  progressContainer: document.getElementById('progress-container'),
  progress: document.getElementById('progress'),
  prevBtn: document.getElementById('prev'),
  playBtn: document.getElementById('play'),
  nextBtn: document.getElementById('next'),
};

// Music data
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];

// State
let isPlaying = false;
let currentSongIndex = 0;

// Play or Pause the song
function togglePlayPause() {
  isPlaying ? pauseSong() : playSong();
}

// Play the song
function playSong() {
  isPlaying = true;
  elements.playBtn.classList.replace('fa-play', 'fa-pause');
  elements.playBtn.setAttribute('title', 'Pause');
  elements.music.play();
}

// Pause the song
function pauseSong() {
  isPlaying = false;
  elements.playBtn.classList.replace('fa-pause', 'fa-play');
  elements.playBtn.setAttribute('title', 'Play');
  elements.music.pause();
}

// Update the DOM with the current song's data
function loadSong() {
  const currentSong = songs[currentSongIndex];
  elements.title.textContent = currentSong.displayName;
  elements.artist.textContent = currentSong.artist;
  elements.music.src = `music/${currentSong.name}.mp3`;
  elements.image.src = `img/${currentSong.name}.jpg`;
}

// Play the next song in the playlist
function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong();
  playSong();
}

// Play the previous song in the playlist
function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong();
  playSong();
}

// Load the first song when the page loads
loadSong();

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
  }
}

// Event Listeners
elements.playBtn.addEventListener('click', togglePlayPause);
elements.nextBtn.addEventListener('click', playNextSong);
elements.prevBtn.addEventListener('click', playPreviousSong);
elements.music.addEventListener('timeupdate', updateProgressBar)