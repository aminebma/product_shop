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

    const product0 = new Product({
        name: 'TestS00',
        price: 11.1,
        qte: 5,
        smartPhone: {
            brand: 'TestS01',
            color: 'TestS02',
            model: 'TestS03'
        }
    })

    const product1 = new Product({
        name: 'TestS10',
        price: 11.1,
        qte: 5,
        smartPhone: {
            brand: 'TestS11',
            color: 'TestS12',
            model: 'TestS13'
        }
    })

    const product2 = new Product({
        name: 'TestS20',
        price: 11.1,
        qte: 5,
        smartPhone: {
            brand: 'TestS21',
            color: 'TestS22',
            model: 'TestS23'
        }
    })

    const product3 = new Product({
        name: 'TestP00',
        price: 11.1,
        qte: 5,
        pack: {
            giftName: 'TestP01',
            giftQte: 1,
            smartphoneList: [
                {
                    _id: product0._id,
                    brand: 'TestS01',
                    color: 'TestS02',
                    model: 'TestS03',
                    quantity: 1
                },
                {
                    _id: product1._id,
                    brand: 'TestS11',
                    color: 'TestS12',
                    model: 'TestS13',
                    quantity: 2
                },
                {
                    _id: product2._id,
                    brand: 'TestS21',
                    color: 'TestS22',
                    model: 'TestS23',
                    quantity: 3
                }
            ]
        }
    })

    const order1 = new Order({
        num: 1,
        date: '2020-04-09',
        products: [product0,product3]
    })

    const order2 = new Order({
        num: 2,
        date: '2020-04-03',
        products: [product1,product2]
    })

    it('Saves a smartphone to the database', function(done){

        product0.save().then(function(){
            product1.save().then(function(){
                product2.save().then(function(){
                    assert(product0.isNew===false && product1.isNew === false && product2.isNew === false)
                    done()
                })
            })
        })

    })

    it('Saves a pack to the database', function(done){
        
        product3.save().then(function(){
            assert(product3.isNew === false)
            done()
        })

    })

    it('Saves an order to the database', function(done){

        order1.save().then(function(){
            order2.save().then(function(){
                assert(order1.isNew === false && order2.isNew === false)
                done()
            })
        })

    })

})