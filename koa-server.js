const koa = require('koa')
const Router = require('koa-router')
const mount = require('koa-mount');
const serve = require('koa-static');

const ui = new koa();
const api = new koa();
const app = new koa();
const router = new Router();

ui.use(serve('ui'));

let teamNames; 
function getTeamNames(ctx, next) {
    console.log('getTeamNames: ', teamNames)
    ctx.response.body = teamNames;
    ctx.status = 200;
}
const writeTeamNames = (ctx) => {
    teamNames = ctx.request.body;
    console.log('writeTeamNames: ', teamNames)
    ctx.response.body = JSON.stringify(ctx.request.body);
    ctx.status = 200;
}

const koaBody = require('koa-body');
router.get('/teamNames', getTeamNames)
      .post('/teamNames', koaBody(), writeTeamNames);

api.use(router.routes());

app.use(mount('/api', api));
app.use(mount('/', ui));

app.listen(3000);