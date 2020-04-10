const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*const orderSchema = new Schema({
    num: {type: Number, required: true},
    date: {type: Date, required: true},
    orderList: {type: [{
        name: {type: String, required: true},
        price: {type: Number, required: true},
        qte: {type: Number, required: true},
        brand: String,
        color: String,
        model: String,
        giftName: String,
        giftQte: Number,
        smartphoneList: [{
            smartphone: SmartPhone.schema,
            quantity: Number
        }],
        qteOrder: {type: Number, required: true}
    }], required: true},
    amount: {type: Number, required: true}
})*/

const orderSchema = new Schema({
    num: {type: Number, required: true},
    date: {type: Date, required: true},
    orderList: {type: [{
        productType: {type: String, required: true},
        name: {type: String, required: true},
        price: {type: Number, required: true},
        qte: {type: Number, required: true},
        brand: String,
        color: String,
        model: String,
        giftName: String,
        giftQte: Number,
        smartphoneList: [{
            name: {type: String, required: true},
            price: {type: Number, required: true},
            qte: {type: Number, required: true},
            brand: String,
            color: String,
            model: String,
            quantity: Number
        }],
        qteOrder: {type: Number, required: true}
    }], required: true},
    amount: {type: Number, required: true}
})

const Order = mongoose.model('order', orderSchema)

module.exports = Order