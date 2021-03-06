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
  return getById('numOfQsInput').value;
}

function setNumOfQsInLS(numOfQs) {
  localStorage.setItem('numOfQs', JSON.stringify(numOfQs));
}

function getNumOfQsFromLS() {
  return parseInt(JSON.parse(localStorage.getItem('numOfQs')));
}

function getQuestionNumberFromQuestionIndex(index) {
  return index + 1;
}

function getScores() {
  return JSON.parse(localStorage.getItem('scores'));
}

function hidePreGameTools() {
  getById('preGameTools').style.display = 'none';
}

function hideInGameTools() {
  getById('inGameTools').style.display = 'none';
}

function showInGameTools() {
  getById('inGameTools').style.display = 'flex';
}

function isScorePositive(scoresArray, index) {
  return (scoresArray[index] > 0);
}

function isScoreZero(scoresArray, index) {
  const questionIndex = getTriviaIndex();
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
  columnGroupElement.id = 'colGroup';
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
  teamNameHeader.className = 'noScroll';
  tableHeader.appendChild(teamNameHeader);
  tableBody.appendChild(tableHeader);
  return tableHeader;
}

function createRowForTeam(teamName) {
  const row = document.createElement('tr');
  const teamNameCell = document.createElement('td');
  teamNameCell.innerHTML = teamName;
  teamNameCell.className = 'noScroll';
  row.appendChild(teamNameCell);
  return row;
}

function generateScoringTable() {
  const scoresArray = getScores();
  const questionArray = scoresArray[0].scores;
  
  const table = removeOldTableAndCreateNew(getById('scoreTable', false));
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
  const tableWrapperElement = getById('scoreTableWrapper');
  tableWrapperElement.appendChild(table);
}

function unhighlightAllColumns() {
  const columnGroup = getById('colGroup');
  const highlightedColumn = Array.from(columnGroup.childNodes)
    .filter(column => column.className === 'highlightColumn');
  if(highlightedColumn.length > 0) { 
    highlightedColumn.forEach(column =>{
      column.className = 'plainColumn'; 
    });
  }
}

function highlightQuestionInScoringTable(qIndex) {
  unhighlightAllColumns();
  if(isNaN(qIndex)) { qIndex = 0 }
  const tableColumn = getById(`Q${qIndex}`);
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

