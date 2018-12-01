import { gameStateGetter, gameStateSetter } from './serverGameState.js';
import { createScoresForNextQuestion } from './serverScores.js';
import { QUESTION_LOADED, GENERAL_TRIVIA } from '../ui/utils/stateConstants.js';
import { trivia } from './serverTrivia.js';

export const getNextTrivia = ctx => {
  const requestBody = JSON.parse(ctx.request.body);
  //default to general trivia
  const group = requestBody && requestBody.group || GENERAL_TRIVIA;
  const nextTrivia = trivia.pop(group);
  const newGameState = gameStateSetter({
    trivia: nextTrivia,
    gameOperatorView: QUESTION_LOADED
  });
  ctx.response.body = newGameState;
  ctx.status = 200;
  return ctx;
};
