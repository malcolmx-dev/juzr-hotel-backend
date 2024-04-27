const express = require('express')
const route = express.Router()
const { createRoom, updateRoom, deleteRoom, getOneRoom, getAllRoom, updateAvailabiltyRoom, deleteAvailabiltyRoom, cancelAvailabiltyRoom } = require('../controllers/rooms')
const { verifyAdmin } = require('../utils/verifyToken')

//POST
route.post("/:hotelId", verifyAdmin, createRoom)
//UPDATE
route.put('/:id',verifyAdmin, updateRoom)
route.put('/availability/:id', updateAvailabiltyRoom)
route.put('/availability/cancel/:id', cancelAvailabiltyRoom)


//DELETE
route.delete('/:id/:hotelId',verifyAdmin, deleteRoom)
route.delete('/availability/delete/:id',verifyAdmin, deleteAvailabiltyRoom)
//GET
route.get('/:id', getOneRoom)
//GETALL
route.get('/', getAllRoom)



module.exports = route