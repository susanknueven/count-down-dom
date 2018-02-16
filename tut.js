// function* myGenerator() {
//   yield 'hello'
//   yield 'world'
// }

// var helloWorld = myGenerator();

// console.log(helloWorld.next())
// console.log(helloWorld.next())
// console.log(helloWorld.next())

// var co = require('co');
// let resolve1, resolve2;

// helloWorldPromise = co(function* () {
//   var promise1 = new Promise((result) => resolve1 = result);
//   var promise2 = new Promise((result) => resolve2 = result);

//   console.log('in generatore before result1')
//   var result1 = yield promise1;
//   console.log('in generatore before result2')
//   var result2 = yield promise2;
//   return result1 + ' ' + result2;
// });

// helloWorldPromise.then((result) => console.log(result));

// console.log('before resolve 1')
// resolve1('hello')
// console.log('after resolve1')
// resolve2('there')
// console.log('after resolve2')

var koa = require('koa')
var _ = require('koa-route')
var fs = require('co-fs')

var app = new koa();
console.log('before app')
app.use(_.get('/', './index.html'))
console.log('before listen')
app.listen(3000);