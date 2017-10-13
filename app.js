const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const convert = require('koa-convert')
const static  = require('koa-static');


app.use(bodyParser())     // 解析body
app.use(static('./APP'))  //设置静态资源

// response
app.use(async ctx => {
  ctx.body = 'Hello World' + ctx.request.header.host;
});

// error
app.on('error', err => {
  log.error('server error', err)
});


app.listen(3000)
console.log('the server is starting at port 3000')