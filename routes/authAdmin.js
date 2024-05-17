const express = require('express')
const { register, login } = require('../controllers/authAdmin')
const { verifyDev } = require('../utils/verifyToken')
const route = express.Router()

route.post('/register',verifyDev, register)
route.post('/login', login)




module.exports= route