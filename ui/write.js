const scores = [];

localStorage.setItem('scores', JSON.stringify(scores));

function writeToLS() {
    let newScores;
    const team1Correct = document.getElementById('team1CorrectBox').checked;
    const team2Correct = document.getElementById('team2CorrectBox').checked;

    const prevScores = JSON.parse(localStorage.getItem('scores'));
    const prevTeam1Score = prevScores.team1;
    team1Points = team1Correct ? 1 : 0;
    prevTeam1Score.push(team1Points);

    const prevTeam2Score = prevScores.team2;
    team2Points = team2Correct ? 1 : 0;
    prevTeam2Score.push(team2Points);

    newScores = { ...prevScores, "team1" : prevTeam1Score, "team2" : prevTeam2Score };
    localStorage.setItem('scores', JSON.stringify(newScores));
}

const teams = ['team1', 'team2', 'team3'];

function generateScoringSheet() {
  const body = document.getElementsByTagName('body')[0];
  const oldTable = document.getElementsByTagName('table');
  if(!!oldTable) { oldTable.parentNode.removeChild(oldTable); }

  const table = document.createElement('table');
  const tableBody = document.createElement('tbody');

  teams.forEach(team => {
    console.log(team.value)
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const nameCellText = document.createTextNode(team.value);
    nameCell.appendChild(nameCellText);
    row.appendChild(nameCell);
    
    const scoreCell = document.createElement('td');
    const scoreCellText = document.createTextNode('correct');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.value = 'correct';
    checkBox.appendChild(scoreCellText);
    scoreCell.appendChild(checkBox);
    row.appendChild(scoreCell);
    tblBody.appendChild(row);
  }); 
}