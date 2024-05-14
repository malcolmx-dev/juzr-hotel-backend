const mongoose= require('mongoose')

var monthlyEarn = new mongoose.Schema({ 
    name: String,
    year: Number,
    months:[{
        month: Number,
        earn:Number,
        userCount: Array,
        dateCount: Array
    }],
 });
module.exports = mongoose.model('MonthlyEarn', monthlyEarn);