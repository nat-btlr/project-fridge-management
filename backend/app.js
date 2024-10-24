// Importing necessary dependencies (require - key word in Node.js) 
const express = require("express"); // Creating a variable for a web server based on Node.js
const mysql2 = require("mysql2"); // Creating a variable for a database
const cors = require("cors"); // Creating a variable for using cors - managing cross-origin ports

// Initializing the Express application
const app = express();

// Using the middleware
app.use(cors()); // allows cross-origin requests (requests coming from different ports qre united into one from a chosen port?)
app.use(express.json()); // Middleware to deal with JSON 