import {
  generateScoreTable,
  changeScore,
  getNewQuestion
} from './scoreTableSideEffects.js';
import { getGameState } from './gameStateApiCalls.js';

export const loadPage = async () => {
  //initialize gameState

  //grab data from server and make way to register teams

  //getState
  //update display

  return generateScoreTable(getGameState());
};

export const createClickEventListener = () => {
  document.addEventListener('click', function(e) {
    console.log('click', e.target);
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
