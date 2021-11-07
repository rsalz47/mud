const express = require("express")
const { Pool } = require('pg')
const morgan = require("morgan")
const { DB_CONNECTION, DB_PASSWORD} = require('./SECRETS')

console.log(DB_CONNECTION, DB_PASSWORD)
const app = express()

const cors = require("cors")
app.use(express.json());

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
    pool.query('SELECT image FROM Museum', (err, result) => {
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        console.log(result.rows)
        res.json(result.rows);
      })
})

app.post("/insertImage", (req, res) => {
    // Send to database
    let temp;
    pool.query(`INSERT INTO MUSEUM (x, y, image, name)
                VALUES (${req.body.x}, ${req.body.y}, '${req.body.image}', '${req.body.name}');`,
        (err, result) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            temp = result     
        }
    )
    res.send(temp)
})

app.get("/getByCoordinate/x=:x/y=:y", (req, res) => {
    // Get image from database at (x,y)
    let rows = [];
    pool.query(`SELECT image FROM Museum 
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
                }
    )
})

app.get("/getByName/name=:name", (req, res) => {
    let rows = []
    let name = req.params.name.toLowerCase()
    let bestname = getBestName()
    
    pool.query(`SELECT image FROM Museum 
                WHERE name = ${bestname}`,   
                (err,result) => {
                    if (err) {
                        return console.error('Error executing query', err.stack)
                    }
                    if (result.rows !== []) {
                        rows = result.rows
                    }
                    res.json(rows)
                }
    )
})

function getBestName(name) {
    let allNames = []

    pool.query(`SELECT name FROM Museum`,   
                (err,result) => {
                    if (err) {
                        return console.error('Error executing query', err.stack)
                    }
                    if (result.rows !== []) {
                        allNames = result.rows
                    }
                }
    )

    if (allNames === []) {
        return name;
    }

    let allNamesScores = Array.new(allnames.length) 
    allNames.forEach((elem) => elem.toLowerCase())

    //calculate the score for every name
    //score is incremented if characters are in the same position
    //there's absolutely ways to improve, like maybe check adjacent indices to see if 
    //letters are "close enough"
    allNames.forEach((elem, index) => {
        let similarityScore = 0;
        let currInd = elem.length - 1;
        if (currInd > name.length - 1) {
            score -= (currInd - name.length - 1)
            currInd = name.length
        }
        if (currInd < name.length - 1) {
            score -= (name.length - 1 - currInd)
        }

        for(; currInd > -1; currInd ++) {
            if (elem.charAt(currInd) === name.charAt(currInd)) {
                score++;
            }
        }

        allNamesScores[index] = similarityScore;
    })
    let bestInd = 0;
    allNames.forEach((elem, ind) => {
        if(allNamesScore[ind] > allNamesScores[bestInd])
            bestInd = ind
    })
    return allNames[ind]
}
//when hosted on VPS, change this to listen on every port?
//Essentially, wait for anything to talk to us
app.listen(3001)