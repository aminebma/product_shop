package com.tutorial.product_shop

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_order_status.*

class OrderStatusActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_order_status)
        if(intent.getBooleanExtra("status",false)){
            statusIcon.setImageResource(R.drawable.ic_fill_22)
            statusText.text = "Bon établi avec succés !"
        }else{
            statusIcon.setImageResource(R.drawable.ic_cross)
            statusText.text = "Echec de la commande."
        }

        homeBtn.setOnClickListener{
            val intent = Intent(this,MainActivity::class.java)
            startActivity(intent)
        }
    }

}
