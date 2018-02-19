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
const PRE_GAME = 'PRE_GAME';
const IN_GAME = 'IN_GAME';

function getScores() {
  return JSON.parse(localStorage.getItem('scores'));
}

function getGameState() {
  return JSON.parse(localStorage.getItem(gameStateKey));
}

window.addEventListener('storage', function(e) {
  console.log(e.key);
  switch (e.key) {
    case minutesKey:
      updateMinutesElement(getMinutesFromLS());
    case secondsKey:
      updateSecondsElement(getSecondsFromLS());
    case countDownHeadingKey:
      updateCountDownHeadingElement(getCountDownHeadingFromLS());
    case gameStateKey:
      initializePage();
    case scoresKey:
      if (getScores()) {
        generateScoreBoardFromLS(getScores());
      }
  }
});

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
function generateScoreBoardFromLS(scoresArray) {
  const tableWrapperElement = document.getElementById('scoreTableWrapper');
  const oldTable = document.getElementById('table');
  if(!!oldTable) { oldTable.parentNode.removeChild(oldTable); }

  const tbl = document.createElement('table');
  tbl.setAttribute('id', 'table');
  const tblBody = document.createElement('tbody');
  tblBody.setAttribute('id', 'tableBody');
 
  scoresArray.forEach(team => {
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
  updateCountDownHeadingElement(getCountDownHeadingFromLS())
}

function hidePreGameDisplay() {
  document.getElementById('preGameDisplay').style.display = 'none';
}

function showPreGameDisplay() {
  document.getElementById('preGameDisplay').style.display = 'block';
}
function showInGameDisplay() {
  document.getElementById('inGameDisplay').style.display = 'block';
}

function hideInGameDisplay() {
  document.getElementById('inGameDisplay').style.display = 'none';
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