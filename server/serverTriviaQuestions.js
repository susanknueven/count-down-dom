import { createScoresForNextQuestion } from './serverScores.js';
import { gameStateGetter, gameStateSetter } from './serverGameState.js';

export const getNextQuestion = ctx => {
  const gameState = gameStateGetter();
  const { scores, totals } = createScoresForNextQuestion(gameState);
  const { trivia } = getNextTriviaQuestion();
  const newGameState = gameStateSetter({ scores, totals, trivia });
  ctx.response.body = newGameState;
  ctx.status = 200;
  return ctx;
};

export const loadTrivia = trivia => {
  const getNextTriviaQuestion = () => {
    return trivia.pop();
  };
  return getNextTriviaQuestion;
};
