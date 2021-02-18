const musicContainer = document.querySelector('#music-container'),
    playBtn = document.querySelector('#play'),
    prevBtn = document.querySelector('#prev'),
    nextBtn = document.querySelector('#next'),
    audio = document.querySelector('#audio'),
    progress = document.querySelector('#progress'),
    progressContainer = document.querySelector('#progress_container'),
    title = document.querySelector('#title'),
    cover = document.querySelector('#cover')
// songs titles
const songs = ['hey', 'summer', 'ukulele'];

// keep track of song 
let songIndex = 2;

// init load song details into DOM
loadSong(songs[songIndex]);

// update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
    
}

// pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

// previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.getElementsByClassName.width = `${progressPercent}%`;
}

// set progress  bar
function setProgress(e) {
    // get total width of this element
    const width = this.clientWidth;
    // get current click position
    const clickX = e.offsetX;
    // complete duration
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// event listener
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// time/song update
audio.addEventListener('timeupdate', updateProgress);
// click on progress bar
progressContainer.addEventListener('click', setProgress);
// song ends - next song
audio.addEventListener('ended', nextSong);