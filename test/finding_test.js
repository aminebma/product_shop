const assert = require('assert')
const Smartphone = require('../models/smartphone')
const Pack = require('../models/pack')
const Order = require('../models/order')

describe('Finding records from database', function(){

    it('Finds all products on database', function(done){

        let i = 0
        const names = ['TestS00', 'TestS10', 'TestS20', 'TestP00']
        Smartphone.find({}).then(function(result){
            result.forEach(function(item){
                console.log(`Product name found: ${item.name}\nProduct name expected: ${names[i]}\n`)
                assert(item.name === names[i])
                i++
            })
            Pack.find({}).then(function(result){
                result.forEach(function(item){
                    console.log(`Product name found: ${item.name}\nProduct name expected: ${names[i]}\n`)
                    assert(item.name === names[i])
                })
                done()
            })
        })

    })

    it('Finds one smartphone on database', function(done){

        Smartphone.findOne({name:'TestS00'}).then(function(result){
            assert(result.name === 'TestS00')
            done()
        })

    })

    it('Finds one pack on database', function(done){

        Pack.findOne({name:'TestP00'}).then(function(result){
            assert(result.name === 'TestP00')
            done()
        })

    })

    it('Finds all orders on database', function(done){

        let i = 1
        Order.find({}).then(function(result){
            result.forEach(function(item){
                console.log(`Order num found: ${item.num}\nOrder num expected: ${i}\n`)
                assert(item.num === i)
                i++
            })
            done()
        })

    })

    it('Finds one order on database', function(done){

        Order.findOne({num:1}).then(function(result){
            assert(result.num === 1)
            done()
        })

    })

})