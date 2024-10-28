// Initializes the variables
let songIndex = 0;
let audioElement = new Audio();
let masterplay = document.querySelector('.masterPlay');
let gif = document.querySelector('#gif');
let progressbar = document.querySelector('#myProgressBar');
let backwardButton = document.querySelector('img[alt="<-"]');
let forwardButton = document.querySelector('img[alt="->"]');

let songs = [
    { songname: 'Mast Magan', filepath: 'Mast Magan (LoFi Slowed Reversed) Arijit Singh X Arjun Kapoor.mp3', coverpath: 'mastmagan.jpg' },
    { songname: 'Tum mile', filepath: 'Tum Mile (Slowed Reverb)_320(PagalWorld.com.so).mp3', coverpath: 'tummile.jpg' },
    { songname: 'Phir Kabhi', filepath: 'Phir Kabhi (Slowed Reverb)(PagalWorld.com.sb).mp3', coverpath: 'phirkabhi.jpg' },
    { songname: 'Dekh Lena', filepath: 'Dekh-Lena-(slowed-n-reverb)(PagalWorld).mp3', coverpath: 'dekhlena.jpg' },
    { songname: 'Pehle Bhi Mai', filepath: 'Pehle Bhi Main (Slowed Reverb)(PagalWorld.com.sb).mp3', coverpath: 'pehle.jpg' },
    { songname: 'Deewane hum nhi hote', filepath: 'Deewane Hum Nahi Hote(PagalWorld.com.sb).mp3', coverpath: 'deewa.jpg' },
    { songname: 'Humnava Mere', filepath: 'Humnava-Mere-Lofi-Slow-Reverb(PagalWorld).mp3', coverpath: 'hum.jpg' },
    { songname: 'Saudebaazi', filepath: 'Saude Bazi Slowed Reverb_128-(PagalWorld).mp3', coverpath: 'sau.webp' },
    { songname: 'Satranga', filepath: 'satranga.mp3', coverpath: 'satranga.webp' },
    { songname: 'Dil sambhal ja jara', filepath: 'Dil Sambhal Jaa Zara Lofi(PagalWorld.com.so).mp3', coverpath: 'dil.jpg' }
];

// Function to play the selected song
function playSong(index) {
    audioElement.src = songs[index].filepath;
    audioElement.currentTime = 0; // Reset playback to the beginning
    audioElement.play();
    masterplay.src = 'pause-button-symbol-icon-illustration-free-vector.jpg';
    gif.style.opacity = 1; // Show the gif when playing
}

// Function to update the progress bar
function updateProgressBar() {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressbar.value = progress;
}

// Continuously update progress bar while the song is playing
audioElement.addEventListener('timeupdate', updateProgressBar);

// Handle click/pause events
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.src = 'pause-button-symbol-icon-illustration-free-vector.jpg';
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterplay.src = 'dd.png';
        gif.style.opacity = 0;
    }
});

// Backward button functionality
backwardButton.addEventListener('click', () => {
    songIndex--; // Move to the previous song
    if (songIndex < 0) {
        songIndex = songs.length - 1; // Loop back to the last song
    }
    audioElement.pause(); // Pause the current song before changing
    playSong(songIndex); // Play the previous song
});

// Forward button functionality
forwardButton.addEventListener('click', () => {
    songIndex++; // Move to the next song
    if (songIndex >= songs.length) {
        songIndex = 0; // Loop back to the first song
    }
    audioElement.pause(); // Pause the current song before changing
    playSong(songIndex); // Play the next song
});

// Play specific song from the song list
document.querySelectorAll('.playb').forEach((button, index) => {
    button.addEventListener('click', () => {
        songIndex = index; // Update the current song index
        audioElement.pause(); // Pause current song before changing
        playSong(songIndex); // Play the selected song
    });
});

// Initial song setup
playSong(songIndex);

// Toggle 'active' class on song item click
document.querySelectorAll('.songItem').forEach(item => {
    item.addEventListener('click', function () {
        // Toggle the 'active' class on the clicked item
        this.classList.toggle('active');
    });
});
