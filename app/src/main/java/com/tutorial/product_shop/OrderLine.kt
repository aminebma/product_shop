package com.tutorial.product_shop

import java.io.Serializable

data class OrderLine(val product: Product, var qteOrder: Int):Serializable