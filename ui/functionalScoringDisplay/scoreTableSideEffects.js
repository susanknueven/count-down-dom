import {
  getIndicesFromRadioName,
  writeScoringTable
} from './createScoringTable.js';
import { getTeamNames } from './teamNamesApiCalls.js';
import { updateTeamScore, getNewRow } from './scoresApiCalls.js';

//side-effects:
export const changeScore = el => {
  const { teamIndex, qIndex } = getIndicesFromRadioName(el.name);
  const points = el.value === 'Y' ? 1 : 0;
  generateScoreTable(
    getTeamNames(),
    updateTeamScore({ qIndex, teamIndex, points })
  );
};

export const getNewQuestion = () => {
  generateScoreTable(getTeamNames(), getNewRow());
};

export const generateScoreTable = async (teamNamesPromise, scoresPromise) => {
  const scoreTableWrapperElement = document.getElementById('scoreTableWrapper');
  Promise.all([teamNamesPromise, scoresPromise])
    .then(data => {
      const teamNames = data[0];
      const scores = data[1].scores;
      const totals = data[1].totals;
      scoreTableWrapperElement.innerHTML = writeScoringTable(
        teamNames,
        scores,
        totals
      );
    })
    .catch(error => {
      console.log('error getting retrieving from server: ', error);
      scoreTableWrapperElement.innerHTML = `<span>Houston, we have a problem: ${error}</span>`;
    });
};
