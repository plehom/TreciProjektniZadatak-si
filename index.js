const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()


const MONGO_URI = "mongodb+srv://pleho:sarajevo@cluster0.kqezv.mongodb.net/todo?retryWrites=true&w=majority"

mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


mongoose.connection.on('connected',()=>{
    console.log("USPJESNO")
})

app.use(express.json())

PORT = process.env.PORT || 1312

app.use('/api/todo',require(path.join(__dirname,'routes','api','routes.js')))
app.use(express.static(path.join(__dirname,'public')))

app.listen(PORT,()=>console.log(`Server running at port ${PORT}`))
