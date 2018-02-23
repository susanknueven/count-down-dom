const minToSec = 60;
const minutesElement = document.getElementById('minutes'); 
const secondsElement = document.getElementById('seconds');
const countDownHeadingElement = document.getElementById('countDownHeading');
const airHornElement = document.getElementById('airHorn');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const READY_TO_COUNT = 'READY_TO_COUNT';
const COUNTING = 'COUNTING';
const COUNT_FINISHED = 'COUNT_FINISHED';
const COUNTING_DOWN_TEXT = 'Time:';
const TIMES_UP_TEXT = `TIME'S UP!`;
const INVALID_INPUT = 'INVALID_INPUT';
const countStatusKey = 'countStatus';
const minutesKey = 'minutes';
const secondsKey = 'seconds';
const countDownHeadingKey = 'countDownHeading';
let timer;
let defaultCount = { min: 0, sec: 3 };
let userDefaultCount = {};

function getCountStatus() {
  return JSON.parse(localStorage.getItem(countStatusKey));
}

function setCountStatus(countStatus) {
  localStorage.setItem(countStatusKey, JSON.stringify(countStatus));
}

function userHasDefault() {
  return (!isNaN(userDefaultCount.min) && !isNaN(userDefaultCount.sec));
}

function validateInputAndSetHeadingText() {
  const count = retrieveUserCount();
  if (count === INVALID_INPUT) {
    setDefaultCount();
  }
  setHeadingElementText(COUNTING_DOWN_TEXT);
  setStartButtonDisabled(false);
}

function setStartButtonDisabled(isDisabled) {
  startButton.disabled = isDisabled;
}

function setInputReadOnlyAttribute(readOnly) {
  minutesElement.readOnly = readOnly;
  secondsElement.readOnly = readOnly;
}

function setHeadingElementText(text) {
  countDownHeadingElement.innerHTML = text;
  localStorage.setItem(countDownHeadingKey, JSON.stringify(text));
}

function getDefaultCount() {
  if(userHasDefault()) {
    setMinutes(userDefaultCount.min);
    setSeconds(userDefaultCount.sec);
  } else {
    setMinutes(defaultCount.min);
    setSeconds(defaultCount.sec);
  }
  setHeadingElementText(COUNTING_DOWN_TEXT);
  setStartButtonDisabled(false);
}

function setDefaultCount() {
  userDefaultCount = { min: getMinutes(), sec: getSeconds() };
}

function isPositiveNumber(num) {
  return (!isNaN(num) && num > 0);
}

function retrieveUserCount() {
  const userCountMinutes = getMinutes();
  const userCountSeconds = getSeconds();
  const countInSeconds = userCountSeconds + userCountMinutes * minToSec;
  if (isPositiveNumber(countInSeconds)) {
    setMinutes(userCountMinutes);
    setSeconds(userCountSeconds);
    return countInSeconds;
  }
  return INVALID_INPUT;
}

function pad(number) {
  return number < 10 ? `0${number}` : number;
}

function setMinutes(minutes) {
  minutesElement.value = pad(minutes);
  localStorage.setItem(minutesKey, JSON.stringify(pad(minutes)));
}

function getMinutes() {
  return parseInt(minutesElement.value);
}

function setSeconds(seconds) {
  secondsElement.value = pad(seconds);
  localStorage.setItem(secondsKey, JSON.stringify(pad(seconds)));
}

function getSeconds() {
  return parseInt(secondsElement.value);
}

function calculateMinutes(seconds) {
  return parseInt(seconds / minToSec, 10);
}

function calculateSeconds(seconds) {
  return seconds % minToSec;
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
    setMinutes(calculateMinutes(countInSeconds));
    setSeconds(calculateSeconds(countInSeconds));
    if (countInSeconds <= 0) {
      stopTimer();
      playSound(airHornElement);
      setHeadingElementText(TIMES_UP_TEXT);
      setInputReadOnlyAttribute(false);
    }
  }, 1000);
}

function startCountDown() {
  const count = retrieveUserCount();
  setDefaultCount(); 
  countDown(count);
  setStartButtonDisabled(true);
  setInputReadOnlyAttribute(true);
  setCountStatus(COUNTING);
}

function stopCountDown() {
  if (getCountStatus() === COUNTING) {
    const currentCount = stopTimer();
    setInputReadOnlyAttribute(false);
    if (currentCount > 0) {
      setStartButtonDisabled(false);
      setCountStatus(READY_TO_COUNT);
    }
  }
}

function resetCountDown() {
  if (getCountStatus() === COUNTING) {
    stopTimer();
    setInputReadOnlyAttribute(false);
  } 
  getDefaultCount();
  setCountStatus(READY_TO_COUNT);
}

resetCountDown();
