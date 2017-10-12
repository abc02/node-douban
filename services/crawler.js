const axios = require('axios')
const cheerio = require('cheerio')

/**
 * 获取当前页码所有租房链接
 * @param {number} start 
 * @return Array
 */

async function fetchSingleDoubanList(start){
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
 * 获取租房链接下租房信息，图片
 * @param {string} url
 * @return  url -> Array
 */
async function fetchSingleDoubanTopic(results){
    let { title, url } = results
    let res = await axios.get(url)
    let htmlText = res.data

    const $  = cheerio.load(htmlText)
    const contentText = $('.topic-content > p:first-child')
    const contentImages = $('.topic-figure > img')

    let details = []
    let images = []
    for(let i = 0; i < contentText.length; i++){
        details.push(contentText.eq(i).text())
    }
    for(let j = 0; j < contentImages.length; j++){
        images.push(contentImages.eq(j).attr('src'))
    }
    
    return {
        title,
        url,
        details,
        images,
    }
}

module.exports =  {
    fetchSingleDoubanList,
    fetchSingleDoubanTopic
}