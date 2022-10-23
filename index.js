const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const employeeRoutes = require("./routes/employeeRoutes")
const userRoutes = require("./routes/userRoutes")

const DB_URL = "mongodb+srv://101300174_Ronak:Greatnews_321@cluster0.18gn2vn.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority"
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

// TODO - Update your mongoDB Atals Url here to Connect to the database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use("/api/", employeeRoutes)
app.use("/api/",userRoutes)
app.get('/', (req, res) => {
    res.send("<h1>Backend application using NodeJS, Express and MongoDB</h1>");
});


app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});