require('./services/mongo.js')
const Topic = require('./models/topic.js')
const crawler = require('./services/crawler.js')

const start = async () => {
    
    for(let i =0; i < 100; i++){
        let results = await crawler.fetchSingleDoubanList(i*25)
        console.log(results)
        for(let j =0; j < results.length; j++){
            // 查询是否相同url
            let findTopic = await Topic.findOne({ url: results[j].url }).then(r =>r)
            if(!findTopic){
                // 获取租房信息，图片 ， 并插入数据库
                let topicContent = await crawler.fetchSingleDoubanTopic(results[j])
                await Topic.create(topicContent).then(r =>r)
            }
        }
     
    }
  
}


start().then(r =>{
    console.log('done');
    process.exit(0)
}).catch(error =>{
    console.log(error)
    process.exit(1)
})