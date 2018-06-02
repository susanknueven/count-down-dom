const koa = require('koa');
const Router = require('koa-router');
const mount = require('koa-mount');
const serve = require('koa-static');

const ui = new koa();
const api = new koa();
const app = new koa();
const router = new Router();

ui.use(serve('ui'));

let teamNames = [];
const teamNameGetter = () => {
  return teamNames;
};
const teamNamesSetter = newTeamNames => {
  teamNames = newTeamNames;
};
const getTeamNames = ctx => {
  console.log('getTeamNames: ', teamNameGetter());
  ctx.response.body = teamNameGetter();
  ctx.status = 200;
};
const writeTeamNames = ctx => {
  teamNamesSetter(ctx.request.body);
  console.log('writeTeamNames: ', teamNameGetter());
  ctx.response.body = ctx.request.body;
  ctx.status = 200;
  return ctx;
};

let scores = [];
let totals = [];
const scoresGetter = () => {
  return scores;
};
const scoresSetter = newScores => {
  scores = newScores;
};
const getScores = ctx => {
  totals = calculateTotals(scores);
  const response = { scores, totals };
  console.log('getScores: ', response);
  ctx.response.body = response;
  ctx.status = 200;
  return ctx;
};
const writeScores = ctx => {
  scores = JSON.parse(ctx.request.body);
  totals = calculateTotals(scores);
  const response = { scores, totals };
  console.log('writeScores: ', response);
  ctx.response.body = response;
  ctx.status = 200;
  return ctx;
};
const updateTeamScore = ctx => {
  const { qIndex, teamIndex, points } = JSON.parse(ctx.request.body);
  console.log(
    `updateTeamScore request: qIndex: ${qIndex}, teamIndex: ${teamIndex}, points: ${points}`
  );
  scores[qIndex][teamIndex] = points;
  totals = calculateTotals(scores);
  const response = { scores, totals };
  console.log('updateTeamScore response: ', response);
  ctx.response.body = response;
  ctx.status = 200;
};
const calculateTotals = scores =>
  scores.reduce((acc, row) => {
    return row.map((cell, index) => (acc[index] || 0) + (cell || 0));
  }, []);

const getNewRow = ctx => {
  const numOfTeams = teamNameGetter().length;
  const emptyRow = new Array(numOfTeams).fill(undefined);
  scores.push(emptyRow);
  totals = calculateTotals(scores);
  const response = { scores, totals };
  console.log('getNewRow response: ', response);
  ctx.response.body = response;
  ctx.status = 200;
  return ctx;
};

const koaBody = require('koa-body');
router
  .get('/teamNames', getTeamNames)
  .post('/teamNames', koaBody(), writeTeamNames)
  .get('/scores', getScores)
  .post('/scores', koaBody(), writeScores)
  .put('/scores', koaBody(), updateTeamScore)
  .get('/getNewRow', getNewRow);

api.use(router.routes());

app.use(mount('/api', api));
app.use(mount('/', ui));

app.listen(3000);

module.exports = {
  calculateTotals,
  getNewRow,
  teamNamesSetter,
  scoresGetter,
  scoresSetter,
  writeScores
};
