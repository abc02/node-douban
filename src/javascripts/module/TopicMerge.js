import Topic from './Topic.js'

let TopicMerge = (function () {

    function load(insertNode, results) {
        results.forEach((item, index) => {
            item.index = index
            Topic.init(item, insertNode)
        })
    }
    return {
        load: load
    }
})()

export default TopicMerge;