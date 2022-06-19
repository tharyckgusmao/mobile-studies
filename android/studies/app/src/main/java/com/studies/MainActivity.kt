package com.studies

import android.content.Context
import android.content.SharedPreferences
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.*
import androidx.core.content.ContextCompat

class MainActivity : AppCompatActivity() {

    var btnNotify: Button? = null;
    var editMinutes: EditText? = null;
    lateinit var timerPicker: TimePicker;

    var interval: Int = 0;
    var minute: Int = 0;
    var hour: Int = 0;

    var toggleButton: Boolean=false;

    lateinit var preferences: SharedPreferences;

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btnNotify = findViewById<Button>(R.id.btn_notify);
        editMinutes = findViewById<EditText>(R.id.edit_txt_number_interval);
        timerPicker = findViewById<TimePicker>(R.id.time_picker);

        timerPicker?.setIs24HourView(true)
        preferences = getSharedPreferences("db", MODE_PRIVATE);

        toggleButton = preferences?.getBoolean("activated",false);
        if(toggleButton){
            btnNotify?.setText(R.string.pause);
            btnNotify?.setBackgroundColor(ContextCompat.getColor(this,android.R.color.black));

            val interval =  preferences?.getInt("interval",0);
            val minute = preferences?.getInt("hour", timerPicker.getCurrentHour());
            val hour =  preferences?.getInt("minute", timerPicker.getCurrentMinute());
            editMinutes?.setText(interval.toString())
            timerPicker.setCurrentHour(hour)
            timerPicker.setCurrentMinute(minute)

        }
    }

    fun notifyClick(view: View) {
        val sInterval = editMinutes?.getText().toString();
        if(sInterval.isEmpty() || sInterval == null){
            Toast.makeText(this,R.string.error_msg,Toast.LENGTH_SHORT).show()
            return;
        }
        hour = timerPicker?.getCurrentHour()!!;
        minute = timerPicker?.getCurrentMinute()!!
        interval = Integer.parseInt(sInterval);
        val editor: SharedPreferences.Editor? = preferences?.edit();

        if(!toggleButton){

        btnNotify?.setText(R.string.pause);
        btnNotify?.setBackgroundColor(ContextCompat.getColor(this,android.R.color.black))
        toggleButton=true;

        editor?.putBoolean("activated",true);
        editor?.putInt("interval", interval);
        editor?.putInt("hour", hour);
        editor?.putInt("minute", minute);
        editor?.apply();


    }else{
        btnNotify?.setText(R.string.notify);
        btnNotify?.setBackgroundColor(ContextCompat.getColor(this,android.R.color.holo_green_light))
        toggleButton=false;

        editor?.putBoolean("activated",false);
        editor?.remove("interval");
        editor?.remove("hour");
        editor?.remove("minute");
        editor?.apply();
    }


        Log.d("Test",hour.toString()+" "+minute.toString()+" "+interval.toString())

    }
}