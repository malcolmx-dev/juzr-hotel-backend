const mongoose= require('mongoose')

const hotelShema = mongoose.Schema({
    name:{type: String, required:true },
    type: {type: String, required:true },
    island:{type: String, required:true},
    city:{type: String, required:true },
    adress:{type: String, required:true },
    desc: {type: String, required:true },
    photos:{type: [String]},
    equipments:[{
        bathroom:{type:Array},
        vue:{type:Array},
        outside:{type:Array},
        bedroom:{type:Array},
        activities:{type:Array},
        reception:{type:Array},
        restaurant:{type:Array},
        security:{type:Array},
        general:{type:Array},
        health:{type:Array},
        internet:{type:Boolean},
        parking:{type:Boolean}}],
    rating:{type: Number, min:0, max:5},
    room:{type: [String] },
    cheapestPrice: {type: Number, required:true },
    featured:{type: Boolean, default:false },
})


module.exports= mongoose.model('Hotel', hotelShema)
