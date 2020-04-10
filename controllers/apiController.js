const Smartphone = require('../models/smartphone')
const Pack = require('../models/pack')
const Order = require('../models/order')
const bodyParser = require('body-parser')

module.exports = function(app){

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))

    app.get('/api/products', function(req, res){
        let productsList = []
        try{
            Smartphone.find({}, function(err, smartphones){
                if(err) throw err
                productsList.push(smartphones)
            }).then(function(){
                Pack.find({}, function(err, packs){
                    if(err) throw err
                    productsList.push(packs)
                    res.send(productsList)
                })
            })
        }
        catch(err){
            console.log(`Une erreur est survenue en récupérant les produits:\n${err}`)
        }
    })

    app.get('/api/products/smartphones', function(req, res){
        try{
            Smartphone.find({}, function(err, smartphones){
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
            Pack.find({}, function(err, packs){
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
            Smartphone.findById({_id: req.params.id}, function(err, smartphone){
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
            Pack.findById({_id: req.params.id}, function(err, pack){
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
            products: req.body.products,
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