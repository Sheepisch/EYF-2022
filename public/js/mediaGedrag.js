// // // Get video's from directory
// const fs = fs();
// function getVideos() {
//     // const vidNames = fs.readdir('./public/assets/video');
//     console.log(fs);
// }


// ---------------------------------------------------------
// Start or pause the video
function togglePlay(playButton, player) {
    const video = document.getElementById(player)

    if (video.paused || video.ended) {
        video.play();
        playButton.innerHTML = '<i class="fa-solid fa-pause-circle"></i>';
    } else {
        video.pause();
        playButton.innerHTML = '<i class="fa-solid fa-play-circle"></i>';
    }
}

// Mute or unmute the video
function toggleMute(muteButton, player) {
    const video = document.getElementById(player)
    if (video.muted) {
        video.muted = false;
        muteButton.innerHTML = '<i class="fa-solid fa-volume-mute"></i>';
    } else {
        video.muted = true;
        muteButton.innerHTML = '<i class="fa-solid fa-volume-up"></i>';
    }
}

// Go in or out full screen mode
function toggleFullScreen(container, fullScreenButton) {
    const videoContainer = document.getElementById(container);
    if (document.fullscreenElement) {
        document.exitFullscreen();
        fullScreenButton.innerHTML = '<i class="fa-solid fa-expand-arrows-alt"></i>';
    } else if (document.webkitFullscreenElement) {
        // Need this to support Safari
        document.webkitExitFullscreen();
        fullScreenButton.innerHTML = '<i class="fa-solid fa-compress-arrows-alt"></i>';
    } else if (videoContainer.webkitRequestFullscreen) {
        // Need this to support Safari
        videoContainer.webkitRequestFullscreen();
        fullScreenButton.innerHTML = '<i class="fa-solid fa-compress-arrows-alt"></i>';
    } else {
        videoContainer.requestFullscreen();
        fullScreenButton.innerHTML = '<i class="fa-solid fa-compress-arrows-alt"></i>';
    }
}
// Timers ---------------------------------------------------------------------------------
const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');
// Get the time in minutes and seconds
function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

    return {
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2),
    };
};
// Sets the duration of the video and the max value of the time bar
function initializeVideo() {
    const videoDuration = Math.round(video.duration);
    const time = formatTime(videoDuration);
    duration.innerText = `${time.minutes}:${time.seconds}`;
    duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}

const iets = document.getElementById('player');
console.log(iets);
// iets.addEventListener('loadedmetadata', initializeVideo);