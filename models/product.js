const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    productType: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    qte: {type: Number, required: true},
    brand: String,
    color: String,
    model: String,
    smartphoneList: [{
        name: {type: String, required: true},
        price: {type: Number, required: true},
        qte: {type: Number, required: true},
        brand: String,
        color: String,
        model: String,
        quantity: Number
    }]
})

const Product = mongoose.model('product', productSchema)

module.exports = Product