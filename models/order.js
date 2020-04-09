const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Product = require('./product')

const orderSchema = new Schema({
    num: {type: Number, required: true},
    date: {type: Date, required: true},
    products: {type: [Product.schema], required: true}
})

const Order = mongoose.model('order', orderSchema)

module.exports = Order