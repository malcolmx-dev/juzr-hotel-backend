const mongoose = require('mongoose')

const userVerificationShema = mongoose.Schema({
    userId:String,
    uniqueString:String,
    createdAt:Date,
    expiresAt:Date,
   
})


module.exports= mongoose.model('UserVerification', userVerificationShema)