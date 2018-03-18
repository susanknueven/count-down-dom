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
const READY_TO_COUNT = 'READY_TO_COUNT';
const COUNTING = 'COUNTING';
const COUNT_FINISHED = 'COUNT_FINISHED';

function getScores() {
  return JSON.parse(localStorage.getItem('scores'));
}

function getGameState() {
  return JSON.parse(localStorage.getItem(gameStateKey));
}

function getTriviaState() {
  return JSON.parse(localStorage.getItem(triviaStateKey));
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
      initializeDisplayPageByGameState();
      break;
    case scoresKey:
      if (getScores()) {
        generateScoreBoardFromLS(getScores());
        generateLeaderBoardFromLS(getScores());
      }
      break;
    case triviaStateKey:
      handleTriviaStateChange(JSON.parse(e.newValue));
  }
});

function loadInGame() {
  generateScoreBoardFromLS(getScores());
  generateLeaderBoardFromLS(getScores());
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

function loadPreGame() {
  showPreGameDisplay();
}

function initializeDisplayPageByGameState() {
  if (getGameState() === IN_GAME) {
    loadInGame();
    hidePreGameDisplay();
    showInGameDisplay();
  } else {
    loadPreGame();
    hideInGameDisplay();
  }
}

initializeDisplayPageByGameState();