import { gameStateGetter, gameStateSetter } from './serverGameState.js';
import { writeTeamNames, getTeamNames } from './serverTeamNames.js';
import { updateTeamScore, getScores } from './serverScores.js';
import { getNewRow } from './serverScores.js';
import koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import koaBody from 'koa-body';

const app = new koa();
const router = new Router();

//dummy mode has non-empty game state
if (process.argv[2] === 'dummy') {
  const scores = [[0, 1, 1, 0], [0, 0, 1, 0], [0, 1, 0, 1]];
  const teamNames = ['hi', 'bye', 'c-ya', 'later'];
  gameStateSetter({ scores, teamNames });
}

const getGameState = ctx => {
  ctx.response.body = gameStateGetter();
  ctx.status = 200;
};

router
  .get('/api/gameState', getGameState)
  .get('/api/teamNames', getTeamNames)
  .post('/api/teamNames', koaBody(), writeTeamNames)
  .get('/api/scores', getScores)
  .put('/api/scores', koaBody(), updateTeamScore)
  .get('/api/getNewRow', getNewRow);

app.use(router.routes());
app.use(serve('ui'));

app.listen(3000);

//get state
//fix display
//change State
//repeat!!
