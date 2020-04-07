const Product = require('../models/product')
const bodyParser = require('body-parser')

module.exports = function(app){

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))

    app.get('/api/products', function(req, res){
        try{
            Product.find({}, function(err, products){
                if(err) throw err
                res.send(products)
            })
        }
        catch(err){
            console.log('Une erreur est survenue.\n', err)
        }
    })

    app.get('/api/product/:id', function(req, res){
        try{
            Product.findById({_id: req.params.id}, function(err, product){
                if(err) throw err
                res.send(product)
            })
        }
        catch{
            console.log('Une erreur est survenue.\n', err)
        }
    })

    app.post('/api/product', function(req, res){

        //TODO

        /*if(req.body.id){
            Product.findByIdAndUpdate(req.body.id, 
                {
                    //TODO

                }, function(err,todo){
                    if(err) throw err
                    res.send('Update: Success !')
                })
        }
        else{
            const newProduct = Product({
                //TODO
            })
            newTodo.save(function(err){
                if(err) throw err
                res.send('Insertion: Success !')
            })
        }*/
        
    })
}