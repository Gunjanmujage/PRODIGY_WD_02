// script.js
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString().padStart(2, '0');

    return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

function print(txt) {
    document.getElementById('time').innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton('PAUSE');
}

function pause() {
    clearInterval(timerInterval);
    showButton('PLAY');
}

function reset() {
    clearInterval(timerInterval);
    print('00:00:00.00');
    elapsedTime = 0;
    laps = [];
    document.getElementById('laps').innerHTML = '';
    showButton('PLAY');
}

function lap() {
    const lapTime = timeToString(elapsedTime);
    const currentTime = new Date().toLocaleTimeString();
    laps.push({ lapTime, currentTime });
    let lapElement = document.createElement('li');
    lapElement.innerHTML = `<span>${lapTime}</span><span>${currentTime}</span>`;
    document.getElementById('laps').appendChild(lapElement);
}

function showButton(buttonKey) {
    const buttonToShow = buttonKey === 'PLAY' ? startButton : pauseButton;
    const buttonToHide = buttonKey === 'PLAY' ? pauseButton : startButton;
    buttonToShow.style.display = 'inline-block';
    buttonToHide.style.display = 'none';
}

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

showButton('PLAY');
