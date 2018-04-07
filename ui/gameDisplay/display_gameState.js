const gameStateKey = 'gameState';
const scoresKey = 'scores';
const triviaKey = 'trivia';
const triviaIndexKey = 'triviaIndex';
const triviaStateKey = 'triviaState';
const PRE_GAME = 'PRE_GAME';
const IN_GAME = 'IN_GAME';
const SHOW_CATEGORY = 'SHOW_CATEGORY';
const SHOW_TRIVIA = 'SHOW_TRIVIA';
const SHOW_ANSWER = 'SHOW_ANSWER';
const CLEAR_DISPLAY = 'CLEAR_DISPLAY';
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
  getById('preGameDisplay').style.display = 'none';
}

function showPreGameDisplay() {
  getById('preGameDisplay').style.display = '';
}
function showInGameDisplay() {
  getById('inGameDisplay').style.display = '';
}

function hideInGameDisplay() {
  getById('inGameDisplay').style.display = 'none';
}

function loadPreGame() {
  showPreGameDisplay();
}

function initializeDisplayPageByGameState(gameState) {
  if (gameState === IN_GAME) {
    loadInGame();
    hidePreGameDisplay();
    showInGameDisplay();
  } else {
    loadPreGame();
    hideInGameDisplay();
  }
}

initializeDisplayPageByGameState(getGameState());