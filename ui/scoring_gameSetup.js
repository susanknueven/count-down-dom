
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

function generateScoringTable(numOfQs) {
  const scoresArray = getScores();
  const questionArray = scoresArray[0].scores;
  
  const oldTable = document.getElementById('scoreTable');
  if(!!oldTable) { oldTable.parentNode.removeChild(oldTable); }

  const table = document.createElement('table');
  table.id = 'scoreTable';
  const columnGroupElement = document.createElement('colgroup');
  const columnNames = document.createElement('col');
  columnNames.id = 'teamNamesColumn';
  columnGroupElement.appendChild(columnNames);
  for (qIndex=0; qIndex<numOfQs; qIndex++) {
    const qColumn = document.createElement('col');
    qColumn.id = `Q${qIndex}`;
    qColumn.className = 'plainColumn';
    columnGroupElement.appendChild(qColumn);
  };
  table.appendChild(columnGroupElement);

  const tableBody = document.createElement('tbody');
  const tableHeader = document.createElement('tr');
  const teamNameHeader = document.createElement('th');
  teamNameHeader.innerHTML = 'Team Name';
  tableHeader.appendChild(teamNameHeader);
  for (qIndex=0; qIndex<numOfQs; qIndex++) {
    const questionNumHeader = document.createElement('th');
    questionNumHeader.innerHTML = getQuestionNumberFromQuestionIndex(qIndex);
    tableHeader.appendChild(questionNumHeader);
  };
  tableBody.appendChild(tableHeader);


  scoresArray.map(team => {
    const row = document.createElement('tr');
    const teamName = team.teamName;
    const teamNameCell = document.createElement('td');
    teamNameCell.innerHTML = teamName;
    row.appendChild(teamNameCell);
    team.scores.map((score, qIndex) => {
      const radioGroupName = `${teamName}_Q${qIndex}`;
      const questionCell = document.createElement('td');
      const radioGotItButton = document.createElement('input');
      radioGotItButton.type = 'radio';
      radioGotItButton.name = radioGroupName;
      radioGotItButton.value = GOT_IT;
      radioGotItButton.id = `${teamName}${GOT_IT}_Q${qIndex}`;
      radioGotItButton.onclick = () => updateScoresInLS(radioGroupName, 1);
      radioGotItButton.checked = isScorePositive(team.scores, qIndex);
      const labelGotItRadio = document.createElement('label');
      labelGotItRadio.for = radioGotItButton.id;
      labelGotItRadio.innerHTML = radioGotItButton.value;
      const radioNopeButton= document.createElement('input');
      radioNopeButton.type = 'radio';
      radioNopeButton.name = radioGroupName;
      radioNopeButton.value = NOPE;
      radioNopeButton.id = `${teamName}${NOPE}_Q${qIndex}`;
      radioNopeButton.onclick = () => updateScoresInLS(radioGroupName, 0);
      radioNopeButton.checked = isScoreZero(team.scores, qIndex);
      const labelNopeRadio= document.createElement('label');
      labelNopeRadio.for = radioNopeButton.id;
      labelNopeRadio.innerHTML = radioNopeButton.value;

      questionCell.appendChild(radioGotItButton);
      questionCell.appendChild(labelGotItRadio);
      questionCell.appendChild(radioNopeButton);
      questionCell.appendChild(labelNopeRadio);
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

function initializePage() {
  if (getGameState() != IN_GAME) {
    initializePreGame();
  } else {
    initializeInGame();
  }
}

initializePage();
