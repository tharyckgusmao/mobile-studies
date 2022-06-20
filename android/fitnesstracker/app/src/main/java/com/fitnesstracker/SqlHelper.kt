package com.fitnesstracker

import android.content.ContentValues
import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import android.util.Log
import java.text.SimpleDateFormat
import java.util.*

class SqlHelper(private val context: Context):
    SQLiteOpenHelper(context,DATABASE_NAME,null,DATABASE_VERSION) {

    companion object {
        private const val DATABASE_VERSION = 2
        private const val DATABASE_NAME = "data"
    }
    private lateinit var INSTANCE: SqlHelper;
//    fun getInstance(context:Context):SqlHelper{
//        if(INSTANCE==null){
//            INSTANCE = SqlHelper(context);
//        }
//        return INSTANCE
//    }

    override fun onCreate(db: SQLiteDatabase?) {
        if (db != null) {
            db.execSQL(
                "CREATE TABLE calc (id INTEGER primary key, type_calc TEXT, res DECIMAL, created_date DATETIME)"
            )
        }
    }

    override fun onUpgrade(p0: SQLiteDatabase?, p1: Int, p2: Int) {
        Log.d("Teste","Upgrade disparado")
    }

    fun addItem(type:String,response:Double):Long{
        val db:SQLiteDatabase = writableDatabase

        val calcId:Long = 0;
        try {
            db.beginTransaction()
            val values = ContentValues();
            values.put("type_calc",type);
            values.put("res",response);

            val formatDate = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale("pt","BR"))
            val now = formatDate.format(Date())
            values.put("created_date",now);
            db.insertOrThrow("calc",null,values)
            db.setTransactionSuccessful()

        }catch (e:Exception ){
            Log.e("SQLite",e.message,e)

        }finally {
            if(db.isOpen){
                db.endTransaction()
            }
        }

        return calcId


    }
}