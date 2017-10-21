const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const routers = require('./server/routers/index')

const app = new Koa()

app.use(bodyParser())     // 解析body
app.use(static('./APP'))  //设置静态资源
app.use(routers.routes()).use(routers.allowedMethods()) // 初始化路由中间件



// error
app.on('error', err => {
  log.error('server error', err)
});


app.listen(3000)
console.log('the server is starting at port 3000')