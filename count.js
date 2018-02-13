const countMinutes = 5;
const minToSec = 60;
let countSeconds = countMinutes * minToSec;
const minutesElement = document.getElementById('minutes'); 
const secondsElement = document.getElementById('seconds');

function pad(number) {
  return number < 10 ? `0${number}` : number;
}

function getMinutes(seconds) {
  return pad(parseInt(seconds/minToSec,10));
}

function getSeconds(seconds) {
  return pad(seconds%minToSec);
}

function countDown(countInSeconds) {
  const timer = setInterval(function() {
    minutesElement.innerHTML = getMinutes(countInSeconds);
    secondsElement.innerHTML = getSeconds(countInSeconds);
    countInSeconds --;
    if(countInSeconds < 0) {
      clearInterval(timer);
      playSound('airHorn');
    }
  }, 1000);
}

function playSound(soundObj) {
  document.getElementById(soundObj).play();
}

//initialize counter and start count
minutesElement.innerHTML = getMinutes(countSeconds);
secondsElement.innerHTML = getSeconds(countSeconds);
countDown(countSeconds);