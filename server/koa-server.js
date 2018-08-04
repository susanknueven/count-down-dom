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
import { QUESTION_LOADED, TRIVIA } from '../ui/utils/stateConstants.js';
import koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import koaBody from 'koa-body';

const app = new koa();
const router = new Router();

resetGameState();

//dummy mode has non-empty game state
if (process.argv[2] === 'dummy') {
  const playerView = TRIVIA;
  const gameOperatorView = QUESTION_LOADED;
  const scores = [[0, 1, 1, 0], [0, 0, 1, 0], [0, 1, 0, 1]];
  const teamNames = ['hi', 'bye', 'c-ya', 'later'];
  const triviaCategory = 'Random';
  const triviaQuestion = 'Name the colors in a rainbow';
  const triviaAnswer = 'ROY G BIV';
  gameStateSetter({
    scores,
    teamNames,
    playerView,
    gameOperatorView,
    triviaCategory,
    triviaQuestion,
    triviaAnswer
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
  .get('/api/getNextQuestion', getNextQuestion)
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
