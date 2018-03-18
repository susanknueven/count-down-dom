function getTrivia(numOfQs) {
  const trivia = [
    {"category":"Fun", "q":"How fast does a lasertag gun shoot?", "a":"at the speed of light!"},
    {"category":"Dressing", "q":"Which leg do I put in my pants first?", "a":"right"},
    {"category":"Pets", "q":"How old is Zeke?", "a":"I don't know!!"},
    {"category":"History", "q":"When did George Washington discover America?", "a":"1776- same time as everyone else!"},
    {"category":"Jokes", "q":"Knock Knock", "a":"pbbbbbbbt"},
    {"category":"Climate", "q":"How can you make it snow in summer?", "a":"live at the North Pole"},
    {"category":"Family Life", "q":"What time is bedtime?", "a":"whenever mom says"},
    {"category":"Awkward Questions", "q":"Where do babies come from?", "a":"ask your father"},
    {"category":"Life Skills", "q":"What should you do if you are in a car accident?", "a":"wait"},
    {"category":"Something", "q":"How many more trivia questions do we need?", "a":"too many"},
    {"category":"Nature", "q":"How many polar bears can a penguin eat?", "a":"none"},
    {"category":"Susan", "q":"What is my favorite animal?", "a":"dog, of course!"}
    ];
  localStorage.setItem('trivia', JSON.stringify(trivia.slice(0, numOfQs)));
}

// function updateDropdownQuestionIndex(index) {
//     const dropdownElement = document.getElementById('dropdown');
//     dropdownElement.selectedIndex = index;
// }

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

function initializeInGame() {
  let numOfQuestions;
  if (getGameState() != IN_GAME) {
    const teamArray = initializeTeams();
    numOfQuestions = parseInt(getNumOfQsFromInput());
    setNumOfQsInLS(numOfQuestions);
    initializeScoresInLS(teamArray, numOfQuestions);
    getTrivia(numOfQuestions);
    setTriviaState("");
    setTriviaIndex("");
    setGameState(IN_GAME);
  }

  numOfQuestions = parseInt(getNumOfQsFromLS());
  generateScoringTable();
  highlightQuestionInScoringTable(0);
  initializeTriviaButtons();
  hidePreGameTools();
  showInGameTools();
}

function initializeTriviaButtons() {
  if (getTriviaState() == SHOW_ANSWER) {
    showAnswer();
  }
  if (getTriviaState() == SHOW_TRIVIA) {
    showTrivia();
  }
}

function startGame() {
  initializeInGame();
}
