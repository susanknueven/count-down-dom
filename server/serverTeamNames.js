import { gameStateGetter, gameStateSetter } from './serverGameState.js';

export const getTeamNames = ctx => {
  const gameState = gameStateGetter();
  console.log('getTeamNames: ', gameState);
  ctx.response.body = gameState;
  ctx.status = 200;
  return ctx;
};

export const writeTeamNames = ctx => {
  const requestBody = JSON.parse(ctx.request.body);
  console.log('request', requestBody);
  if (!requestBody.teamNames || requestBody.teamNames.length == 0) {
    const err = new Error('No teams');
    err.status = 400;
    err.message = 'No team names provided.';
    throw err;
  }
  const newGameState = gameStateSetter({ teamNames: requestBody.teamNames });
  console.log('writeTeamNames: ', newGameState);
  ctx.response.body = newGameState;
  ctx.status = 200;
  return ctx;
};
