const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
    title: String,
    url: {type: String, unique: true, index: true, },
    createTime: Number,
    details:[String],
    images: [String]
})

const TopicModel = mongoose.model('topic', TopicSchema)

module.exports = TopicModel