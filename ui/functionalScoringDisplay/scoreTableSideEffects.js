import { writeScoringTable } from './scoringTable.js';
import { getIndicesFromRadioName } from './radioButton.js';
import { updateTeamScore, getNewRow } from './scoresApiCalls.js';

//side-effects:
export const changeScore = async el => {
  const { teamIndex, qIndex } = getIndicesFromRadioName(el.name);
  const points = el.value === 'Y' ? 1 : 0;
  generateScoreTable(await updateTeamScore({ qIndex, teamIndex, points }));
};

export const getNewQuestion = async () => {
  generateScoreTable(await getNewRow());
};

export const generateScoreTable = gameState => {
  const scoreTableWrapperElement = document.getElementById('scoreTableWrapper');
  scoreTableWrapperElement.innerHTML = writeScoringTable(
    gameState.teamNames,
    gameState.scores,
    gameState.totals
  );
};
