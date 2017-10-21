const Topic = require('../models/topic.js')
const { fetchOnlineData, fetchDataBase } = require('../services/topic.js')


async function getDataBase(ctx) {
  let { pages, items } = ctx.query
  if (!items) {
    return ctx.body = '没有获取数据items参数'
  }

  //初始数值 初始值
  items = parseInt(items)
  pages = parseInt(pages)
  let results = await fetchDataBase(pages, items)
  ctx.body = results
}

async function getOnlineData(ctx) {
  let { items } = ctx.query
  if (!items) {
    return ctx.body = '没有获取数据items参数'
  }

  items = parseInt(items)
  let results = await fetchOnlineData(items)
  ctx.body = results
}

async function autoSwitch(ctx){

}

async function geFilterDataBase(ctx){

}

module.exports = {
  getDataBase,
  getOnlineData,
  autoSwitch,
  geFilterDataBase
}
