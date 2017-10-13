const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const Router = require('koa-router')
const Topic = require('./models/topic.js')
const { fetchSingleDouban, fetchTopicMongDB } = require('./services/index.js')

const app = new Koa()
const router = new Router()



app.use(bodyParser())     // 解析body
app.use(static('./APP'))  //设置静态资源

router.get('/getlists', async (ctx, next) => {
  let results = await fetchTopicMongDB()
  ctx.body = results

})



app.use(router.routes())
.use(router.allowedMethods())


// error
app.on('error', err => {
  log.error('server error', err)
});


app.listen(3000)
console.log('the server is starting at port 3000')