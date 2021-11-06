const express = require("express")
const { Pool } = require('pg')
const morgan = require("morgan")
const { DB_CONNECTION, DB_PASSWORD} = require('./SECRETS')

console.log(DB_CONNECTION, DB_PASSWORD)
const app = express()

const cors = require("cors")

const pool = new Pool({
    host: DB_CONNECTION,
    user: 'postgres',
    password: DB_PASSWORD,
    port: 5432,
    database: 'postgres',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

app.use(cors())
app.use(morgan("dev"))

app.get("/", (req, res)=>{
    res.json("hello world!")
})

app.get("/getImages", (req, res) => {
    //select everything from images
    pool.query('SELECT * FROM Museum', (err, result) => {
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        console.log(result.rows)
        res.json(result.rows);
      })
})

app.post("/insertImage", (req, res) => {
    // Save image somehow
    // Send to database
    res.end("Image uploaded successfully!");
})

app.get("/getByCoordinate/x=:x/y=:y", (req, res) => {
    // Get image from database at (x,y)
    let rows = [];
    pool.query(`SELECT * FROM Museum 
                WHERE x = ${req.params.x} AND y = ${req.params.y}`, 
        (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        console.log(result.rows)
        //if not empty populate return val
        if (result.rows !== []) {
            rows = result.rows
        }
        //pipe to front end
        res.json(rows);
      })
})

//when hosted on VPS, change this to listen on every port?
//Essentially, wait for anything to talk to us
app.listen(3001)