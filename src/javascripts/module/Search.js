import EventCenter from 'module/EventCenter'
class Search {
    constructor(search, results) {
        this.results = results
        this.search = search
        this.bind()
    }
    bind() {
        this.search.on('input', e => {
            let keyword = e.target.value
            let filter = []
            console.log(keyword)
            this.results.forEach((item, index) => {
                if (item.title.indexOf(keyword) > -1) {
                    filter.push(item)
                }
            })
            console.log(filter)
            // $('.topic-wrapper').empty()
            EventCenter.trigger('topicMerge', filter)
        })
    }
    static init(search, results) {
        new Search(search, results)
    }
}
export default Search