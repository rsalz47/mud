// DON'T TRY TO RUN THIS, THIS IS JUST AN EXAMPLE
// Proposal for getting images onto the database

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

const app = express();
const imageUpload = multer({
    dest: 'images'
});

// Connect to database using an instance of knex
/*
const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: {
        host: db host here,
        user: User creds here,
        password: password here,
        database: museum
    }
});
*/

app.use(express.json());
app.use(morgan('dev'));

const port = 5000; 

// Route for uploading an image to the site
app.post("/image", imageUpload.single('image'), (req, res) => {
    console.log(req.file);
    res.json("Uploaded image");
});

// Inserting an image into the database
/*
app.post("/image", imageUpload.single('image'), (req, res) => {
    const {filename, mimetype, size} = req.file;
    const filepath = req.file.path; 

    db
        .insert({
            filename,
            filepath,
            mimetype,
            size
        })
        .into(table, whatever it is in museum db)
        .then(() => res.json({success: true, filename}))
        .catch((err) => res.json({
            success: false, 
            message: "upload failed",
            stack: err.stack
        }))
})
*/

// Gets the image with filename from the associated directory
app.get("/image/:filename", (req, res) => {
    const {filename} = req.params;
    const dirname = path.resolve();
    const fullPath = path.join(dirname, 'images/' + filename);
    return res.sendFile(fullPath);
});

// Final version of get image
/*
app.get("/image/:filename", (req, res) => {
    db
        .select('*')
        .from(database table)
        .where({filename})
        .then((images) => {
            if (images[0]) {
                const dirname = path.resolve();
                const fullfilepath = path.join(dirname, images[0].filepath);
                return res.type(images[0].mimetype).sendFile(fullfilepath);
            }
            return Promise.reject(new Error('Image does not exist'));
        })
        .catch((err) => res.status(404).json({success: false, message: 'not found', stack: 'err.stack'}))
})
*/

app.listen(port, () => console.log(`Listening on port ${port}`));