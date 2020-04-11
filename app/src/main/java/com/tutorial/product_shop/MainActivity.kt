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

    private var _orderLines:MutableList<OrderLine> = mutableListOf()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        recyclerView.layoutManager = LinearLayoutManager(this)

        loadData()
    }

    private fun loadData() {

        val url = "http://10.0.2.2:3000/api/products"
        val request = Request.Builder().url(url).build()
        val client = OkHttpClient()
        client.newCall(request).enqueue(object: Callback{
            override fun onResponse(call: Call, response: Response) {
                val body = response.body?.string()
                try{
                    val allProducts = JSONArray(body)
                    for(i in 0 until allProducts.length()){

                        try{
                            when((allProducts[i] as JSONObject).get("productType")){
                                "Smartphone" -> _orderLines.add(OrderLine(Smartphone((allProducts[i] as JSONObject).getString("brand"), (allProducts[i] as JSONObject).getString("color"),
                                    (allProducts[i] as JSONObject).getString("model"), (allProducts[i] as JSONObject).getString("_id"), (allProducts[i] as JSONObject).getString("name"),
                                    (allProducts[i] as JSONObject).getLong("price"), (allProducts[i] as JSONObject).getInt("qte"))))
                                "Pack" -> {
                                    val smartphoneListJSON = (allProducts[i] as JSONObject).getJSONArray("smartphoneList")
                                    val smartphoneList:MutableMap<Smartphone,Int> = mutableMapOf()
                                    for(j in 0 until smartphoneListJSON.length())
                                        smartphoneList.put(Smartphone((smartphoneListJSON[j] as JSONObject).getString("brand"), (smartphoneListJSON[j] as JSONObject).getString("color"),
                                            (smartphoneListJSON[j] as JSONObject).getString("model"), (smartphoneListJSON[j] as JSONObject).getString("_id"), (smartphoneListJSON[j] as JSONObject).getString("name"),
                                            (smartphoneListJSON[j] as JSONObject).getLong("price"), (smartphoneListJSON[j] as JSONObject).getInt("qte")), (smartphoneListJSON[j] as JSONObject).getInt("quantity"))
                                    _orderLines.add(OrderLine(Pack((allProducts[i] as JSONObject).getString("giftName"), (allProducts[i] as JSONObject).getInt("giftQte"), smartphoneList ,(allProducts[i] as JSONObject).getString("_id"),
                                        (allProducts[i] as JSONObject).getString("name"), (allProducts[i] as JSONObject).getLong("price"), (allProducts[i] as JSONObject).getInt("qte"))))
                                }
                            }
                        }catch(ex: Exception){
                            println(ex.message)
                        }

                    }
                    println("Products loaded")
                    runOnUiThread{
                        recyclerView.adapter = ProductAdapter(this@MainActivity,_orderLines)
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
