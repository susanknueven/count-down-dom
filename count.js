const minToSec = 60;
const minutesElement = document.getElementById('minutes'); 
const secondsElement = document.getElementById('seconds');
const headingElement = document.getElementById('heading');
const airHornElement = document.getElementById('airHorn');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const READY_TO_COUNT = 'READY_TO_COUNT';
const COUNTING = 'COUNTING';
let countStatus;
let timer;

function setInputReadOnlyAttribute(readOnly) {
  minutesElement.readOnly = readOnly;
  secondsElement.readOnly = readOnly;
}

function setDefaultCount() {
  minutesElement.value = pad(0);
  secondsElement.value = pad(3);
  headingElement.innerHTML = 'Counting Down...';
  startButton.disabled = false;
}

function retrieveUserCount() {
  const userCountMinutes = parseInt(minutesElement.value);
  const userCountSeconds = parseInt(secondsElement.value);
  const countSeconds = userCountSeconds + userCountMinutes * minToSec;
  return countSeconds;
}

function pad(number) {
  return number < 10 ? `0${number}` : number;
}

function getMinutes(seconds) {
  return pad(parseInt(seconds / minToSec, 10));
}

function getSeconds(seconds) {
  return pad(seconds % minToSec);
}

function playSound(soundElement) {
  soundElement.play();
}

function stopTimer() {
  clearInterval(timer);
  return retrieveUserCount();
}

function countDown(countInSeconds) {
  timer = setInterval(function() {
    countInSeconds --;
    minutesElement.value = getMinutes(countInSeconds);
    secondsElement.value = getSeconds(countInSeconds);
    if (countInSeconds === 0) {
      stopTimer();
      playSound(airHornElement);
      headingElement.innerHTML = "TIME'S UP!"
    }
  }, 1000);
}

function startCountDown() {
  const count = retrieveUserCount();
  countDown(count);
  startButton.disabled = true;
  setInputReadOnlyAttribute(true);
  countStatus = COUNTING;
}

function stopCountDown() {
  if (countStatus === COUNTING) {
    const currentCount = stopTimer();
    setInputReadOnlyAttribute(false);
    if (currentCount > 0) {
      startButton.disabled = false;
      countStatus = READY_TO_COUNT;
    }
  }
}

function reset() {
  if (countStatus === COUNTING) {
    stopTimer();
    setInputReadOnlyAttribute(false);
  } 
  setDefaultCount();
  countStatus = READY_TO_COUNT;
}

reset();