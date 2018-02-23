function sumScores(scoresArray) {
  return scoresArray.reduce((prev, current) => prev + current);
}

function sortTeamScores(scoresArray) {
  return scoresArray.sort(function(a, b) {
    return sumScores(b.scores)-sumScores(a.scores);
  });
}

function generateScoreBoardFromLS(scoresArray) {
  const tableWrapperElement = document.getElementById('scoreTableWrapper');
  const oldTable = document.getElementById('table');
  if(!!oldTable) { oldTable.parentNode.removeChild(oldTable); }

  const tbl = document.createElement('table');
  tbl.setAttribute('id', 'table');
  const tblBody = document.createElement('tbody');
  tblBody.setAttribute('id', 'tableBody');
  
  const sortedScoresArray = sortTeamScores(scoresArray);
  sortedScoresArray.forEach(team => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const nameCellText = document.createTextNode(team.teamName);
    nameCell.appendChild(nameCellText);
    row.appendChild(nameCell);
    
    const scoreCell = document.createElement('td');
    const scoreCellText = document.createTextNode(sumScores(team.scores));
    scoreCell.appendChild(scoreCellText);
    row.appendChild(scoreCell);
    tblBody.appendChild(row);
  }); 
  
  tbl.appendChild(tblBody);
  tableWrapperElement.appendChild(tbl);
}