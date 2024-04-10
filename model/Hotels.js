const mongoose= require('mongoose')

const hotelShema = mongoose.Schema({
    name:{type: String, required:true },
    type: {type: String, required:true },
    island:{type: String, required:true},
    city:{type: String, required:true },
    adress:{type: String, required:true },
    desc: {type: String, required:true },
    photos:{type: [String]},
    equipments:{type:Array},
    rating:{type: Number, min:0, max:5},
    room:{type: [String] },
    cheapestPrice: {type: Number, required:true },
    featured:{type: Boolean, default:false },
})


module.exports= mongoose.model('Hotel', hotelShema)
