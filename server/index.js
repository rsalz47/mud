const express = require("express")
const morgan = require("morgan")

const app = express()

const cors = require("cors")

app.use(cors())
app.use(morgan("dev"))

app.get("/", (req, res)=>{
    res.json("hello world!")
})

// Skeleton for database and image API
app.get("/getImages", (req, res) => {
    // Take in coordinates
    // Pass to database 
    res.end("Images received");
})

app.post("/insertImage", (req, res) => {
    // Save image somehow
    // Send to database
    res.end("Image uploaded successfully!");
})

app.get("/getByCoordinate/x=:x/y=:y", (req, res) => {
    // Get image from database at (x,y)
    // Send data to front end
    res.end(`Image found at (${req.params.x}, ${req.params.y})`);
})

//when hosted on VPS, change this to listen on every port?
//Essentially, wait for anything to talk to us
app.listen(3001)