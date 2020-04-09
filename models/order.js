const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SmartPhone = require('./smartphone')
const Pack = require('./pack')

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
        smartphone: SmartPhone.schema,
        pack: Pack.schema,
        qteOrder: {type: Number, required: true}
    }], required: true},
    amount: {type: Number, required: true}
})

const Order = mongoose.model('order', orderSchema)

module.exports = Order