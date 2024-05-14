const express= require('express')
const mongoose= require('mongoose')
const path = require('path')
const hotelsRoutes = require('./routes/hotels')
const authRoutes = require('./routes/auth')
const authAdminRoutes = require('./routes/authAdmin')
const userRoutes = require('./routes/user')
const roomRoutes = require('./routes/rooms')
const searchRoutes = require('./routes/search')
const earnRoutes = require('./routes/earn')





const cors = require("cors");
var cookies = require("cookie-parser");



const app= express()


app.use(cookies());

mongoose.connect('mongodb+srv://juzr_hotel:3xWcwG2FreRYE6CV@cluster0.vbr9p2z.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'https://malcolmx-dev.github.io'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
    
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
  });

app.use(express.static(path.join(__dirname, 'public')))


app.use('/api/hotels', hotelsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/authAdmin', authAdminRoutes)
app.use('/api/user', userRoutes)
app.use("/api/rooms", roomRoutes)
app.use("/api/search", searchRoutes)
app.use("/api/earn", earnRoutes)




app.use((err, req, res, next) => {
    const errorStatus= err.status||500
    const errorMessage= err.message||"Something went wrong !"
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack
    })

})

module.exports= app