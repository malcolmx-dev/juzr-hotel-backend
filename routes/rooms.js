const express = require('express')
const route = express.Router()
const { createRoom, updateRoom, deleteRoom, getOneRoom, getAllRoom, updateAvailabiltyRoom } = require('../controllers/rooms')
const { verifyAdmin } = require('../utils/verifyToken')

//POST
route.post("/:hotelId", verifyAdmin, createRoom)
//UPDATE
route.put('/:id',verifyAdmin, updateRoom)
route.put('/availability/:id', updateAvailabiltyRoom)

//DELETE
route.delete('/:id/:hotelId',verifyAdmin, deleteRoom)
//GET
route.get('/:id/:hotelid', getOneRoom)
//GETALL
route.get('/', getAllRoom)



module.exports = route