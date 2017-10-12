require('./services/mongo.js')
const Topic = require('./models/topic.js')
const crawler = require('./services/crawler.js')

const start = async () => {
    
    let results = await crawler.fetchSingleDoubanList(0)
    
    for(let j = 0; j < results.length; j++){
        let created = await Topic.create(results[j])
    }
    console.log(created)
}


start()