function getTrivia(numOfQs) {
  const trivia = [
    {"q":"What is my favorite thing to eat?", "a":"chocolate"},
    {"q":"Which leg do I put in my pants first?", "a":"right"},
    {"q":"How old is Zeke?", "a":"I don't know!!"},
    {"q":"When did George Washington discover America?", "a":"1776- same time as everyone else!"},
    {"q":"Knock Knock", "a":"pbbbbbbbt"},
    {"q":"How can you make it snow in summer?", "a":"live at the North Pole"},
    {"q":"What time is bedtime?", "a":"whenever mom says"},
    {"q":"Where do babies come from?", "a":"ask your father"},
    {"q":"What should you do if you are in a car accident?", "a":"wait"},
    {"q":"How many more trivia questions do we need?", "a":"too many"},
    {"q":"How many polar bears can a penguin eat?", "a":"none"},
    {"q":"What is my favorite animal?", "a":"dog, of course!"}
    ];
  localStorage.setItem('trivia', JSON.stringify(trivia.slice(0, numOfQs)));
}

function updateDropdownQuestionIndex(index) {
    const dropdownElement = document.getElementById('dropdown');
    dropdownElement.selectedIndex = index;
}

function updateScoresInLS(teamName, questionIndex, score) {
  let newScores;

  const prevScores = getScores();
  teamIndex = prevScores.findIndex((team) => team.teamName === teamName);
  
  prevTeamScores = Array.from(prevScores[teamIndex].scores);
  prevTeamScores[questionIndex] = score;
  prevScores[teamIndex] = { ...prevScores[teamIndex], scores: prevTeamScores }

  localStorage.setItem('scores', JSON.stringify(prevScores));
}

function initializeInGame() {
  let questionIndex;
  let numOfQuestions;
  if (getGameState() != IN_GAME) {
    setQuestionIndex(0);
    const teamArray = initializeTeams();
    numOfQuestions = parseInt(getNumOfQsFromInput());
    setNumOfQsInLS(numOfQuestions);
    initializeScoresInLS(teamArray, numOfQuestions);
    getTrivia(numOfQuestions);
    setTriviaState("");
    setTriviaIndex("");
    setGameState(IN_GAME);
  }

  questionIndex = getQuestionIndex();
  generateScoringTable(questionIndex);
  numOfQuestions = parseInt(getNumOfQsFromLS());
  initializeDropdown(numOfQuestions);
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
