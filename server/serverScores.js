import { gameStateGetter, gameStateSetter } from './serverGameState.js';

export const getScores = ctx => {
  const gameState = gameStateGetter();
  console.log('getScores: ', gameState);
  ctx.response.body = gameState;
  ctx.status = 200;
  return ctx;
};

export const updateTeamScore = ctx => {
  const { qIndex, teamIndex, points } = JSON.parse(ctx.request.body);
  console.log(
    `updateTeamScore request: qIndex: ${qIndex}, teamIndex: ${teamIndex}, points: ${points}`
  );
  const { scores } = gameStateGetter();
  scores[qIndex][teamIndex] = points;
  const newGameState = gameStateSetter({ scores });
  console.log('updateTeamScore response: ', newGameState);
  ctx.response.body = newGameState;
  ctx.status = 200;
  return ctx;
};

export const calculateTotals = scores =>
  scores.reduce((acc, row) => {
    return row.map((cell, index) => (acc[index] || 0) + (cell || 0));
  }, []);

export const getNewRow = ctx => {
  const gameState = gameStateGetter();
  const teamNames = gameState.teamNames;
  const scores = gameState.scores;

  if (teamNames.length == 0) {
    let err = new Error('No teams registered');
    err.status = 400;
    err.message = 'Cannot retrieve scores when no teams registered.';
    throw err;
  }
  const emptyRow = new Array(teamNames.length).fill(undefined);
  scores.push(emptyRow);

  const newGameState = gameStateSetter({ scores });
  console.log('getNewRow response: ', newGameState);
  ctx.response.body = newGameState;
  ctx.status = 200;
  return ctx;
};
