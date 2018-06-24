import {
  generateScoreTable,
  changeScore,
  getNewQuestion
} from './scoreTableSideEffects.js';
import { writeScores, getScores } from './scoresApiCalls.js';
import { writeTeamNames, getTeamNames } from './teamNamesApiCalls.js';

export const loadPage = async () => {
  //initialize gameState
  const scores = [[0, 1, 1, 0], [0, 0, 1, 0], [0, 1, 0, 1]];
  const teamNames = ['hi', 'bye', 'c-ya', 'later'];
  return await Promise.all([
    writeTeamNames(teamNames),
    writeScores(scores)
  ]).then(() => generateScoreTable(getTeamNames(), getScores()));
};

export const createClickEventListener = () => {
  document.addEventListener('click', function(e) {
    // listens for radio button clicks and updates score
    if (e.target.tagName == 'INPUT') {
      changeScore(e.target);
    }
    if (e.target.tagName == 'BUTTON') {
      switch (e.target.id) {
        case 'nextQuestionButton':
          getNewQuestion();
      }
    }
  });
};
