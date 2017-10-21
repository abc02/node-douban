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
        let findTopic = await Topic.findOne({ url: results[j].url })
        if (!findTopic) {
            // 获取租房信息，图片 ， 并插入数据库
            let topicContent = await crawler.fetchSingleDoubanTopic(results[j])
            await Topic.create(topicContent)
        }
    }
  

}


async function fetchOnlineData(items) {
    // 100 / 25
    let pages = parseInt((items > 25 ? items : 25) / 25),
        results
    for (let i = 0; i < pages; i++) {
        results = await crawler.fetchSingleDoubanList(pages *25)
        for (let j = 0; j < results.length; j++) {
            let topicContent = await crawler.fetchSingleDoubanTopic(results[j])
            results[j] = topicContent
        }
    }
    console.log(`已抓取数据: ${results.length} 条`)
    console.log('results: ', results)
    return results

}

async function fetchDataBase(pages, items) {
    return await Topic.find().skip(pages * items).limit(items)
}

function autoFetchSwitch() {
    let pages = 0
    let timer
    return {
        start: () => {
            timer = setInterval(async () => {
                await fetchSingleDouban(pages)
                console.log(pages)
                pages += 25
            }, 1000 * 1 * 1)
        },
        stop: () => {
            clearInterval(timer)
            timer = null
        }
    }

}

module.exports = {
    fetchOnlineData,
    fetchDataBase,
    autoFetchSwitch
}