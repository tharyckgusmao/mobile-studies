package com.fitnesstracker

import android.content.Context
import android.content.Intent
import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView

class MainActivity : AppCompatActivity() {


//    lateinit var btnImc: View;

    lateinit var rvMain: RecyclerView;

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val mainItems = arrayListOf<MainItem>();

        mainItems.add(
            MainItem(1,R.drawable.ic_baseline_fitness_center_24,R.string.label_imc,
                Color.GREEN)
        )
        mainItems.add(
            MainItem(2,R.drawable.ic_baseline_fitness_center_24,R.string.label_imc,
                Color.BLUE)
        )


        rvMain = findViewById(R.id.rv_main);
        rvMain.layoutManager = GridLayoutManager(this,2)
        rvMain.adapter = MainAdapter(mainItems,this, object : OnItemClickListener {;
            override fun onClick(id: Int) {
                //Implementar  when
                    val intent = Intent(this@MainActivity, ImcActivity::class.java );
                startActivity(intent)
            }
        });

    }

    private class MainAdapter(
        private val mainItems: ArrayList<MainItem>,
        private val context: Context,
        private val listener: OnItemClickListener
    ): RecyclerView.Adapter<MainAdapter.MainViewHolder>(){
        inner class MainViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

                fun bind(item:MainItem) {

                    val textView = itemView.findViewById<TextView>(R.id.title_item);
                    val iconView = itemView.findViewById<ImageView>(R.id.icon_item);
                    var container = itemView.findViewById<LinearLayout>(R.id.btn_imc)
                    textView.setText(item.textStringId);
                    iconView.setImageResource(item.drawableId)
                    container.setBackgroundColor(item.color)

                    container.setOnClickListener {

                        listener.onClick(item.id)

                        }

                }

        }

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {
           return MainViewHolder(LayoutInflater.from(context).inflate(R.layout.main_item,parent,false))
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