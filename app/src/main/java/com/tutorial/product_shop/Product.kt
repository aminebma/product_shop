package com.tutorial.product_shop

import java.io.Serializable

open class Product(val _id:String, val name:String, val price:Long, val qte:Int):Serializable {
}