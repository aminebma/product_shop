const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    date: {type: Date, required: true},
    orderList: {type: [{
        productType: {type: String, required: true},
        name: {type: String, required: true},
        price: {type: Number, required: true},
        brand: String,
        color: String,
        model: String,
        smartphoneList: [{
            name: {type: String, required: true},
            price: {type: Number, required: true},
            quantity: {type: Number, required: true},
            brand: String,
            color: String,
            model: String,
        }],
        qteOrder: {type: Number, required: true}
    }], required: true},
    amount: {type: Number, required: true}
})

const Order = mongoose.model('order', orderSchema)

module.exports = Order