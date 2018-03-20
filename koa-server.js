const koa = require('koa')
const Router = require('koa-router')
const mount = require('koa-mount');
const serve = require('koa-static');

const ui = new koa();
const api = new koa();
const app = new koa();
const router = new Router();

ui.use(serve('ui'));

function apiCall(ctx, next) {
    ctx.body='response from api';
}
function defaultCount(ctx, next) {
    ctx.body= { min: 0, sec: 3 };
}
router.get('/', apiCall);
router.get('/defaultCount', defaultCount);

api.use(router.routes());

app.use(mount('/api', api));
app.use(mount('/', ui));

app.listen(3000);