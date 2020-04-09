const assert = require('assert')
const mongoose = require('mongoose')
const Pack = require('../models/pack')
const Smartphone = require('../models/smartphone')
const Order = require('../models/order')

describe('Saving products to database', function(){
    
    before(function(done){
        mongoose.connection.collections.smartphones.drop(function(){
            mongoose.connection.collections.packs.drop(function(){
                mongoose.connection.collections.orders.drop(function(){
                    done()
                })
            })
        })
    })

    const product0 = new Smartphone({
        name: 'TestS00',
        price: 11.1,
        qte: 5,
        brand: 'TestS01',
        color: 'TestS02',
        model: 'TestS03'
    })

    const product1 = new Smartphone({
        name: 'TestS10',
        price: 11.1,
        qte: 5,
        brand: 'TestS11',
        color: 'TestS12',
        model: 'TestS13'
    })

    const product2 = new Smartphone({
        name: 'TestS20',
        price: 11.1,
        qte: 5,
        brand: 'TestS21',
        color: 'TestS22',
        model: 'TestS23'
    })

    const product3 = new Pack({
        name: 'TestP00',
        price: 11.1,
        qte: 5,
        giftName: 'TestP01',
        giftQte: 1,
        smartphoneList: [
            {
                smartphone: product0,
                quantity: 1
            },
            {
                smartphone: product1,
                quantity: 2                
            },
            {
                smartphone: product2,
                quantity: 3
            }
        ]
    })

    const order1 = new Order({
        num: 1,
        date: '2020-04-09',
        orderList: [
            {
                smartphone: product0,
                qteOrder: 1
            },
            {
                pack: product3,
                qteOrder: 2
            }
        ],
        amount: 11.1
    })

    const order2 = new Order({
        num: 2,
        date: '2020-04-03',
        orderList: [
            {
                smartphone: product1,
                qteOrder: 1
            },
            {
                smartphone: product2,
                qteOrder: 2
            }],
        amount: 11.1
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