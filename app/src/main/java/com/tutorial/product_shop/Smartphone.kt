package com.tutorial.product_shop

class Smartphone(val brand:String, val color:String, val model:String, _id:String,
                       name:String, price: Long, qte: Int) : Product(_id, name, price, qte){
}