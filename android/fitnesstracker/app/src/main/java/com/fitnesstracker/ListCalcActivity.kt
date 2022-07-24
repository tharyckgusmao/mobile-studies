package com.fitnesstracker

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class ListCalcActivity : AppCompatActivity() {
    lateinit var rvMain: RecyclerView;

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_list_calc_acitivy)

        val extras: Bundle? = intent.extras;

        if(extras != null){
            val type = extras.getString("type");

            val registers: List<Register> = SqlHelper(this).getRegisterBy(type);

            rvMain = findViewById(R.id.recycler_view_list);
            rvMain.layoutManager = LinearLayoutManager(this)
            rvMain.adapter = MainAdapter(registers, this);
        }
    }
private class MainAdapter(
    private val mainItems: List<Register>,
    private val context: Context
): RecyclerView.Adapter<MainAdapter.MainViewHolder>(){
    inner class MainViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        fun bind(item: Register) {

            val textView = itemView.findViewById<TextView>(R.id.title_item);
            val responseView = itemView.findViewById<TextView>(R.id.title_response);
            val dateView = itemView.findViewById<TextView>(R.id.title_date);
            textView.text = item.type;
            responseView.text = item.response.toString();
            dateView.text = item.createdDate;

        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {
        return MainViewHolder(LayoutInflater.from(context).inflate(R.layout.main_register,parent,false))
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        var mainItemCurrent = mainItems.get(position)
        holder.bind(mainItemCurrent)
    }

    override fun getItemCount(): Int {
        return mainItems.size
    }




}
}