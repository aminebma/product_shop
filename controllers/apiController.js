const Product = require('../models/product')
const Order = require('../models/order')
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
            console.log(`Une erreur est survenue en récupérant les produits:\n${err}`)
        }
    })

    app.get('/api/products/smartphones', function(req, res){
        try{
            Product.find({productType: 'Smartphone'}, function(err, smartphones){
                if(err) throw err
                res.send(smartphones)
            })
        }
        catch(err){
            console.log(`Une erreur est survenue en récupérant les produits:\n${err}`)
        }
    })

    app.get('/api/products/packs', function(req, res){
        try{
            Product.find({productType: 'Pack'}, function(err, packs){
                if(err) throw err
                res.send(packs)
            })
        }
        catch(err){
            console.log(`Une erreur est survenue en récupérant les produits:\n${err}`)
        }
    })

    app.get('/api/product/smartphone/:id', function(req, res){
        try{
            Product.findById({_id: req.params.id, productType: 'Smartphone'}, function(err, smartphone){
                if(err) throw err
                res.send(smartphone)
            })
        }
        catch{
            console.log(`Une erreur est survenue en récupérant le produit:\n${err}`)
        }
    })

    app.get('/api/product/pack/:id', function(req, res){
        try{
            Product.findById({_id: req.params.id, productType: 'Pack'}, function(err, pack){
                if(err) throw err
                res.send(pack)
            })
        }
        catch{
            console.log(`Une erreur est survenue en récupérant le produit:\n${err}`)
        }
    })

    /*app.post('/api/product', function(req, res){

        //TODO

        if(req.body.id){
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
        }
        
    })*/

    app.post('api/order', function(req,res){
        const order = new Order({
            num: req.body.num,
            date: req.body.date,
            orderList: req.body.orderList,
            amountPayed: req.body.amountPayed
        })
        try{
            Order.save(function(err){
                if(err) throw err
                res.send('Operation success !')
            })
        }
        catch(err){
            console.log(`Une erreur est survenue lors de l'ajout de la commande:\n${err}`)
        }
    })

}