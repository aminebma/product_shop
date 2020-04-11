const assert = require('assert')
const Product = require('../models/product')
const Order = require('../models/order')

describe('Finding records from database', function(){

    it('Finds all products on database', function(done){
        let i = 0
        const names = ['Galaxy S20', 'iPhone 11', 'iPhone 11S', '8T','Mate 30 Pro', 'Pack de fin d\'année', 'Pack de printemps', 'Pack rentrée']
        Product.find({}).then(function(result){
            result.forEach(function(item){
                console.log(`Product name found: ${item.name}\nProduct name expected: ${names[i]}\n`)
                assert(item.name === names[i])
                i++
            })
            done()
        })
    })

    it('Finds one smartphone on database', function(done){

        Product.findOne({productType: 'Smartphone',name:'Galaxy S20'}).then(function(result){
            assert(result.name === 'Galaxy S20' && result.productType === 'Smartphone')
            done()
        })

    })

    it('Finds one pack on database', function(done){

        Product.findOne({productType: 'Pack', name:'Pack rentrée'}).then(function(result){
            assert(result.name === 'Pack rentrée' && result.productType === 'Pack')
            done()
        })

    })

    it('Finds all orders on database', function(done){

        let i = 0
        const orders = [125000, 45000]
        Order.find({}).then(function(result){
            result.forEach(function(item){
                console.log(`Order amount found: ${item.date}\nOrder amount expected: ${orders[i]}\n`)
                assert(item.amount === orders[i])
                i++
            })
            done()
        })

    })

    it('Finds one order on database', function(done){

        Order.findOne({amount: 125000}).then(function(result){
            assert(result.amount === 125000)
            done()
        })

    })

})