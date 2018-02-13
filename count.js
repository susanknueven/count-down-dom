const countMinutes = .05;
const minToSec = 60;
let countSeconds = countMinutes * minToSec;
const minutesElement = document.getElementById('minutes'); 
const secondsElement = document.getElementById('seconds');
const headingElement = document.getElementById('heading');
const airHornElement = document.getElementById('airHorn');

function reset() {
  minutesElement.innerHTML = getMinutes(countSeconds);
  secondsElement.innerHTML = getSeconds(countSeconds);
  headingElement.innerHTML = "Counting Down...";
}

function pad(number) {
  return number < 10 ? `0${number}` : number;
}

function getMinutes(seconds) {
  return pad(parseInt(seconds/minToSec,10));
}

function getSeconds(seconds) {
  return pad(seconds%minToSec);
}

function playSound(soundElement) {
  soundElement.play();
}

function countDown(countInSeconds) {
  const timer = setInterval(function() {
    countInSeconds --;
    minutesElement.innerHTML = getMinutes(countInSeconds);
    secondsElement.innerHTML = getSeconds(countInSeconds);
    if (countInSeconds == 0) {
      clearInterval(timer);
      playSound(airHornElement);
      headingElement.innerHTML = "TIME'S UP!"
    }
  }, 1000);
}

function startCountDown() {
  countDown(countSeconds);
}

reset();