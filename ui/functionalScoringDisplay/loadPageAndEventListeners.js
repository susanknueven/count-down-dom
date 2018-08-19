import { displayScoreControls } from './displayScoreControls.js';
import { getGameState } from './gameStateApiCalls.js';
import { getIndicesFromRadioName } from './radioButton.js';
import { updateTeamScore, getNextQuestion } from './scoresApiCalls.js';
import {
  displayCategory,
  displayQuestion,
  displayAnswer
} from './displayApiCalls.js';
import { REGISTER } from '../utils/stateConstants.js';

export const loadPage = () => {
  displayGameOpView(getGameState());
  //display playerView
  createClickEventListener();
};

export const changeScore = el => {
  const { teamIndex, qIndex } = getIndicesFromRadioName(el.name);
  const points = el.value === 'Y' ? 1 : 0;
  displayGameOpView(updateTeamScore({ qIndex, teamIndex, points }));
};

const displayGameOpView = gameStatePromise => {
  gameStatePromise
    .then(gameState => {
      if (gameState.gameOperatorView == REGISTER) {
        //make way to register teams
      } else {
        displayScoreControls(gameState);
        //handle timer?
      }
    })
    .catch(error => {
      console.log('error getting retrieving game state from server: ', error);
      document.getElementById(
        'root'
      ).innerHTML = `<span>Houston, we have a problem: ${error}</span>`;
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
          displayGameOpView(getNextQuestion());
          break;
        case 'showCategory':
          displayGameOpView(displayCategory());
          break;
        case 'showQuestion':
          displayGameOpView(displayQuestion());
          break;
        case 'showAnswer':
          displayGameOpView(displayAnswer());
          break;
      }
    }
  });
};
