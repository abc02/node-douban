
function Topic(data) {
    this.$container = $('.entry-wrapper').length > 0 ? $('.entry-wrapper') : $('body')
    this.createTopicHTML(data)
}

Topic.prototype = {
    createTopicHTML: function (data) {
        console.log(data.title)
        let tpl = `
        <div class="topic-container">
        <h2 class="topic-title ellipsis">
            <a href="${data.url}">${data.title}</a>
        </h2>
        <p class="topic-details ellipsis" title="${data.details}">${data.details}</p>
        </div>
        `
        this.$container.append(tpl)
    }
}


export function init(data) {
    new Topic(data)
}
