const createError = require('../utils/error')
const Room= require("../model/Room")
const Hotels= require("../model/Hotels")


const createRoom = async(req, res, next) => {
    const hotelId= req.params.hotelId
    const newRoom= new Room(req.body)
    try{
        const savedRoom = await newRoom.save()
        try{
            await Hotels.findByIdAndUpdate(hotelId, {
                $push : {room: savedRoom._id}
            })
        }catch(err){
            next(err)
        }
        res.status(200).json(savedRoom)
    }catch(err){
        next(err)
    }
}
const updateRoom = async (req, res, next) => {
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {$new:true})
        res.status(200).json(updatedRoom)
    }catch{
        next(err)
    }
}
const updateAvailabiltyRoom = async (req, res, next) => {
    try{
        await Room.updateOne(
            {   "roomNumbers._id": req.params.id   },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                }
            }
            )
        res.status(200).json("Room status has been updated.")
    }catch(err){
        next(err)
    }
}
const deleteAvailabiltyRoom = async (req, res, next) => {
    try{
        await Room.updateOne(
            {   "roomNumbers._id": req.params.id   },
            {
                $pull: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                }
            }
            )
        res.status(200).json("Room status has been deleted.")
    }catch(err){
        res.json(error)
    }
}

const deleteRoom = async (req, res, next) => {
    const hotelId= req.params.hotelId
    try{
        await Room.findByIdAndDelete(req.params.id)
        res.status(200).json('Room deleted')
        try{
            await Hotels.findByIdAndUpdate(hotelId, {
                $pull : {room: req.params.id}
            })
        }catch(err){
            next(err)
        }
    }catch{
        next(err)
    }
}

const getOneRoom = async (req, res, next) => {
    try{
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    }catch{
        next(err)
    }
}

const getAllRoom = async (req, res, next) => {
    try{
        const rooms = await Room.find()
        res.status(200).json(rooms)
    }catch{
        next(err)
    }
}

module.exports= {createRoom, updateRoom,updateAvailabiltyRoom, deleteAvailabiltyRoom, deleteRoom, getOneRoom, getAllRoom}