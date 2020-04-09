const express = require('express')
const app = express()
const mongoose = require('mongoose')
const apiController = require('./controllers/apiController')
const config = require('./config')

const port = process.env.PORT || 3000

mongoose.connect(config.getDbConnectionString(), {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open',function(){
    console.log('Successfully connected to the database')
}).on('error', function(error){
    console.log('Failed to login to the database.\n',error)
})

apiController(app)

app.listen(port, '127.0.0.1')