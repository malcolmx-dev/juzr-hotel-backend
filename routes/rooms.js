const express = require('express')
const route = express.Router()
const { createRoom, updateRoom, deleteRoom, getOneRoom, getAllRoom, updateAvailabiltyRoom, deleteAvailabiltyRoom } = require('../controllers/rooms')
const { verifyAdmin } = require('../utils/verifyToken')

//POST
route.post("/:hotelId", verifyAdmin, createRoom)
//UPDATE
route.put('/:id',verifyAdmin, updateRoom)
route.put('/availability/:id', updateAvailabiltyRoom)

//DELETE
route.delete('/:id/:hotelId',verifyAdmin, deleteRoom)
route.delete('/availability/delete/:id',verifyAdmin, deleteAvailabiltyRoom)
//GET
route.get('/:id/:hotelid', getOneRoom)
//GETALL
route.get('/', getAllRoom)



module.exports = route