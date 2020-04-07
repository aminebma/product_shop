const assert = require('assert')
const Product = require('../models/product')

describe('Finding records from database', function(){

    it('Finds all products on database', function(done){
        let i = 0
        const names = ['TestS00', 'TestS10', 'TestS20', 'TestP00']
        Product.find({}).then(function(result){
            result.forEach(function(item){
                console.log(`Product name found: ${item.name}\nProduct name expected: ${names[i]}\n`)
                assert(item.name === names[i])
                i++
            })
            done()
        })
    })

    it('Finds one product on database', function(done){
        Product.findOne({name:'TestS00'}).then(function(result){
            assert(result.name === 'TestS00')
            done()
        })
    })

})