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
              .reduce((rv, team) => {
                const teamScore = sumScores(team.scores);
              	if(!rv[teamScore]) {
              	  rv[teamScore] = [];
              	}
              	rv[teamScore].push(team.teamName);
              	return rv;
              }, {});

  const leaderScores = [];
  for (const score of Object.keys(groupedTeams).sort((a,b)=>b-a)) {
    const rankedScore = groupedTeams[score];
    leaderScores.push(rankedScore.reduce((acc, x)=> acc + ', ' + x));
    
    if(leaderScores.length < 3) {
      rankedScore.slice(1,3).map(()=>{
      leaderScores.push(undefined);
      });
    }
    if(leaderScores.length >= 3) {
      leaderScores.splice(3);
      break;
    }
  }

  return leaderScores;
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

  leadersScoresArray.map((team, index) => {
    if(team) {
      const row = document.createElement('tr');
      const scoreCell = document.createElement('td');
      scoreCell.className = 'leaderScoreWithRank';
      const teamCell = document.createElement('td');
      teamCell.className = 'leaderScoreBlock';
      const rankCell = document.createElement('td');
      rankCell.className = 'rank';
      const rankCellText = document.createTextNode(index + 1);
      rankCell.appendChild(rankCellText);
      const nameCell = document.createElement('td');
      nameCell.className = 'leaderName';
      const nameCellText = document.createTextNode(team);
      nameCell.appendChild(nameCellText);
      teamCell.appendChild(nameCell);
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