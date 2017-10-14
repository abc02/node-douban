import EventCenter from 'module/EventCenter'
class Topic {
    constructor(data, insertNode) {
        this.$insertNode = insertNode.length > 0 ? insertNode : $('body')
        this.render(data)
        this.$insertNode.append(this.$node)
        EventCenter.trigger('anmiate', this.$node)
    }
    render(data) {
        this.$node = $(`
        <div class="topic-container box bottom-insert">
        <h2 class="topic-title ellipsis">
            <a href="${data.url}">${data.title}</a>
        </h2>
        <p class="topic-details details">${data.details ? data.details : ''}</p>
        </div>`)
    }
    static init(data, insertNode) {
        new Topic(data, insertNode)
    }
}



export default Topic
