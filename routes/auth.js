const express = require('express')
const { register, login, verify, verified } = require('../controllers/auth')
const route = express.Router()

route.post('/register', register)
route.post('/login', login),

route.get('/verify/:userId/:uniqueString', verify),
route.get('/verified', verified)




module.exports= route