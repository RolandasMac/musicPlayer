"use strict";
// console.log('TypeScript veikia!')
const audioSongSrc = document.querySelector('audio');
const myFile = document.querySelector('#myfile');
const video = document.querySelector('video');
const myVideo = document.querySelector('#myVideo');
const vol = document.querySelector('#vol');
const musicVol = document.querySelector('#musicVol');
const durationProgress = document.querySelector('#durationProgress');
const btnPlayPause = document.querySelector('#btnPlayPause');
const btnStop = document.querySelector('#btnStop');
const timeDuration = document.querySelector('#timeDuration');
let duration = 0;
myFile.addEventListener('change', selectSong);
function selectSong(e) {
    e.preventDefault();
    let file = myFile.files[0];
    // console.log((myFile.files as FileList)[0].name);
    let url = URL.createObjectURL(file);
    // console.log(URL.createObjectURL(file));
    audioSongSrc.children[0].setAttribute('src', `${url}`);
    audioSongSrc.load();
    // console.log((audioSongSrc as HTMLAudioElement));
    musicVolumeControl();
    musicDurationControl();
    btnPlayPause.textContent = "⏸";
}
function musicVolumeControl() {
    musicVol.value = `${audioSongSrc.volume * 100}`;
    musicVol.addEventListener('change', (e) => {
        console.log(Number(musicVol.value) / 100);
        audioSongSrc.volume = Number(musicVol.value) / 100;
    });
}
function musicDurationControl() {
    // console.log(duration, "Prieš");
    clearInterval(duration);
    audioSongSrc.addEventListener('loadeddata', (e) => {
        // alert("Veikia!")
        timeDuration.textContent = `${(audioSongSrc.duration).toFixed(0)}`;
        durationProgress.max = `${(audioSongSrc.duration).toFixed(0)}`;
    });
    duration = setInterval(() => {
        durationProgress.value = `${(audioSongSrc.currentTime).toFixed(0)}`;
    }, 1000);
    // console.log(duration, "Po");
}
btnPlayPause.addEventListener('click', (e) => {
    if (audioSongSrc.paused) {
        audioSongSrc.play();
        btnPlayPause.textContent = "⏸";
        musicDurationControl();
    }
    else {
        audioSongSrc.pause();
        btnPlayPause.textContent = "▶️";
    }
});
btnStop.addEventListener('click', (e) => {
    audioSongSrc.pause();
    audioSongSrc.currentTime = 0;
    btnPlayPause.textContent = "▶️";
    clearInterval(duration);
});
// myVideo.addEventListener('change', selectVideo);
//
// function selectVideo(e:Event):void{
//     e.preventDefault();
//     let file = (myVideo.files as FileList)[0];
//     // console.log((myFile.files as FileList)[0].name);
//     let url = URL.createObjectURL(file);
//     // console.log(URL.createObjectURL(file));
//     (video as HTMLElement).children[0].setAttribute('src',`${url}`);
//     (video as HTMLVideoElement).load();
//     volumeControl()
// }
//
// function volumeControl(){
//     vol.value = `${video.volume*100}`
//     vol.addEventListener('change', (e) => {
//         console.log(Number(vol.value)/100);
//         video.volume = Number(vol.value)/100;
//     })
// }
//
//
// function gautiParam(){
//     vol.value = `${video.volume*100}`
//     console.log(video.volume, vol.value);
// }
