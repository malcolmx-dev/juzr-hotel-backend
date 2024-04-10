const express = require('express')
const route= express.Router()
const { getDestination, getHotelName } = require("../controllers/search");



route.get('/:value', getDestination )
route.get('/hotel/:value', getHotelName )

module.exports = route