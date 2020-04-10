const mongoose = require('mongoose')
const Schema = mongoose.Schema

const smartphoneSchema = new Schema({
    productType: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    qte: {type: Number, required: true},
    brand: {type: String, required: true},
    color: {type: String, required: true},
    model: {type: String, require: true}
})

const Smartphone = mongoose.model('smartphone', smartphoneSchema)

module.exports = Smartphone