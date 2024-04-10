const mongoose= require('mongoose')

const searchShema = mongoose.Schema({
    city:{type: String},
    island:{type:String}
})


module.exports= mongoose.model('Search', searchShema)
