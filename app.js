const express = require('express')
const app = express()
const mongoose = require('mongoose')
const apiController = require('./controllers/apiController')

const port = process.env.PORT || 3000


app.use('/assets', express.static(__dirname + '/public'))

mongoose.connect(config.getDbConnectionString(), {useNewUrlParser: true, useUnifiedTopology: true})
apiController(app)

app.listen(port)