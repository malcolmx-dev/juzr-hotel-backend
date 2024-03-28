
const mongoose= require('mongoose')

const userShema = mongoose.Schema({
    username:{type: String, required:true },
    password: {type: String, required:true },
    isAdmin:{type: Boolean, default:false },
    hotelId:{type:String, default:null}
}, {timestamps:true})


module.exports= mongoose.model('Admin', userShema)