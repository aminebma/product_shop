const assert = require('assert')
const mongoose = require('mongoose')
const Product = require('../models/product')
const Order = require('../models/order')

describe('Saving products to database', function(){
    
    before(function(done){
        mongoose.connection.collections.products.drop(function(){
            mongoose.connection.collections.orders.drop(function(){
                done()
            })
        })
    })

    const smartphone0 = new Product({
        productType: 'Smartphone',
        name: 'Galaxy S20',
        price: 150000,
        qte: 12,
        brand: 'Samsung',
        color: 'Blanc',
        model: 'G980'
    })

    const smartphone1 = new Product({
        productType: 'Smartphone',
        name: 'iPhone 11',
        price: 180000,
        qte: 7,
        brand: 'Apple',
        color: 'Noir',
        model: 'AX11000'
    })

    const smartphone2 = new Product({
        productType: 'Smartphone',
        name: 'iPhone 11S',
        price: 200000,
        qte: 7,
        brand: 'Apple',
        color: 'Rouge',
        model: 'AX11001'
    })
    
    const smartphone3 = new Product({
        productType: 'Smartphone',
        name: '8T',
        price: 130000,
        qte: 15,
        brand: 'One Plus',
        color: 'RouBleuge',
        model: 'OP5101'
    })

    
    const smartphone4 = new Product({
        productType: 'Smartphone',
        name: 'Mate 30 Pro',
        price: 110000,
        qte: 15,
        brand: 'Huawei',
        color: 'Gold',
        model: 'H99'
    })
    const pack0 = new Product({
        productType: 'Pack',
        name: 'Pack de fin d\'année',
        price: 300000,
        qte: 5,
        giftName: 'Spécial promo',
        smartphoneList: [
            {
                name: 'iPhone 11',
                price: 180000,
                brand: 'Apple',
                color: 'Noir',
                model: 'AX11000',
                quantity: 2
            }
        ]
    })
    
    const pack1 = new Product({
        productType: 'Pack',
        name: 'Pack de printemps',
        price: 700000,
        qte: 5,
        smartphoneList: [
            {
                name: 'iPhone 11S',
                price: 200000,
                brand: 'Apple',
                color: 'Rouge',
                model: 'AX11001',
                quantity: 2
            },
            {
                name: 'Mate 30 Pro',
                price: 110000,
                brand: 'Huawei',
                color: 'Gold',
                model: 'H99',
                quantity: 3                
            }
        ]
    })

    const pack2 = new Product({
        productType: 'Pack',
        name: 'Pack rentrée',
        price: 500000,
        qte: 12,
        smartphoneList: [
            {
                name: 'Galaxy S20',
                price: 150000,
                brand: 'Samsung',
                color: 'Blanc',
                model: 'G980',
                quantity: 2
            },
            {
                name: 'iPhone 11',
                price: 180000,
                brand: 'Apple',
                color: 'Noir',
                model: 'AX11000',
                quantity: 3                
            }
        ]
    })

    const products = []
    products.push(smartphone0)
    products.push(smartphone1)
    products.push(smartphone2)
    products.push(smartphone3)
    products.push(smartphone4)
    products.push(pack0)
    products.push(pack1)
    products.push(pack2)

    const order0 = new Order({
        num: 1,
        date: '2020-04-09 18:12:19',
        orderList: [
            {
                productType: 'Smartphone',
                name: 'Galaxy S20',
                price: 150000,
                brand: 'Samsung',
                color: 'Blanc',
                model: 'G980',
                qteOrder: 1
            },
            {
                productType: 'Pack',
                name: 'Pack rentrée',
                price: 500000,
                smartphoneList: [
                    {
                        name: 'Galaxy S20',
                        price: 150000,
                        brand: 'Samsung',
                        color: 'Blanc',
                        model: 'G980',
                        quantity: 2
                    },
                    {
                        name: 'iPhone 11',
                        price: 180000,
                        brand: 'Apple',
                        color: 'Noir',
                        model: 'AX11000',
                        quantity: 3                
                    }
                ],
                qteOrder: 2
            }
        ],
        amount: 125000
    })

    const order1 = new Order({
        num: 2,
        date: '2020-04-03 10:02:01',
        orderList: [
            {
                productType: 'Smartphone',
                name: 'iPhone 11',
                price: 180000,
                brand: 'Apple',
                color: 'Noir',
                model: 'AX11000',
                qteOrder: 1
            },
            {
                productType: 'Smartphone',
                name: 'iPhone 11S',
                price: 200000,
                brand: 'Apple',
                color: 'Rouge',
                model: 'AX11001',
                qteOrder: 2
            }],
        amount: 45000
    })

    const orders = []
    orders.push(order0)
    orders.push(order1)

    it('Saves products to the database', function(done){
        Product.collection.insertMany(products, function(err){
            assert(err === null)
            done()
        })
    })

    it('Saves an order to the database', function(done){
        Order.collection.insertMany(orders, function(err){
            assert(err === null)
            done()
        })
    })

})