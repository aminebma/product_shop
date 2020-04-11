package com.tutorial.product_shop

import java.io.Serializable
import java.util.*

data class Order(val date: String, val orderList:List<OrderLine>):Serializable{
    lateinit var id:String
    var amount:Long = 0
}