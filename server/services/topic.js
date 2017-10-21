require('../services/mongo.js')
const Topic = require('../models/topic.js')
const crawler = require('../services/crawler.js')

/**
 * 
 * @param {string} pages 
 * @return{}
 */

async function fetchSingleDouban(pages) {
    let results = await crawler.fetchSingleDoubanList(pages)
    for (let j = 0; j < results.length; j++) {
        // 查询是否相同url
        let findTopic = await Topic.findOne({ url: results[j].url }).then(r => r)
        if (!findTopic) {
            // 获取租房信息，图片 ， 并插入数据库
            let topicContent = await crawler.fetchSingleDoubanTopic(results[j])
            await Topic.create(topicContent).then(r => r)
        }
    }
    console.log(`已抓取数据: ${results.length} 条`)

}


async function fetchOnlineData(items) {
    let results = await crawler.fetchSingleDoubanList(items)
    // for (let j = 0; j < topic.length;) {
    //     let topicContent = await crawler.fetchSingleDoubanTopic(topic[j])
    //     console.log(topicContent)
    //     results.push(topicContent)
    // }
    console.log('results: ', results.length)
    return results

}

async function fetchDataBase(pages, items) {
    return await Topic.find().skip(pages * items).limit(items).then(r => r)
}


module.exports = {
    fetchSingleDouban,
    fetchTopicMongDB,
    fetchTopicDouban,
}