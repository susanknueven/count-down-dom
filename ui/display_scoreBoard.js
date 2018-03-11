function sumScores(scoresArray) {
  return scoresArray.reduce((prev, current) => prev + current);
}

function generateScoreBoardFromLS(scoresArray) {
  const tableWrapperElement = document.getElementById('scoreTableWrapper');
  const oldScoreBoard = document.getElementById('scoreBoardRow');
  if(!!oldScoreBoard) { oldScoreBoard.parentNode.removeChild(oldScoreBoard); }

  const row = document.createElement('div');
  row.id = 'scoreBoardRow';
  scoresArray.forEach(team => {
    const teamCell = document.createElement('div');
    teamCell.className = 'teamScoreBlock';
    const nameCell = document.createElement('span');
    nameCell.className = 'teamName';
    const nameCellText = document.createTextNode(team.teamName);
    nameCell.appendChild(nameCellText);
    teamCell.appendChild(nameCell);
    
    const scoreCell = document.createElement('span');
    const scoreCellText = document.createTextNode(sumScores(team.scores));
    scoreCell.className = 'teamScore';
    scoreCell.appendChild(scoreCellText);
    teamCell.appendChild(scoreCell);
    row.appendChild(teamCell);
  });

  tableWrapperElement.appendChild(row);
}

function getLeadersScores(scoresArray) {
  const sortedScoresArray = scoresArray.sort((a, b) => {
    return sumScores(b.scores)-sumScores(a.scores);
  });

  const rankedTeamsArray = scoresArray.map(team => {
    const rank = sortedScoresArray.findIndex(t => {
      return sumScores(team.scores) === sumScores(t.scores);
    });
    return { name: team.teamName, rank }
  })
  .filter(team => team.rank <= 3);

  const rankedLeaders = [];
  for(rank = 0; rank < 3; rank++) {
    if (rankedTeamsArray.find(t => t.rank === rank)) {
      const teamNames = rankedTeamsArray.filter(team => {
        return team.rank === rank;
      }).map(team => { return {name: team.name} });

      const placeNames = teamNames.reduce((p,c) => {
        return {name: p.name + ', ' + c.name };
      });
      rankedLeaders.push({ rank, ...placeNames });
    }
  };
  return rankedLeaders;
}

function generateLeaderBoardFromLS(scoresArray) {
  const tableWrapperElement = document.getElementById('leaderBoardWrapper');
  const oldTable = document.getElementById('leaderBoardTable');
  if(!!oldTable) { oldTable.parentNode.removeChild(oldTable); }

  const tbl = document.createElement('table');
  tbl.setAttribute('id', 'leaderBoardTable');
  const tblBody = document.createElement('tbody');
  tblBody.setAttribute('id', 'tableBody');
  
  const leadersScoresArray = getLeadersScores(scoresArray);

  leadersScoresArray.forEach(team => {
    const row = document.createElement('tr');
    const scoreCell = document.createElement('td');
    scoreCell.className = 'leaderScoreWithRank';
    const teamCell = document.createElement('td');
    teamCell.className = 'leaderScoreBlock';
    const rankCell = document.createElement('td');
    rankCell.className = 'rank';
    const rankCellText = document.createTextNode(team.rank + 1);
    rankCell.appendChild(rankCellText);
    const nameCell = document.createElement('td');
    nameCell.className = 'leaderName';
    const nameCellText = document.createTextNode(team.name);
    nameCell.appendChild(nameCellText);
    teamCell.appendChild(nameCell);
    scoreCell.appendChild(rankCell);
    scoreCell.appendChild(teamCell);
      
    // const teamScoreCell = document.createElement('td');
    // const teamScoreCellText = document.createTextNode(sumScores(team.scores));
    // teamScoreCell.className = 'leaderScore';
    // teamScoreCell.appendChild(teamScoreCellText);
    // teamCell.appendChild(teamScoreCell);
    row.appendChild(scoreCell);
    row.appendChild(teamCell);
    tblBody.appendChild(row);
  }); 
  
  tbl.appendChild(tblBody);
  tableWrapperElement.appendChild(tbl);
}