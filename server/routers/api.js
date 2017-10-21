/**
 * restful api 子路由
 */

const router = require('koa-router')()
const Topic = require('./../controllers/topic.js')

const routers = router
    .get('/topic/getDataBase.json', Topic.getDataBase)
    .get('/topic/getOnlineData.json', Topic.getOnlineData)
    .post('/topic/autoSwitch', Topic.autoSwitch)

module.exports = routers