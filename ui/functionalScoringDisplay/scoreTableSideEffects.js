import { writeScoringTable } from './scoringTable.js';
import { getIndicesFromRadioName } from './radioButton.js';
import { getTeamNames } from './teamNamesApiCalls.js';
import { updateTeamScore, getNewRow } from './scoresApiCalls.js';

//side-effects:
export const changeScore = el => {
  const { teamIndex, qIndex } = getIndicesFromRadioName(el.name);
  const points = el.value === 'Y' ? 1 : 0;
  generateScoreTable(updateTeamScore({ qIndex, teamIndex, points }));
};

export const getNewQuestion = () => {
  generateScoreTable(getNewRow());
};

export const generateScoreTable = async gameStatePromise => {
  const scoreTableWrapperElement = document.getElementById('scoreTableWrapper');
  gameStatePromise
    .then(data => {
      scoreTableWrapperElement.innerHTML = writeScoringTable(
        data.teamNames,
        data.scores,
        data.totals
      );
    })
    .catch(error => {
      console.log('error getting retrieving from server: ', error);
      scoreTableWrapperElement.innerHTML = `<span>Houston, we have a problem: ${error}</span>`;
    });
};
