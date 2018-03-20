const minutesElement = getById('minutes'); 
const secondsElement = getById('seconds');
const countDownHeadingElement = getById('countDownHeading');

const minutesKey = 'minutes';
const secondsKey = 'seconds';
const countDownHeadingKey = 'countDownHeading';

function getCountDownHeadingFromLS() {
  return JSON.parse(localStorage.getItem(countDownHeadingKey));
}

function updateCountDownHeadingElement(text) {
  countDownHeadingElement.innerHTML = text;
}

function getMinutesFromLS() {
  return JSON.parse(localStorage.getItem(minutesKey));
}

function updateMinutesElement(min) {
  minutesElement.innerHTML = min;
}

function getSecondsFromLS() {
  return JSON.parse(localStorage.getItem(secondsKey));
}

function updateSecondsElement(sec) {
  secondsElement.innerHTML = sec;
}