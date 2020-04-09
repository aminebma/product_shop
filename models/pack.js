const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Smartphone = require('./smartphone')

const packSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    qte: {type: Number, required: true},
    giftName: {type: String, required: true},
    giftQte: {type: Number, required: true},
    smartphoneList: [{
        smartphone: Smartphone.schema,
        quantity: Number
    }]
})

const Pack = mongoose.model('pack', packSchema)

module.exports = Pack

