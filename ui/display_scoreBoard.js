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
  const groupedTeams = scoresArray
              .filter(team => sumScores(team.scores) > 0)
              .reduce((acc, team) => {
                const teamScore = sumScores(team.scores);
              	if(!acc[teamScore]) {
              	  acc[teamScore] = [];
              	}
              	acc[teamScore].push(team.teamName);
              	return acc;
              }, {});

  const leaderScores = [];
  for (const score of Object.keys(groupedTeams).sort((a,b)=>b-a)) {
    const rankedScore = groupedTeams[score];
    leaderScores.push(rankedScore);
    if (leaderScores.length < 3) {
      leaderScores.push(...rankedScore.slice(1, 3).map(() => []));
    }
    if (leaderScores.length >= 3) break;
  }

  return leaderScores;
}

function createRankCell(text) {
  const cell = document.createElement('td');
  cell.className = 'rank';
  const cellText = document.createTextNode(text);
  cell.appendChild(cellText);
  return cell;
}

function appendTeamNamesToTeamCell(teamCell, rank) {
  rank.forEach((team) => {
    const teamDiv = document.createElement('div');
    teamDiv.innerHTML = team;
    teamDiv.className = 'leaderName';
    teamCell.appendChild(teamDiv);
  });
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
  leadersScoresArray.forEach((rank, index) => {
    if(rank.length > 0) {
      const row = document.createElement('tr');
      row.className = 'leaderRankRow';
      const scoreCell = document.createElement('td');
      scoreCell.className = 'leaderScoreWithRank';

      const teamCell = document.createElement('td');
      teamCell.className = 'leaderScoreBlock';
      const rankCell = createRankCell(index + 1);
      appendTeamNamesToTeamCell(teamCell, rank);
      scoreCell.appendChild(rankCell);
      scoreCell.appendChild(teamCell);
        
      row.appendChild(scoreCell);
      row.appendChild(teamCell);
      tblBody.appendChild(row);
    }
  }); 
  
  tbl.appendChild(tblBody);
  tableWrapperElement.appendChild(tbl);
}