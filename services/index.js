require('./mongo.js')
const Topic = require('../models/topic.js')
const crawler = require('./crawler.js')

/**
 * 
 * @param {string} pages 
 * @return{}
 */

async function fetchSingleDouban(pages) {

    // for(let i =0; i < 100; i++){
    let results = await crawler.fetchSingleDoubanList(pages)
    console.log(results)
    for (let j = 0; j < results.length; j++) {
        // 查询是否相同url
        let findTopic = await Topic.findOne({ url: results[j].url }).then(r => r)
        if (!findTopic) {
            // 获取租房信息，图片 ， 并插入数据库
            let topicContent = await crawler.fetchSingleDoubanTopic(results[j])
            await Topic.create(topicContent).then(r => r)
        }
    }

    // }

}
//.then(r => {
//     console.log('done');
//     process.exit(0)
// }).catch(error => {
//     console.log(error)
//     process.exit(1)
// })

async function fetchTopicDouban(items) {
    let results = []
    let topic = await crawler.fetchSingleDoubanList(items)
    for (let j = 0; j < topic.length; j++) {
        let topicContent = await crawler.fetchSingleDoubanTopic(topic[j])
        console.log(topicContent)
        results.push(topicContent)
    }
    console.log('results: ', results.length)
    return results

}

/**
 * 
 */
async function fetchTopicMongDB(pages, items) {
    return await Topic.find().skip(pages * items).limit(items).then(r => r)
}


module.exports = {
    fetchSingleDouban,
    fetchTopicMongDB,
    fetchTopicDouban,
}