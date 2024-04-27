
const mongoose= require('mongoose')

const adminShema = mongoose.Schema({
    username:{type: String, required:true },
    password: {type: String, required:true },
    isAdmin:{type: Boolean, default:true },
    hotelId:{type:String, default:null},
    isBoss:{type: Boolean, default:false },
}, {timestamps:true})


module.exports= mongoose.model('Admin', adminShema)