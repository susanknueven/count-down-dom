const minutesElement = document.getElementById('minutes'); 
const secondsElement = document.getElementById('seconds');
const countDownHeadingElement = document.getElementById('countDownHeading');
const READY_TO_COUNT = 'READY_TO_COUNT';
const COUNTING = 'COUNTING';
const COUNT_FINISHED = 'COUNT_FINISHED';
const minutesKey = 'minutes';
const secondsKey = 'seconds';
const countDownHeadingKey = 'countDownHeading';
const gameStateKey = 'gameState';
const scoresKey = 'scores';
const triviaKey = 'trivia';
const triviaIndexKey = 'triviaIndex';
const triviaStateKey = 'triviaState';
const PRE_GAME = 'PRE_GAME';
const IN_GAME = 'IN_GAME';
const SHOW_TRIVIA = 'SHOW_TRIVIA';
const SHOW_ANSWER = 'SHOW_ANSWER';
const SHOW_RESULTS = 'SHOW_RESULTS';

function getScores() {
  return JSON.parse(localStorage.getItem('scores'));
}

function getGameState() {
  return JSON.parse(localStorage.getItem(gameStateKey));
}

function getTriviaState() {
  return JSON.parse(localStorage.getItem(triviaStateKey));
}

function getTriviaIndex() {
  return JSON.parse(localStorage.getItem(triviaIndexKey));
}

function getTriviaByIndex(index) {
  return JSON.parse(localStorage.getItem(triviaKey))[index];
}

window.addEventListener('storage', function(e) {
  console.log(e.key);
  switch (e.key) {
    case minutesKey:
      updateMinutesElement(getMinutesFromLS());
      break;
    case secondsKey:
      updateSecondsElement(getSecondsFromLS());
      break;
    case countDownHeadingKey:
      updateCountDownHeadingElement(getCountDownHeadingFromLS());
      break;
    case gameStateKey:
      initializePage();
      break;
    case scoresKey:
      if (getScores()) {
        generateScoreBoardFromLS(getScores());
      }
      break;
    case triviaStateKey:
      handleTriviaStateChange(JSON.parse(e.newValue));
  }
});

function handleTriviaStateChange(triviaState) {
  switch (triviaState) {
    case SHOW_TRIVIA:
      loadTriviaAndDisplay();
      break;
    case SHOW_ANSWER:
      loadAnswerAndDisplay();
  }
}

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

function sortTeamScores(scoresArray) {
  return scoresArray.sort(function(a, b) {
    return sumScores(b.scores)-sumScores(a.scores);
  });
}

function generateScoreBoardFromLS(scoresArray) {
  const tableWrapperElement = document.getElementById('scoreTableWrapper');
  const oldTable = document.getElementById('table');
  if(!!oldTable) { oldTable.parentNode.removeChild(oldTable); }

  const tbl = document.createElement('table');
  tbl.setAttribute('id', 'table');
  const tblBody = document.createElement('tbody');
  tblBody.setAttribute('id', 'tableBody');
  
  const sortedScoresArray = sortTeamScores(scoresArray);
  sortedScoresArray.forEach(team => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const nameCellText = document.createTextNode(team.teamName);
    nameCell.appendChild(nameCellText);
    row.appendChild(nameCell);
    
    const scoreCell = document.createElement('td');
    const scoreCellText = document.createTextNode(sumScores(team.scores));
    scoreCell.appendChild(scoreCellText);
    row.appendChild(scoreCell);
    tblBody.appendChild(row);
  }); 
  
  tbl.appendChild(tblBody);
  tableWrapperElement.appendChild(tbl);
}

function sumScores(scoresArray) {
  return scoresArray.reduce((prev, current) => prev + current);
}

function loadInGame() {
  generateScoreBoardFromLS(getScores());
  updateMinutesElement(getMinutesFromLS());
  updateSecondsElement(getSecondsFromLS());
  updateCountDownHeadingElement(getCountDownHeadingFromLS());
  handleTriviaStateChange(getTriviaState());
}

function hidePreGameDisplay() {
  document.getElementById('preGameDisplay').style.display = 'none';
}

function showPreGameDisplay() {
  document.getElementById('preGameDisplay').style.display = '';
}
function showInGameDisplay() {
  document.getElementById('inGameDisplay').style.display = '';
}

function hideInGameDisplay() {
  document.getElementById('inGameDisplay').style.display = 'none';
}

function showTrivia() {
  document.getElementById('trivia').style.display = '';
}

function hideTrivia() {
  document.getElementById('trivia').style.display = 'none';
}

function showAnswer() {
  document.getElementById('answer').style.display = '';
}

function hideAnswer() {
  document.getElementById('answer').style.display = 'none';
}

function loadTriviaAndDisplay() {
  const trivia = getTriviaByIndex(getTriviaIndex());
  document.getElementById('trivia').innerHTML = trivia.q;
  hideAnswer();
  showTrivia();
}

function loadAnswerAndDisplay() {
  const trivia = getTriviaByIndex(getTriviaIndex());
  document.getElementById('answer').innerHTML = trivia.a;
  document.getElementById('trivia').innerHTML = trivia.q;
  showTrivia();
  showAnswer();
}

function loadPreGame() {
  showPreGameDisplay();
}

function initializePage() {
  if (getGameState() === IN_GAME) {
    loadInGame();
    hidePreGameDisplay();
    showInGameDisplay();
  } else {
    loadPreGame();
    hideInGameDisplay();
  }
}

initializePage();