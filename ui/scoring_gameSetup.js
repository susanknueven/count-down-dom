
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

function getQuestionIndexFromQuestionNumber(questionNumber) {
  return questionNumber - 1;
}

function getQuestionNumberFromQuestionIndex(questionIndex) {
  return questionIndex + 1;
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

function isScoreZero(scoresArray, index) {
  const questionIndex = getQuestionIndex();
  return questionIndex > index && scoresArray[index] ===0;
}

function appendNewColGroupElement(columnGroupElement, qIndex) {
  const qColumn = document.createElement('col');
  qColumn.id = `Q${qIndex}`;
  qColumn.className = 'plainColumn';
  columnGroupElement.appendChild(qColumn);
}

function appendNewQuestionHeader(tableHeader, qIndex) {
  const questionNumHeader = document.createElement('th');
  questionNumHeader.innerHTML = getQuestionNumberFromQuestionIndex(qIndex);
  tableHeader.appendChild(questionNumHeader);
}

function appendRadioButtonAndLabel(buttonValue, score, questionCell, qIndex, team, radioGroupName) {
  const radioButton = document.createElement('input');
  radioButton.type = 'radio';
  radioButton.name = radioGroupName;
  radioButton.value = buttonValue;
  radioButton.id = `${team.teamName}${buttonValue}_Q${qIndex}`;
  radioButton.onclick = () => updateScoresInLS(radioGroupName, score);
  radioButton.checked = score ? isScorePositive(team.scores, qIndex) : isScoreZero(team.scores, qIndex);
  const labelRadio = document.createElement('label');
  labelRadio.for = radioButton.id;
  labelRadio.innerHTML = radioButton.value;
  questionCell.appendChild(radioButton);
  questionCell.appendChild(labelRadio);
}

function removeOldTableAndCreateNew(oldTable) {
  if(!!oldTable) { oldTable.parentNode.removeChild(oldTable); }
  const table = document.createElement('table');
  table.id = 'scoreTable';
  return table;
}

function appendColumnGroupToTable(table) {
  const columnGroupElement = document.createElement('colgroup');
  const columnNames = document.createElement('col');
  columnNames.id = 'teamNamesColumn';
  columnGroupElement.appendChild(columnNames);
  table.appendChild(columnGroupElement);
  return columnGroupElement;
}

function appendTableHeaderToTableBody(tableBody) {
  const tableHeader = document.createElement('tr');
  const teamNameHeader = document.createElement('th');
  teamNameHeader.innerHTML = 'Team Name';
  tableHeader.appendChild(teamNameHeader);
  tableBody.appendChild(tableHeader);
  return tableHeader;
}

function createRowForTeam(teamName) {
  const row = document.createElement('tr');
  const teamNameCell = document.createElement('td');
  teamNameCell.innerHTML = teamName;
  row.appendChild(teamNameCell);
  return row;
}

function generateScoringTable() {
  const scoresArray = getScores();
  const questionArray = scoresArray[0].scores;
  
  const table = removeOldTableAndCreateNew(document.getElementById('scoreTable'));
  const columnGroupElement = appendColumnGroupToTable(table);
  const tableBody = document.createElement('tbody');
  const tableHeader = appendTableHeaderToTableBody(tableBody);

  scoresArray.map((team, tIndex) => {
    const row = createRowForTeam(team.teamName);
    team.scores.map((score, qIndex) => {
      if (tIndex === 0) {
        appendNewColGroupElement(columnGroupElement, qIndex);
        appendNewQuestionHeader(tableHeader, qIndex);
      }
      const radioGroupName = `${team.teamName}_Q${qIndex}`;
      const questionCell = document.createElement('td');
      appendRadioButtonAndLabel(GOT_IT, 1, questionCell, qIndex, team, radioGroupName);
      appendRadioButtonAndLabel(NOPE, 0, questionCell, qIndex, team, radioGroupName);
      row.appendChild(questionCell);
    });  
    tableBody.appendChild(row);
  }); 
  
  table.appendChild(tableBody);
  const tableWrapperElement = document.getElementById('scoreTableWrapper');
  tableWrapperElement.appendChild(table);
}

function unhighlightAllColumns() {
  const numOfQs = getNumOfQsFromLS();
  for (qIndex=0; qIndex<numOfQs; qIndex++) {
    const column = document.getElementById(`Q${qIndex}`);
    column.className = 'plainColumn';
  };
}

function highlightQuestionInScoringTable(qIndex) {
  unhighlightAllColumns();
  const tableColumn = document.getElementById(`Q${qIndex}`);
  tableColumn.className = 'highlightColumn';
}

function initializeTeamScoresForQuestion(index) {
  const scoresArray = getScores();
  scoresArray.forEach(team => {
    if(!team.scores[index]) {
      team.scores[index] = 0;
    }
  });
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

function initializeScoresPageByGameState() {
  if (getGameState() != IN_GAME) {
    initializePreGame();
  } else {
    initializeInGame();
  }
}

initializeScoresPageByGameState();
