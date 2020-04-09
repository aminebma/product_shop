package com.tutorial.product_shop

class Smartphone(val brand:String, val color:String, val model:String,
                       name:String, price: Long, Qte: Int) : Product(name, price, Qte){

    fun getType():String = "Smartphone"
}