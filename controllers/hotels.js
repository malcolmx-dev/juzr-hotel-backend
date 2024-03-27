const Hotels = require("../model/Hotels")
const Room = require("../model/Room")
const User = require("../model/User")


const createHotel = async (req, res, next) => {
    const newHotel = new Hotels(req.body)
    
    try{
        
        const savedHotel= await newHotel.save()
        await User.findByIdAndUpdate(req.params.userId, {$set: {
            
            hotelId: savedHotel._id
        }}, {$new:true})
        res.status(200).json(savedHotel)
        
    }catch(err){
        next(err)
    }
}

const updateHotel = async (req, res, next) => {
    try{
        const updatedHotel = await Hotels.findByIdAndUpdate(req.params.id, {$set: req.body}, {$new:true})
        res.status(200).json(updatedHotel)
    }catch{
        next(err)
    }
}

const deleteHotel = async (req, res, next) => {
    try{
        await Hotels.findByIdAndDelete(req.params.id)
        res.status(200).json('Hotel deleted')
    }catch{
        next(err)
    }
}

const getOneHotel = async (req, res, next) => {
    try{
        const hotel = await Hotels.findById(req.params.id)
        res.status(200).json(hotel)
    }catch(err){
        next(err)
    }
}

const getAllHotel = async (req, res, next) => {
    const {min, max, ...others}= req.query
    try{
        const hotels = await Hotels.find({
            ...others,
            cheapestPrice: {$gt: min | 0, $lt: max || 60000},
        }).limit(req.query.limit)
        res.status(200).json(hotels)
    }catch(err){
        next(err)
    }
}

const countByIsland = async (req, res, next) => {
    const islands= req.query.islands.split(",")
    try{
        const list = await Promise.all(islands.map(island => {
            return Hotels.countDocuments({island:island})
        }))
        res.status(200).json(list)
    }catch(err){
        next(err)
    } 
}

const countByType = async (req, res, next) => {
    try{
    const hotelCount= await Hotels.countDocuments({type:'Hotel'})
    const villaCount= await Hotels.countDocuments({type:'Villa'})
    const bungalowCount= await Hotels.countDocuments({type:'Bungalow'})
    const appartmentCount= await Hotels.countDocuments({type:'Appartement'})

        res.status(200).json([
            {type:'Hotel', count:hotelCount},
            {type:'Villa', count:villaCount},
            {type:'Bungalow', count:bungalowCount},
            {type:'Appartement', count:appartmentCount}]
        )
    }catch(err){
        next(err)
    } 
}

const getHotelRooms = async (req, res, next) => {
    try{
        const hotel = await Hotels.findById(req.params.id)
        const rooms = await Promise.all(hotel.room.map((room) => {
            return Room.findById(room)
        }))
        res.status(200).json(rooms)
        
    }catch(err){
        next(err)
    }
}
const getHotelName = async (req, res, nest) => {
    const pattern=req.params.value
    try{
        const test= await Hotels.find( { city: { $regex: pattern, $options: 'i'}} )
        res.json(test)

    }catch{

    }
}

module.exports= {createHotel, updateHotel, deleteHotel, getOneHotel, getAllHotel, countByIsland, countByType, getHotelRooms, getHotelName}