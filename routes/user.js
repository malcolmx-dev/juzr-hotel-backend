const express = require('express')
const route = express.Router()
const {updateUser, deleteUser, getOneUser, getAllUser } = require('../controllers/user')
const {verifyToken, verifyUser, verifyAdmin} = require('../utils/verifyToken')


//route.get("/checkauthentification", verifyToken, (req, res, next) => {
//    res.send("User verfied")
//})

//route.get("/checkuser", verifyUser, (req, res, next) => {
//    res.send("Hello user, you are logged and you can delete your account!")
//})

//route.get("/checkadmin", verifyAdmin, (req, res, next) => {
//   res.send("Hello admin, you are logged and you can delete all accounts!")
//})



//UPDATE
route.put('/:id',verifyUser, updateUser)

//DELETE
route.delete('/:id',verifyUser, deleteUser)

//GET
route.get('/:id',verifyUser, getOneUser)

//GETALL
route.get('/',verifyAdmin, getAllUser)




module.exports = route