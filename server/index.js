const express = require("express")
const morgan = require("morgan")

const app = express()

const cors = require("cors")

app.use(cors())
app.use(morgan("dev"))

app.get("/", (req, res)=>{
    res.json("hello world!")
})

//when hosted on VPS, change this to listen on every port?
//Essentially, wait for anything to talk to us
app.listen(3001)