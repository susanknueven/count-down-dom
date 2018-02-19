const PRE_GAME = 'PRE_GAME';
const IN_GAME = 'IN_GAME';
const gameStateKey = 'gameState';

function startGame() {
  initializeInGame();
}

function setGameState(gameState) {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState));
}

function getGameState() {
  return JSON.parse(localStorage.getItem(gameStateKey));
}

function getNumOfQsFromInput(){
  return document.getElementById('numOfQsInput').value;
}

function setQuestionIndex(index) {
  localStorage.setItem('questionIndex', JSON.stringify(index));
}

function getQuestionIndex() {
  return parseInt(JSON.parse(localStorage.getItem('questionIndex')));
}

function getScores() {
  return JSON.parse(localStorage.getItem('scores'));
}

function hidePreGameTools() {
  document.getElementById('preGameTools').style.display = 'none';
}

function hideInGameTools() {
  document.getElementById('inGameTools').style.display = 'none';
}

function showInGameTools() {
  document.getElementById('inGameTools').style.display = 'block';
}

function generateTeamInputElement() {
  const teamNamesWrapper = document.getElementById('teamNames');
  const teamNamesHeadingElement = document.createElement('div');
  teamNamesHeadingElement.innerHTML = 'Enter team names, separated by commas:';
  const teamNamesInputElement = document.createElement('textarea');
  teamNamesInputElement.id = 'teamNamesInput';
  teamNamesInputElement.maxLength = '500';
  teamNamesInputElement.cols = '40';
  teamNamesInputElement.rows = '10';

  teamNamesWrapper.appendChild(teamNamesHeadingElement);
  teamNamesWrapper.appendChild(teamNamesInputElement);
}

function generateQuestionInputElement() {
  const numOfQsWrapper = document.getElementById('numOfQs');
  const numOfQsHeadingElement = document.createElement('div');
  numOfQsHeadingElement.innerHTML = 'Enter # of Questions for the Game';
  const numOfQsInputElement = document.createElement('textarea');
  numOfQsInputElement.id = 'numOfQsInput';
  numOfQsInputElement.maxLength = '50';
  numOfQsInputElement.cols = '10';
  numOfQsInputElement.rows = '1';

  numOfQsWrapper.appendChild(numOfQsHeadingElement);
  numOfQsWrapper.appendChild(numOfQsInputElement);
}

function generatePreGameTools() {
  generateTeamInputElement();
  generateQuestionInputElement();
}

function initializePreGame() {
    generatePreGameTools();
    setGameState(PRE_GAME);
    hideInGameTools();
}

function getTeamNamesInputString() {
  return document.getElementById('teamNamesInput').value;
}

function initializeTeams() {
  const teamNamesInString = getTeamNamesInputString();
  const teamArray = teamNamesInString.split(',');
  return teamArray.map(teamName => teamName.trim());
}

function getTrivia() {
  const trivia = [
    {"q":"What is my favorite thing to eat?", "a":"chocolate"},
    {"q":"Which leg do I put in my pants first?", "a":"right"},
    {"q":"What is my favorite animal?", "a":"dog, of course!"}
    ];
  localStorage.setItem('trivia', JSON.stringify(trivia));
}

function setTriviaIndex(index) {
  localStorage.setItem('triviaIndex', JSON.stringify(index));
}

function getTriviaIndex() {
  return parseInt(JSON.parse(localStorage.getItem('triviaIndex')));
}

function initializeInGame() {
  let questionIndex;
  let numOfQuestions;
  if (getGameState() != IN_GAME) {
    setQuestionIndex(0);
    const teamArray = initializeTeams();
    numOfQuestions = parseInt(getNumOfQsFromInput());
    initializeScoresInLS(teamArray, numOfQuestions);
    setTriviaIndex(0);
    getTrivia();
    setGameState(IN_GAME);
  }

  questionIndex = getQuestionIndex();
  generateScoringSheetForQuestion(questionIndex);
  numOfQuestions = getScores()[0].scores.length; 
  initializeDropdown(numOfQuestions);
  hidePreGameTools();
  showInGameTools();
}

function updateScoresInLS(element) {
  let newScores;
  const teamName = element.id;
  const questionIndex = getQuestionIndex();

  const prevScores = getScores();
  teamIndex = prevScores.findIndex((team) => team.teamName === teamName);
  
  prevTeamScores = prevScores[teamIndex].scores;
  prevTeamScores[questionIndex] = element.checked ? 1 : 0;

  prevScores[teamIndex] = { ...prevScores[teamIndex], scores: prevTeamScores }

  localStorage.setItem('scores', JSON.stringify(prevScores));
}

