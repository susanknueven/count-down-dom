
const PRE_GAME = 'PRE_GAME';
const IN_GAME = 'IN_GAME';
const GAME_OVER = 'GAME_OVER';
const gameStateKey = 'gameState';

function setGameState(gameState) {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState));
}

function getGameState() {
  return JSON.parse(localStorage.getItem(gameStateKey));
}

function getNumOfQsFromInput(){
  return document.getElementById('numOfQsInput').value;
}

function setNumOfQsInLS(numOfQs) {
  localStorage.setItem('numOfQs', JSON.stringify(numOfQs));
}

function getNumOfQsFromLS() {
  return parseInt(JSON.parse(localStorage.getItem('numOfQs')));
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

function initializeDropdown(numOfQuestions) {
  const dropdownWrapper = document.getElementById('dropdownWrapper');
  
  const selectElement = document.createElement('select');
  selectElement.id = 'dropdown';
  dropdownWrapper.appendChild(selectElement);

  createEventListenerForDropdown();
  
  createOptionsForSelect(selectElement, numOfQuestions, 0);
  if (getGameState() === IN_GAME) {
    const questionIndex = getQuestionIndex();
    updateDropdownQuestionIndex(questionIndex);
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

function createEventListenerForDropdown() {
  const dropdownElement = document.getElementById('dropdown');
  dropdownElement.addEventListener('change', function(e) {
    const questionIndex = dropdownElement.value;
    setQuestionIndex(questionIndex);
    initializeTeamScoresForQuestion(questionIndex);
    generateScoringSheetForQuestion(questionIndex);
  });
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
