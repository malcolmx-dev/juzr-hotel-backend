
const mongoose= require('mongoose')

const userShema = mongoose.Schema({
    name:{type: String, required:true },
    email:{type: String, required:true, unique: true },
    surname: {type: String, required:true },
    password:{type: String, required:true },
    verified: Boolean,
    blackList: {type: String, default:false },
}, {timestamps:true})


module.exports= mongoose.model('User', userShema)