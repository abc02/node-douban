require('./services/mongo.js')
const Topic = require('./models/topic.js')
const crawler = require('./services/crawler.js')

const start = async () => {
    let results = await crawler.fetchSingleDoubanList(0)
    
    for(let j = 0; j < results.length; j++){
        console.log(j +    results[j].url)
        await Topic.create(results[j])
    }
}


start()