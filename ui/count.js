const minToSec = 60;
const minutesElement = document.getElementById('minutes'); 
const secondsElement = document.getElementById('seconds');
const headingElement = document.getElementById('heading');
const airHornElement = document.getElementById('airHorn');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const READY_TO_COUNT = 'READY_TO_COUNT';
const COUNTING = 'COUNTING';
const COUNT_FINISHED = 'COUNT_FINISHED';
const COUNTING_DOWN_TEXT = 'Counting Down...';
const TIMES_UP_TEXT = `TIME'S UP!`;
const INVALID_INPUT = 'INVALID_INPUT';
let countStatus;
let timer;
let defaultCount = { min: 0, sec: 3 };
let userDefaultCount = {};

window.addEventListener('storage', function(e) {  
  const scores = JSON.parse(localStorage.getItem('scores'));
  generateScoreBoardFromLS(scores);
});

function generateScoreBoardFromLS(scoresArray) {
  var body = document.getElementsByTagName('body')[0];
  var oldTable = document.getElementById('table');
  if(!!oldTable) { oldTable.parentNode.removeChild(oldTable); }

  var tbl = document.createElement('table');
  tbl.setAttribute('id', 'table');
  var tblBody = document.createElement('tbody');
  tblBody.setAttribute('id', 'tableBody');
 
  scoresArray.forEach(team => {
    var row = document.createElement('tr');
    var nameCell = document.createElement('td');
    var nameCellText = document.createTextNode(team.teamName);
    nameCell.appendChild(nameCellText);
    row.appendChild(nameCell);
    
    var scoreCell = document.createElement('td');
    var scoreCellText = document.createTextNode(sumScores(team.scores));
    scoreCell.appendChild(scoreCellText);
    row.appendChild(scoreCell);
    tblBody.appendChild(row);
  }); 
  
  tbl.appendChild(tblBody);
  body.appendChild(tbl);
}

function sumScores(scoresArray) {
  return scoresArray.reduce((prev, current) => prev + current);
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
  headingElement.innerHTML = text;
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
}

function getMinutes() {
  return parseInt(minutesElement.value);
}

function setSeconds(seconds) {
  secondsElement.value = pad(seconds);
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
  countStatus = COUNTING;
}

function stopCountDown() {
  if (countStatus === COUNTING) {
    const currentCount = stopTimer();
    setInputReadOnlyAttribute(false);
    if (currentCount > 0) {
      setStartButtonDisabled(false);
      countStatus = READY_TO_COUNT;
    }
  }
}

function reset() {
  if (countStatus === COUNTING) {
    stopTimer();
    setInputReadOnlyAttribute(false);
  } 
  getDefaultCount();
  countStatus = READY_TO_COUNT;
}

reset();