package com.tutorial.product_shop

class Pack(var smartphoneList:MutableMap<Smartphone,Int>, _id:String, name: String, price: Long, qte: Int): Product(_id, name,
    price, qte) {

    fun addSmartphone(s:Smartphone,qtePhone:Int) = smartphoneList.put(s,qtePhone)
}