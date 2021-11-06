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
    pool.query()
})

//when hosted on VPS, change this to listen on every port?
//Essentially, wait for anything to talk to us
app.listen(3001)