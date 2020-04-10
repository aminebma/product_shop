package com.tutorial.product_shop

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_main.*
import okhttp3.*
import org.json.JSONArray
import org.json.JSONObject
import java.io.IOException

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        recyclerView.layoutManager = LinearLayoutManager(this)

        loadData()
    }

    fun loadData() {

        var data:MutableList<OrderLine> = mutableListOf()

        val url = "http://10.0.2.2:3000/api/products"
        val request = Request.Builder().url(url).build()
        val client = OkHttpClient()
        client.newCall(request).enqueue(object: Callback{
            override fun onResponse(call: Call, response: Response) {
                val body = response?.body?.string()
                println(body)
                try{
                    val jsonObject = JSONArray(body)
                    var products:MutableList<Any> = mutableListOf()

                    for(i in 0 until jsonObject.length())
                        products.add(jsonObject[i])

                    var productsList:MutableList<Any> = mutableListOf()
                    var jsonProducts:JSONArray
                    for(i in 0 until products.size){
                        jsonProducts=JSONArray(products[i].toString())
                        for(j in 0 until jsonProducts.length())
                            productsList.add(jsonProducts[j])
                    }

                    var prod:JSONObject
                    for(i in 0 until productsList.size){
                        prod = JSONObject(productsList[i].toString())
                        when(prod.get("productType")){
                            "Smartphone" -> data.add(OrderLine(Smartphone(prod.getString("brand"), prod.getString("color"),
                                                                prod.getString("model"), prod.getString("_id"), prod.getString("name"),
                                                                prod.getLong("price"), prod.getInt("qte"))))
                            "Pack" -> data.add(OrderLine(Pack(prod.getString("giftName"), prod.getInt("giftQte"), prod.getString("_id"),
                                                                prod.getString("name"), prod.getLong("price"), prod.getInt("qte"))))
                        }
                    }
                    println("Products loaded")
                    runOnUiThread{
                        recyclerView.adapter = ProductAdapter(this@MainActivity,data)
                    }
                }catch (e: Exception){
                    println(e.message)
                }
            }

            override fun onFailure(call: Call, e: IOException) {
                println("Failed to execute request.\n${e}")
            }
        })
    }
}
