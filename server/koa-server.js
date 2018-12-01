import {
  gameStateGetter,
  gameStateSetter,
  resetGameState
} from './serverGameState.js';
import { writeTeamNames } from './serverTeamNames.js';
import { updateTeamScore } from './serverScores.js';
import {
  displayCategory,
  displayQuestion,
  displayAnswer
} from './serverDisplay.js';
import { QUESTION_LOADED, TRIVIA, GENERAL_TRIVIA } from '../ui/utils/stateConstants.js';
import koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import koaBody from 'koa-body';
import { trivia } from './serverTrivia.js';
import { getNextTrivia } from './serverQuestions.js';

const app = new koa();
const router = new Router();

resetGameState();
trivia.load(GENERAL_TRIVIA, './trivia_questions.json');

//dummy mode has non-empty game state
if (process.argv[2] === 'dummy') {
  const playerView = TRIVIA;
  const gameOperatorView = QUESTION_LOADED;
  const scores = [[0, 1, 1, 0], [0, 0, 1, 0], [0, 1, 0, 1]];
  const teamNames = ['hi', 'bye', 'c-ya', 'later'];
  const category = 'Random';
  const question = 'Name the colors in a rainbow';
  const answer = 'ROY G BIV';
  const trivia = { category, question, answer };
  gameStateSetter({
    scores,
    teamNames,
    playerView,
    gameOperatorView,
    trivia
  });
}

const getGameState = ctx => {
  const gameState = gameStateGetter();
  console.log('getGameState', gameState);
  ctx.response.body = gameState;
  ctx.status = 200;
  return ctx;
};

router
  .get('/api/gameState', getGameState)
  .post('/api/teamNames', koaBody(), writeTeamNames)
  .put('/api/scores', koaBody(), updateTeamScore)
  .post('/api/getNextQuestion', koaBody(), getNextTrivia)
  .get('/api/displayCategory', displayCategory)
  .get('/api/displayQuestion', displayQuestion)
  .get('/api/displayAnswer', displayAnswer);

app.use(router.routes());
app.use(serve('ui'));

app.listen(3000);

//get state
//fix display
//change State
//repeat!!
