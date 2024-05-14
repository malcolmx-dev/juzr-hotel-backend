const MonthlyEarn = require("../model/MonthlyEarn")

const createMonthlyEarn = async (req, res, next) => {
    const newHotelME= new MonthlyEarn(req.body)
    try{
        const savedHotelME= await newHotelME.save()
        res.status(200).json(savedHotelME)
    }catch(err){
        next(err)
    }
}

const increaseMonthlyEarn = async (req, res, next) => {
    var bulkUpdateOps = [
        {
            "updateOne": {
                "filter": { "name":'Total' },
                "update": { 
                    "$inc": {'months.$[x].earn': req.body.price },
                    "$push": { 
                        'months.$[x].userCount':req.body.user, 
                        'months.$[x].dateCount':req.body.date
                    } 
                },
                "arrayFilters": [
                    {"x.month": req.body.month}
                ]
            }
        },
        {
            "updateOne": {
                "filter": { "name": req.body.name },
                "update": { 
                    "$inc": {'months.$[x].earn': req.body.price },
                    "$push": { 
                        'months.$[x].userCount':req.body.user, 
                        'months.$[x].dateCount':req.body.date
                    } 
                },
                "arrayFilters": [
                    {"x.month": req.body.month}
                ]
            }
        }
    ];
    try{
        
        const updatedHotelME= await MonthlyEarn.bulkWrite(bulkUpdateOps, 
            {"ordered": true, "w": 1}
        )
        
        res.status(200).json(updatedHotelME)

        
    }catch(err){
        next(err)
    }
}
const decreaseMonthlyEarn = async (req, res, next) => {
    var bulkUpdateOps = [
        {
            "updateOne": {
                "filter": { "name":'Total' },
                "update": { 
                    "$inc": {'months.$[x].earn': -req.body.price },
                    "$pull": { 
                        'months.$[x].userCount':req.body.user, 
                        'months.$[x].dateCount':req.body.date
                    } 
                },
                "arrayFilters": [
                    {"x.month": req.body.month}
                ]
            }
        },
        {
            "updateOne": {
                "filter": { "name": req.body.name },
                "update": { 
                    "$inc": {'months.$[x].earn': -req.body.price },
                    "$pull": { 
                        'months.$[x].userCount':req.body.user, 
                        'months.$[x].dateCount':req.body.date
                    } 
                },
                "arrayFilters": [
                    {"x.month": req.body.month}
                ]
            }
        }
    ];
    try{
        
        const updatedHotelME= await MonthlyEarn.bulkWrite(bulkUpdateOps, 
            {"ordered": true, "w": 1}
        )
        
        res.status(200).json(updatedHotelME)

        
    }catch(err){
        next(err)
    }
}
const getMonthlyEarn= async(req, res, next) => {
    try{
        
        const hotelsME= await MonthlyEarn.find()
        res.status(200).json(hotelsME)

        
    }catch(err){
        next(err)
    }
}

module.exports= {createMonthlyEarn, increaseMonthlyEarn, getMonthlyEarn, decreaseMonthlyEarn}