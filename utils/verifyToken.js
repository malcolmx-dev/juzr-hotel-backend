const createError = require('./error')
const jwt= require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if(!token){ 
        return next(createError(401, 'User not verified'))
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, 'Token is wrong'));
        req.user = user
        next()

 
    })
}

const verifyUser = async (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id=== req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403, 'You are not authorized!'));
        }
    })
}
const verifyAdmin = async (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.admin.isAdmin){
            next()
        }else{
            return next(createError(403, 'You are not authorized!'));
        }
    })
} 
const verifyDev = async (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.admin.isBoss){
            next()
        }else{
            return next(createError(403, 'You are not authorized!'));
        }
    })
} 

module.exports = {verifyToken, verifyUser, verifyAdmin, verifyDev}