import { init } from './Topic.js'

let TopicMerge = (function () {

    async function load() {
        let lists = await Promise.resolve($.ajax('/getlists'))
        lists.forEach(item =>{
            init(item)
        })
    }


    return {
        load: load
    }
})()

export default TopicMerge;