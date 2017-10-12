const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
    title: String,
    url: String,
    createTime: Number,
    details:[String]
})

const TopicModel = mongoose.model('topic', TopicModel)

module.exports = TopicModel