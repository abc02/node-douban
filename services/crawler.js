const axios = require('axios')
const cheerio = require('cheerio')

/**
 * 
 * @param {number} start 
 * @return Array
 */
async function fetchSingleDoubanList(start){
    console.log(start)
    let res = await axios.get(`https://www.douban.com/group/HZhome/discussion?start=${start}`)
    let htmlText = res.data

    const $ = cheerio.load(htmlText)
    const rs = $('a[title]')

    const resultList = []

    for(let i = 0; i < rs.length; i++){
        resultList.push({
            title: rs.eq(i).attr('title'),
            url:rs.eq(i).attr('href'),
        })
    }
    return resultList
}
/**
 * 
 * @param {string} url
 * @return  url -> Array
 */
async function fetchSingleDoubanTopic(url){
    let res = await axios.get(url)
    let htmlText = res.data

    const $  = cheerio.load(htmlText)

}

module.exports =  {
    fetchSingleDoubanList,
    fetchSingleDoubanTopic
}