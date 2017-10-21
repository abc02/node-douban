import EventCenter from 'module/EventCenter'
import Visibility from 'module/Visibility'
class Topic {
    constructor(data, insertNode) {
        this.$insertNode = insertNode.length > 0 ? insertNode : $('body')
        this.render(data)
        this.$insertNode.append(this.$node)
        this.bind()
    }
    bind() {
        // 检查元素是否窗口范围内，add or remove 入场动画 
        EventCenter.on('visibility', e => {
            if (Visibility(this.$node)) {
                this.$node.addClass('anmiate')
            } else {
                this.$node.removeClass('anmiate')
            }
        })
        EventCenter.trigger('visibility')

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
