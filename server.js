const port = 8000;

// Setup empty JS object to act as endpoint for all routes
let projectData =   {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));


// Setup Serve
app.listen(port, listening);

function listening() {
    console.log(`Server started on port ${port}`);
}

app.get("/all", getWeatherData);

function getWeatherData(req, resp) {
    console.log("info: getWeatherData");
    resp.json(projectData);
}

app.post("/weatherData", postWeatherData);

function postWeatherData(req, resp) {
    console.log("info: postWeatherData",req.body);
    const reqBody = req.body;
    projectData = {
        temperature: reqBody.temperature,
        date: reqBody.date,
        userResponse: reqBody.userResponse
    };
    resp.send(projectData);
}
