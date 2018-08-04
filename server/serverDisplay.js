import { gameStateSetter } from './serverGameState.js';
import {
  SHOW_CATEGORY,
  SHOW_QUESTION,
  SHOW_ANSWER
} from '../ui/utils/stateConstants.js';

export const displayCategory = ctx => {
  const newGameState = gameStateSetter({ gameOperatorView: SHOW_CATEGORY });
  console.log('displayCategory', newGameState);
  ctx.response.body = newGameState;
  ctx.status = 200;
  return ctx;
};

export const displayQuestion = ctx => {
  const newGameState = gameStateSetter({ gameOperatorView: SHOW_QUESTION });
  console.log('displayQuestion', newGameState);
  ctx.response.body = newGameState;
  ctx.status = 200;
  return ctx;
};

export const displayAnswer = ctx => {
  const newGameState = gameStateSetter({ gameOperatorView: SHOW_ANSWER });
  console.log('displayAnswer', newGameState);
  ctx.response.body = newGameState;
  ctx.status = 200;
  return ctx;
};
