require('./services/mongo.js')
const Topic = require('./models/topic.js')
const crawler = require('./services/crawler.js')

const start = async () => {

    for(let i =0; i < 2; i++){
        let results = await crawler.fetchSingleDoubanList(i)
        console.log(results)
        // for(let j =0; j < results.length; j++){
        //     await crawler.fetchSingleDoubanTopic(results[j].url)

        // }
    }
  
}


start()