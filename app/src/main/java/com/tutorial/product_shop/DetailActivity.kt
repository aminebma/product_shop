package com.tutorial.product_shop

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import kotlinx.android.synthetic.main.activity_detail.*
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONArray
import org.json.JSONObject
import java.io.IOException

class DetailActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail)

        val order = intent.getSerializableExtra("order") as Order
        for(item in order.orderList)
            order.amount += item.qteOrder*item.product.price

        montantFacture.text = order.amount.toString() + " DA"

        montantVersement.addTextChangedListener(object: TextWatcher {
            override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
            }

            override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {}

            override fun afterTextChanged(p0: Editable?) {
                montantRestant.text = (order.amount-Integer.parseInt(montantVersement.text.toString())).toString()
            }
        }

        )

        validateBtn.setOnClickListener {
            var orderData = JSONObject()
            var productData:JSONObject
            var ordersList = JSONArray()
            var product:Product
            orderData.put("date", order.date)
            for(i in order.orderList.indices){
                product=order.orderList[i].product
                productData = JSONObject()
                when(product){
                    is Smartphone->{
                        productData.put("productType", "Smartphone")
                        productData.put("name",product.name)
                        productData.put("price",product.price)
                        productData.put("brand",product.brand)
                        productData.put("color",product.color)
                        productData.put("model",product.model)
                        productData.put("qteOrder", order.orderList[i].qteOrder)
                    }
                    is Pack->{
                        var smartphoneList = JSONArray()
                        var smartphoneData:JSONObject
                        var i = 0
                        productData.put("productType", "Pack")
                        productData.put("name",product.name)
                        productData.put("price",product.price)
                        productData.put("giftName", product.giftName)
                        productData.put("giftQte", product.giftQte)
                        for(smartphone in product.smartphoneList){
                            smartphoneData = JSONObject()
                            smartphoneData.put("name",smartphone.key.name)
                            smartphoneData.put("price",smartphone.key.price)
                            smartphoneData.put("quantity", smartphone.value)
                            smartphoneData.put("brand",smartphone.key.brand)
                            smartphoneData.put("color",smartphone.key.color)
                            smartphoneData.put("model",smartphone.key.model)
                            smartphoneList.put(i, smartphoneData)
                            i++
                        }
                        productData.put("smartphoneList", smartphoneList)
                        productData.put("qteOrder", order.orderList[i].qteOrder)
                    }
                }
                ordersList.put(i,productData)
            }
            orderData.put("orderList", ordersList)
            orderData.put("amount", order.amount)
            var JSON = "application/json; charset=utf-8".toMediaType()
            var url = "http://10.0.2.2:3000/api/order"
            var client = OkHttpClient()
            var body = orderData.toString().toRequestBody(JSON)
            var request = Request.Builder()
                            .url(url)
                            .post(body)
                            .build()

            try{
                client.newCall(request).enqueue(object: Callback{
                    override fun onResponse(call: Call, response: Response) {
                        println(response.body?.string())
                        val intent = Intent(this@DetailActivity, OrderStatusActivity::class.java)
                        if(response.isSuccessful)
                            intent.putExtra("status",true)
                        else
                            intent.putExtra("status", false)
                        startActivity(intent)
                    }

                    override fun onFailure(call: Call, e: IOException) {
                        println("Failed saving the order.\n${e.message}")
                        val intent = Intent(this@DetailActivity, OrderStatusActivity::class.java)
                        intent.putExtra("status",false)
                        startActivity(intent)
                    }
                })

            }catch(e:Exception){
                println(e.message)
            }
        }

    }
}
