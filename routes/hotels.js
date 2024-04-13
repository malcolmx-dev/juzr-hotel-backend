const express = require('express')
const route = express.Router()
const { createHotel, updateHotel, deleteHotel, getOneHotel, getAllHotel, countByIsland, countByType, getHotelRooms, sortHotels } = require('../controllers/hotels')
const { verifyAdmin } = require('../utils/verifyToken')

//POST
route.post("/:userId",verifyAdmin, createHotel)

//UPDATE
route.put('/:id',verifyAdmin, updateHotel)
//DELETE
route.delete('/:id',verifyAdmin, deleteHotel)
//GET
route.get('/find/:id', getOneHotel)
//GETALL
route.get('/', getAllHotel)
route.get('/countByIsland', countByIsland)
route.get('/countByType', countByType)
route.get('/rooms/:id', getHotelRooms )
route.get('/sort/:type/:value/:order', sortHotels)







module.exports = route