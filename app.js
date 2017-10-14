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

router.get('/getitems', async (ctx, next) => {
  let { pages,items} = ctx.query
  if (!items) {
    return ctx.body = '没有获取数据items参数'
  }

  //初始数值 初始值
  items = parseInt(items)
  pages = parseInt(pages)
  let results = await fetchTopicMongDB(pages, items)
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