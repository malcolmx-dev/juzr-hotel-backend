const bcrypt = require('bcryptjs')
const User = require('../model/User')
const createError = require('../utils/error')
const jwt= require('jsonwebtoken')

const register = async (req, res, next) => {
    try{
        const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            surname: req.body.surname,
        })
        await newUser.save()
        res.status(200).json("User has been created")
    }catch(err){
        next(err)
    }
}
const login = async (req, res, next) => {
    try{
        const user = await User.findOne({ email: req.body.email })
        if(!user) {
            return next(createError(404, "User not found !"))
        }
        
        const token= jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)



        const {password, ...otherDetails} = user._doc
        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json({...otherDetails, access_token:token })
        
    }catch(err){
        next(err)
    }
}

module.exports= {register, login}