function isScorePositive(scoresArray, index) {
  return (scoresArray[index] > 0);
}

function generateScoringSheetForQuestion(index) {
  const body = document.getElementsByTagName('body')[0];
  const oldTable = document.getElementsByTagName('table')[0];
  if(!!oldTable) { oldTable.parentNode.removeChild(oldTable); }

  const table = document.createElement('table');
  table.id = 'scoreTable';
  const tableBody = document.createElement('tbody');

  const scoresArray = getScores();

  scoresArray.forEach(team => {
    const row = document.createElement('tr');
    const scoreCell = document.createElement('td');
    const scoreCellText = document.createTextNode(team.teamName);
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.value = 'correct';
    checkBox.id = team.teamName;
    checkBox.checked = isScorePositive(team.scores, index);
    checkBox.onclick = () => updateScoresInLS(checkBox);
    scoreCell.appendChild(scoreCellText);
    scoreCell.appendChild(checkBox);
    row.appendChild(scoreCell);
    tableBody.appendChild(row);
  }); 
  table.appendChild(tableBody);
  
  const tableWrapperElement = document.getElementById('scoreTableWrapper');
  tableWrapperElement.appendChild(table);
}

function initializeTeamScoresForQuestion(index) {
  const scoresArray = getScores();
  scoresArray.forEach(team => {
    if(!team.scores[index]) {
      team.scores[index] = 0;
    }
  });
}

function createEventListenerForDropdown() {
  const dropdownElement = document.getElementById('dropdown');
  dropdownElement.addEventListener('change', function(e) {
    const questionIndex = dropdownElement.value;
    setQuestionIndex(questionIndex);
    initializeTeamScoresForQuestion(questionIndex);
    generateScoringSheetForQuestion(questionIndex);
  });
}
function initializeDropdown(numOfQuestions) {
  const dropdownWrapper = document.getElementById('dropdownWrapper');
  
  const selectElement = document.createElement('select');
  selectElement.id = 'dropdown';
  dropdownWrapper.appendChild(selectElement);

  createEventListenerForDropdown();
  
  createOptionsForSelect(selectElement, numOfQuestions, 0);
  if (getGameState() === IN_GAME) {
    const questionIndex = getQuestionIndex();
    const dropdownElement = document.getElementById('dropdown');
    dropdownElement.selectedIndex = questionIndex;
  }
}

function buildEmptyScoresArray(array, length, current) {
  if (current === length) {
    return array;
  }
  array.push(0);
  return buildEmptyScoresArray(array, length, current +1);
}

function initializeScoresInLS(teamArray, numOfQuestions) {
  let teamScores = [];
  teamScores = buildEmptyScoresArray(teamScores, numOfQuestions, 0);
  let scores = [];
  teamArray.forEach(teamName => {
    scores.push({ teamName, scores: teamScores });
  })
  localStorage.setItem('scores', JSON.stringify(scores));
}

function createOptionsForSelect(selectElement, max, current) {
  if (max === current) {
    return;
  }
  const option = document.createElement('option');
  // value is zero-based- corresponds to index in array
  option.value = current;
  // text (displayed) is one-based- corresponds to question number
  option.text = current + 1;
  selectElement.appendChild(option);
  return createOptionsForSelect(selectElement, max, current + 1);
}

function initializePage() {
  if (getGameState() != IN_GAME) {
    initializePreGame();
  } else {
    initializeInGame();
  }
}

initializePage();

// CODE FOR COUNTDOWN TIMER:

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
const COUNTING_DOWN_TEXT = 'Counting Down...';
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

function reset() {
  if (getCountStatus() === COUNTING) {
    stopTimer();
    setInputReadOnlyAttribute(false);
  } 
  getDefaultCount();
  setCountStatus(READY_TO_COUNT);
}

reset();

// Trivia Question and Answer Controls

const triviaStateKey = 'triviaState';
const SHOW_TRIVIA = 'SHOW_TRIVIA';
const SHOW_ANSWER = 'SHOW_ANSWER';
const SHOW_RESULTS = 'SHOW_RESULTS';

function getTriviaState() {
  return JSON.parse(localStorage.getItem(triviaStateKey));
}

function setTriviaState(triviaState) {
  localStorage.setItem(triviaStateKey, JSON.stringify(triviaState));
}

function showNextTrivia() {
  setTriviaIndex(getTriviaIndex()+1);
  setTriviaState(SHOW_TRIVIA);
}

function showAnswer() {
  setTriviaState(SHOW_ANSWER);
}