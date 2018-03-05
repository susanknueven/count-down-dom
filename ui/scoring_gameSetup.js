
const PRE_GAME = 'PRE_GAME';
const IN_GAME = 'IN_GAME';
const GAME_OVER = 'GAME_OVER';
const gameStateKey = 'gameState';
const GOT_IT = 'Y';
const NOPE = 'N';
const CUSTOM = 'C';

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
  document.getElementById('inGameTools').style.display = 'flex';
}

function isScorePositive(scoresArray, index) {
  return (scoresArray[index] > 0);
}

function generateScoringTable(index) {
  const oldTable = document.getElementById('scoreTable');
  if(!!oldTable) { oldTable.parentNode.removeChild(oldTable); }

  const table = document.createElement('table');
  table.id = 'scoreTable';
  const tableBody = document.createElement('tbody');

  const scoresArray = getScores();

  scoresArray.forEach(team => {
    const row = document.createElement('tr');
    const questionCell = document.createElement('td');
    const radioGotItButton = document.createElement('input');
    radioGotItButton.type = 'radio';
    radioGotItButton.name = team.teamName;
    radioGotItButton.value = GOT_IT;
    radioGotItButton.id = `${team.teamName}${GOT_IT}`;
    radioGotItButton.onclick = () => updateScoresInLS(radioGotItButton.name, index, 1);
    const labelGotItRadio = document.createElement('label');
    labelGotItRadio.for = radioGotItButton.id;
    labelGotItRadio.innerHTML = radioGotItButton.value;
    const radioNopeButton= document.createElement('input');
    radioNopeButton.type = 'radio';
    radioNopeButton.name = team.teamName;
    radioNopeButton.value = NOPE;
    radioNopeButton.id = `${team.teamName}${NOPE}`;
    radioNopeButton.onclick = () => updateScoresInLS(radioNopeButton.name, index, 0);
    const labelNopeRadio= document.createElement('label');
    labelNopeRadio.for = radioNopeButton.id;
    labelNopeRadio.innerHTML = radioNopeButton.value;
    // const radioCustomButton= document.createElement('input');
    // radioCustomButton.type = 'radio';
    // radioCustomButton.name = team.teamName;
    // radioCustomButton.value = CUSTOM;
    // radioCustomButton.id = `${team.teamName}${CUSTOM}Button`;
    // radioCustomButton.onclick = () => { document.getElementById(`${team.teamName}${CUSTOM}Input`).disabled = false };
    // const labelCustomRadio= document.createElement('label');
    // labelCustomRadio.for = radioCustomButton.id;
    // labelCustomRadio.innerHTML = radioCustomButton.value;
    // const inputCustomPoints= document.createElement('input');
    // inputCustomPoints.type = 'text';
    // inputCustomPoints.id = `${team.teamName}${CUSTOM}Input`;
    // inputCustomPoints.disabled = true;
    // inputCustomPoints.value = 0;

    questionCell.appendChild(radioGotItButton);
    questionCell.appendChild(labelGotItRadio);
    questionCell.appendChild(radioNopeButton);
    questionCell.appendChild(labelNopeRadio);
    // questionCell.appendChild(radioCustomButton);
    // questionCell.appendChild(labelCustomRadio);
    // questionCell.appendChild(inputCustomPoints);
    row.appendChild(questionCell);
    tableBody.appendChild(row);

    // checkBox.checked = isScorePositive(team.scores, index);
    // checkBox.onclick = () => updateScoresInLS(checkBox);

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
    generateScoringTable(questionIndex);
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
