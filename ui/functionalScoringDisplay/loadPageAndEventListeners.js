import {
  generateScoreTable,
  changeScore,
  getNewQuestion
} from './scoreTableSideEffects.js';
import { getGameState } from './gameStateApiCalls.js';
import { REGISTER } from '../utils/stateConstants.js';

export const loadPage = () => {
  displayGameOpView(getGameState());
  createClickEventListener();
};

const displayGameOpView = gameStatePromise => {
  gameStatePromise
    .then(gameState => {
      if (gameState.gameOperatorView == REGISTER) {
        //make way to register teams
      } else {
        generateScoreTable(gameState);
      }
    })
    .catch(error => {
      console.log('error getting retrieving game state from server: ', error);
      scoreTableWrapperElement.innerHTML = `<span>Houston, we have a problem: ${error}</span>`;
    });
};

export const createClickEventListener = () => {
  document.addEventListener('click', function(e) {
    console.log('click', e.target);
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
