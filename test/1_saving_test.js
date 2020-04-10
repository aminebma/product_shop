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

    const smartphone0 = new Smartphone({
        productType: 'Smartphone',
        name: 'Galaxy S20',
        price: 150000,
        qte: 12,
        brand: 'Samsung',
        color: 'Blanc',
        model: 'G980'
    })

    const smartphone1 = new Smartphone({
        productType: 'Smartphone',
        name: 'iPhone 11',
        price: 180000,
        qte: 7,
        brand: 'Apple',
        color: 'Noir',
        model: 'AX11000'
    })

    const smartphone2 = new Smartphone({
        productType: 'Smartphone',
        name: 'iPhone 11S',
        price: 200000,
        qte: 7,
        brand: 'Apple',
        color: 'Rouge',
        model: 'AX11001'
    })
    
    const smartphone3 = new Smartphone({
        productType: 'Smartphone',
        name: '8T',
        price: 130000,
        qte: 15,
        brand: 'One Plus',
        color: 'RouBleuge',
        model: 'OP5101'
    })

    
    const smartphone4 = new Smartphone({
        productType: 'Smartphone',
        name: 'Mate 30 Pro',
        price: 110000,
        qte: 15,
        brand: 'Huawei',
        color: 'Gold',
        model: 'H99'
    })
    const pack0 = new Pack({
        productType: 'Pack',
        name: 'Pack de fin d\'année',
        price: 300000,
        qte: 5,
        giftName: 'Spécial promo',
        giftQte: 5,
        smartphoneList: [
            {
                name: 'iPhone 11',
                price: 180000,
                qte: 7,
                brand: 'Apple',
                color: 'Noir',
                model: 'AX11000',
                quantity: 2
            }
        ]
    })
    
    const pack1 = new Pack({
        productType: 'Pack',
        name: 'Pack de printemps',
        price: 700000,
        qte: 5,
        giftName: 'Spécial promo',
        giftQte: 5,
        smartphoneList: [
            {
                name: 'iPhone 11S',
                price: 200000,
                qte: 7,
                brand: 'Apple',
                color: 'Rouge',
                model: 'AX11001',
                quantity: 2
            },
            {
                name: 'Mate 30 Pro',
                price: 110000,
                qte: 15,
                brand: 'Huawei',
                color: 'Gold',
                model: 'H99',
                quantity: 3                
            }
        ]
    })

    const pack2 = new Pack({
        productType: 'Pack',
        name: 'Pack rentrée',
        price: 500000,
        qte: 12,
        giftName: 'Spécial promo',
        giftQte: 12,
        smartphoneList: [
            {
                name: 'Galaxy S20',
                price: 150000,
                qte: 12,
                brand: 'Samsung',
                color: 'Blanc',
                model: 'G980',

                quantity: 2
            },
            {
                name: 'iPhone 11',
                price: 180000,
                qte: 7,
                brand: 'Apple',
                color: 'Noir',
                model: 'AX11000',
                quantity: 3                
            }
        ]
    })

    const order1 = new Order({
        num: 1,
        date: '2020-04-09',
        orderList: [
            {
                productType: 'Smartphone',
                name: 'Galaxy S20',
                price: 150000,
                qte: 12,
                brand: 'Samsung',
                color: 'Blanc',
                model: 'G980',
                qteOrder: 1
            },
            {
                productType: 'Pack',
                name: 'Pack rentrée',
                price: 500000,
                qte: 12,
                giftName: 'Spécial promo',
                giftQte: 12,
                smartphoneList: [
                    {
                        name: 'Galaxy S20',
                        price: 150000,
                        qte: 12,
                        brand: 'Samsung',
                        color: 'Blanc',
                        model: 'G980',
                        quantity: 2
                    },
                    {
                        name: 'iPhone 11',
                        price: 180000,
                        qte: 7,
                        brand: 'Apple',
                        color: 'Noir',
                        model: 'AX11000',
                        quantity: 3                
                    }
                ],
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
                productType: 'Smartphone',
                name: 'iPhone 11',
                price: 180000,
                qte: 7,
                brand: 'Apple',
                color: 'Noir',
                model: 'AX11000',
                qteOrder: 1
            },
            {
                productType: 'Smartphone',
                name: 'iPhone 11S',
                price: 200000,
                qte: 7,
                brand: 'Apple',
                color: 'Rouge',
                model: 'AX11001',
                qteOrder: 2
            }],
        amount: 11.1
    })

    it('Saves a smartphone to the database', function(done){

        smartphone0.save().then(function(){
            smartphone1.save().then(function(){
                smartphone2.save().then(function(){
                    smartphone3.save().then(function(){
                        smartphone4.save().then(function(){
                            assert(smartphone0.isNew===false && smartphone1.isNew === false && smartphone2.isNew === false
                                    && smartphone3.isNew===false && smartphone4.isNew===false)
                            done()
                        })
                    })
                })
            })
        })

    })

    it('Saves a pack to the database', function(done){
        
        pack0.save().then(function(){
            pack1.save().then(function(){
                pack2.save().then(function(){
                    assert(pack0.isNew === false && pack1.isNew===false && pack2.isNew===false)
                    done()
                })
            })
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