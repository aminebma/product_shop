package com.tutorial.product_shop

import java.io.Serializable

open class Product(val name:String, val price:Long, val Qte:Int):Serializable {
}