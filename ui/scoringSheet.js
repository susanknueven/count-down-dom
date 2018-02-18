const inGameToolsWrapperElement = document.getElementById('inGameTools');
const PRE_GAME = 'PRE_GAME';
const IN_GAME = 'IN_GAME';
const gameStateKey = 'gameState';

function startGame() {
  setGameState(IN_GAME);
  initializeGame();
}

function setGameState(gameState) {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState));
}

function getGameState() {
  return JSON.parse(localStorage.getItem(gameStateKey));
}

function initializePage() {
  setGameState(PRE_GAME);
  inGameToolsWrapperElement.style.display = 'none';
}

function hidePreGameTools() {
  document.getElementById('preGameTools').style.display = 'none';
}

function showInGameTools() {
  document.getElementById('inGameTools').style.display = 'block';
}

const questionIndex = 0;
const numOfQuestions = 6;
function initializeGame() {
  setQuestionIndex(questionIndex);
  const teamArray = initializeTeams();
  initializeDropdown(numOfQuestions);
  initializeScoresInLS(teamArray, numOfQuestions);
  generateScoringSheetForQuestion(0);
  hidePreGameTools();
  showInGameTools();
}

function getQuestionIndex() {
  return parseInt(JSON.parse(localStorage.getItem('questionIndex')));
}

function getScores() {
  return JSON.parse(localStorage.getItem('scores'));
}

function writeToLS(element) {
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
    checkBox.onclick = () => writeToLS(checkBox);
    scoreCell.appendChild(scoreCellText);
    scoreCell.appendChild(checkBox);
    row.appendChild(scoreCell);
    tableBody.appendChild(row);
  }); 
  table.appendChild(tableBody);
  
  const tableWrapperElement = document.getElementById('scoreTableWrapper');
  tableWrapperElement.appendChild(table);
}

function setQuestionIndex(index) {
  localStorage.setItem('questionIndex', JSON.stringify(index));
}

function initializeTeamScoresForQuestion(index) {
  const scoresArray = getScores();
  scoresArray.forEach(team => {
    if(!team.scores[index]) {
      team.scores[index] = 0;
    }
  });
}

function initializeTeams() {
  return [ 'team1', 'team2', 'team3', 'team4'];
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

initializePage();