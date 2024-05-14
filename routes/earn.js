const express = require('express')
const { verifyUser, verifyAdmin } = require('../utils/verifyToken')
const { createMonthlyEarn, getMonthlyEarn, increaseMonthlyEarn, decreaseMonthlyEarn } = require('../controllers/earn')
const route = express.Router()

//POST
route.post("/", verifyAdmin, createMonthlyEarn)
//UPDATE
route.put('/increase',verifyUser, increaseMonthlyEarn)
route.put('/decrease',verifyAdmin, decreaseMonthlyEarn)

//GET
route.get('/',verifyAdmin, getMonthlyEarn)

module.exports = route