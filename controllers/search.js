const Hotels = require("../model/Hotels")
const Search = require("../model/Search")

const getDestination = async (req, res, next) => {
    const pattern=req.params.value
    try{
        const destination= await Search.find( { city: { $regex: pattern, $options: 'i'}} )
        


        res.json(destination)
        

    }catch(err){
        next(err)
    }
}
const getHotelName = async (req, res, next) => {
    const pattern=req.params.value
    try{
        const hotel= await Hotels.find( { name: { $regex: pattern, $options: 'i'}} )
        


        res.json(hotel)
        

    }catch(err){
        next(err)
    }
}

module.exports= {getDestination, getHotelName}