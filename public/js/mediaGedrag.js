function goToVideo(video) {
    window.location.href = "http://localhost:3000/media/movies?name="+video;
}
function goToAudio(video) {
    window.location.href = "http://localhost:3000/media/music?name="+video;
}

function setMediaSrc() {
    // Get the query from the url
    const query = window.location.search;
    // Parse the query in an URLSearchParams object (which has handy functions)
    const params = new URLSearchParams(query);
    // Get the name out the params
    const name = params.get('name');

    const player = document.getElementById('player');
    if (player.tagName === "VIDEO") {
        player.src = '/../../assets/video/' + name;
    } else if (player.tagName === "AUDIO") {
        player.src = '/../../assets/music/' + name;
    }

}

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

