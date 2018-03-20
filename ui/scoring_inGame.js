function getTrivia(numOfQs) {
  localStorage.setItem('trivia', JSON.stringify(TRIVIA_QUESTIONS.slice(0, numOfQs)));
}

function getTeamAndQuestionFromRadioGroup(radioGroupName) {
  const teamNameAndQuestionIndex = radioGroupName.split('_Q');
  const teamName = teamNameAndQuestionIndex[0];
  const questionIndex = parseInt(teamNameAndQuestionIndex[1]);
  return { teamName, questionIndex };
}

function updateScoresInLS(radioGroupName, teamScore) {
  const { teamName, questionIndex } = getTeamAndQuestionFromRadioGroup(radioGroupName);

  const scores = getScores();
  teamIndex = scores.findIndex((team) => team.teamName === teamName);
  
  scores[teamIndex].scores[questionIndex] = teamScore;

  localStorage.setItem('scores', JSON.stringify(scores));
}

function initializeInGame(gameState, triviaState, triviaIndex) {
  let numOfQuestions;
  if (gameState != IN_GAME) {
    const teamArray = initializeTeams();
    numOfQuestions = parseInt(getNumOfQsFromInput());
    setNumOfQsInLS(numOfQuestions);
    initializeScoresInLS(teamArray, numOfQuestions);
    getTrivia(numOfQuestions);
    setGameState(IN_GAME);
  }

  numOfQuestions = parseInt(getNumOfQsFromLS());
  generateScoringTable();
  highlightQuestionInScoringTable(triviaIndex);
  initializeTriviaButtons(triviaState);
  hidePreGameTools();
  showInGameTools();
}

function initializeTriviaButtons(triviaState) {
  if (triviaState == SHOW_ANSWER) {
    showAnswer();
  }
  if (triviaState == SHOW_TRIVIA) {
    showTrivia();
  }
}

function startGame() {
  setGameState(PRE_GAME);
  setTriviaIndex('');
  setTriviaState('');
  initializeInGame(getGameState(), getTriviaState(), getTriviaIndex());
}
