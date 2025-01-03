const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
const dotenv = require("dotenv")

const app = express()
require("dotenv").config()

const allowedorigins = process.env.ALLOWEDURLS.split(",")

const corsOptions = {
    origin: (origin, callback) => {
        if (origin || allowedorigins.includes(origin)) {
            callback(
                null, true
            )
        }
        else {
            callback(new Error("blocked by cors"))
        }
    }
}

app.use(cors(corsOptions))

//connection
const connection = mysql.createConnection({
    host: process.env.HOST_NAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectTimeout: 60000
})

connection.connect((err)=>{
    console.log(err)
    if(err){
        console.error("Database connection failed",err.stack)
    }
    else{
        console.log("Connected to database")
    }
})





app.listen(process.env.PORT, () => {
    console.log(`server is running on https://localhost/${process.env.PORT} `)
})