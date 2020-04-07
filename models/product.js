const mongoose = require('mongoose')
const Schema = mongoose.Schema

const smartphoneSchema = new Schema({
    brand: {type: String, required: true},
    color: {type: String, required: true},
    model: {type: String, require: true}
})

const packSchema = new Schema({
    giftName: {type: String, required: true},
    giftQte: {type: Number, required: true},
    smartphoneList: [{
        smartPhone: smartphoneSchema,
        quantity: Number
    }]
})

const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    qte: {type: Number, required: true},
    smartPhone: smartphoneSchema,
    pack: packSchema
})

const Product = mongoose.model('product', productSchema)

module.exports = Product