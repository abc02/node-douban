const mongoose = require('mongoose')
//定义数据模型 
const TopicSchema = new mongoose.Schema({
    title: String,
    url: {type: String, unique: true, index: true, },
    createTime: Number,
    details:[String],
    images: [String]
})

const TopicModel = mongoose.model('topic', TopicSchema)

module.exports = TopicModel