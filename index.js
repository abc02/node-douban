const crawler = require('./services/crawler.js')

const start = async () => {
    let results = await crawler.fetchSingleDoubanList(0)

}


start()