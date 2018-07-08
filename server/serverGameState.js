import { calculateTotals } from './serverScores.js';

let gameState = {
  teamNames: [],
  scores: [],
  totals: []
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
  gameState = Object.assign(state, newState);
  return gameState;
};

export const resetGameState = () => {
  gameState = {
    teamNames: [],
    scores: [],
    totals: []
  };
};
