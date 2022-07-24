package com.fitnesstracker

import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.view.inputmethod.InputMethodManager
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.annotation.StringRes
import androidx.appcompat.app.AlertDialog

class ImcActivity : AppCompatActivity() {

    lateinit var editHeight: EditText;
    lateinit var editWeight: EditText;

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_imc)

        editHeight = findViewById(R.id.edit_imc_height)
        editWeight = findViewById(R.id.edit_imc_weight)

        var btnSend = findViewById<Button>(R.id.btn_imc)

        btnSend.setOnClickListener {

            val validForm = validate();
            if (!validForm) {
                Toast.makeText(this, R.string.field_message, Toast.LENGTH_SHORT).show();

            } else {

                val sHeight: String = editHeight.text.toString();
                val sWeight: String = editWeight.text.toString();

                val height: Int = Integer.parseInt(sHeight);
                val weight: Int = Integer.parseInt(sWeight);

                val resultImc: Double = calculateImc(height, weight);

                var imcResponseId = imcResponse(resultImc);


                var dialog =
                    AlertDialog.Builder(this).setTitle(getString(R.string.imc_response, resultImc))
                        .setMessage(imcResponseId).setPositiveButton(android.R.string.ok,
                            { dialogInterface, i ->
                                {

                                }
                            }).setNegativeButton(R.string.save) { _, _ ->
                            run {


                                Thread {
                                    val databaseHandler = SqlHelper(this)
                                    val calcId = databaseHandler.addItem("imc", resultImc)

                                    runOnUiThread {

                                        if (calcId > 0) {
                                            Toast.makeText(this, R.string.saved, Toast.LENGTH_SHORT);
                                            openListCalcActivity()


                                        }

                                    }
                                }.start()

                            }
                        }.create()

                dialog.show()

                val inm: InputMethodManager =
                    getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager;
                inm.hideSoftInputFromWindow(editWeight.windowToken, 0)
                inm.hideSoftInputFromWindow(editHeight.windowToken, 0)

            }

        }

    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.menu,menu)
        return super.onCreateOptionsMenu(menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if(item.itemId == R.id.nmenu_list){
            openListCalcActivity();
            return true
        }
        return super.onOptionsItemSelected(item)
    }

    private fun openListCalcActivity(){
        val intent = Intent(this@ImcActivity,ListCalcActivity::class.java);
        intent.putExtra("type","imc");
        startActivity(intent)
    }
    @StringRes
    private fun imcResponse(imc: Double): Int {

        return when {
            imc < 15 -> R.string.imc_severely_low_weight
            imc < 16 -> R.string.imc_very_low_weight
            imc < 18.5 -> R.string.imc_low_weight
            imc < 25 -> R.string.imc_normal
            imc < 30 -> R.string.imc_high_weight
            imc < 35 -> R.string.imc_so_high_weight
            imc < 40 -> R.string.imc_severely_high_weight
            else -> R.string.imc_extreme_weight
        }

    }

    private fun calculateImc(height: Int, weight: Int): Double {
        return weight / ((height.toDouble() / 100) * (height.toDouble() / 100))
    }

    private fun validate(): Boolean {
        return (!editHeight.text.toString().startsWith("0") && !editWeight.text.toString()
            .startsWith("0") && !editHeight.text.toString()
            .isEmpty() && !editWeight.text.toString().isEmpty()
                )
    }


}