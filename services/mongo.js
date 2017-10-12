const mongoose = require('mongoose')
//链接数据库
mongoose.connect('mongodb://localhost/rent_crawler', {
    server: { poolSize: 5}
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection Error'))
db.on('open', function(){
    console.log('MongoDB Connection Established. ')
})

module.exports = db