package com.tutorial.product_shop

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_detail.*

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
            val intent = Intent(this, OrderSuccessActivity::class.java)
            startActivity(intent)
        }

    }
}
