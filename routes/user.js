const express = require('express')
const route = express.Router()
const {updateUser, deleteUser, getOneUser, getAllUser } = require('../controllers/user')
const {verifyToken, verifyUser, verifyAdmin} = require('../utils/verifyToken')


//UPDATE
route.put('/:id',verifyUser, updateUser)

//DELETE
route.delete('/:id',verifyUser, deleteUser)

//GET
route.get('/:id',verifyUser, getOneUser)

//GETALL
route.get('/',verifyAdmin, getAllUser)




module.exports = route