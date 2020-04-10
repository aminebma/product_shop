const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Smartphone = require('./smartphone')

const packSchema = new Schema({
    productType: {type: String, required:true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    qte: {type: Number, required: true},
    giftName: {type: String, required: true},
    giftQte: {type: Number, required: true},
    smartphoneList: [{
        name: {type: String, required: true},
        price: {type: Number, required: true},
        qte: {type: Number, required: true},
        brand: {type: String, required: true},
        color: {type: String, required: true},
        model: {type: String, require: true},
        quantity: {type: Number, require: true}
    }]
})

const Pack = mongoose.model('pack', packSchema)

module.exports = Pack

