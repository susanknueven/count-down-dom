import { calculateTotals } from './serverScores.js';
import { WELCOME, REGISTER } from '../ui/utils/stateConstants.js';

let gameState;

export const resetGameState = () => {
  gameState = {
    playerView: WELCOME,
    gameOperatorView: REGISTER,
    teamNames: [],
    scores: [],
    totals: [],
    trivia: {}
  };
};

export const gameStateGetter = () => {
  return gameState;
};

export const gameStateSetter = stateChange => {
  let state = gameStateGetter();
  let newState = {};
  if (stateChange.scores) {
    newState.scores = stateChange.scores;
    newState.totals = calculateTotals(stateChange.scores);
  }
  if (stateChange.teamNames) {
    newState.teamNames = stateChange.teamNames;
  }
  if (stateChange.gameOperatorView) {
    newState.gameOperatorView = stateChange.gameOperatorView;
  }
  if (stateChange.playerView) {
    newState.playerView = stateChange.playerView;
  }
  if (stateChange.trivia) {
    newState.trivia = stateChange.trivia;
  }
  gameState = Object.assign(state, newState);
  return gameState;
};
