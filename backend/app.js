// Importing necessary dependencies (require - key word in Node.js) 
const express = require("express"); // Creating a variable for a web server based on Node.js
const mysql = require("mysql2"); // Creating a variable for a database
const cors = require("cors"); // Creating a variable for using cors - managing cross-origin ports

// Initializing the Express application
const app = express();

// Using the middleware
app.use(cors()); // allows cross-origin requests (requests coming from different ports qre united into one from a chosen port?)
app.use(express.json()); // Middleware to deal with JSON 

// Initializing the database and introducing the right configuration of the connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "fridge_management",
  });

// Establishing the connection to MySQL
// If the connection is not succesful, we will throw an error and the execution will stop
db.connect((error) => {
    if (error) {
      console.error("MySQL connection error: ", err); // вывод результата в консоль для отслеживания статуса
      throw error; // нужен для остановки программы, так как дальнейшее выполнение кода без подключения к базе данных бессмысленно
    }
    // мы не используем else, так как при использовании throw error, выполнение кода завершится при возникновении ошибки
    // если error нет, то код автоматически переходит к выполнению дальнейших команд
    console.log("Connection to MySQL successful.");
  });

// Creating routes(endpoints) for adding/geting/updating and deleting products and recipes






// Launching the serveur
app.listen(3001, () => {
    console.log("Backend server launched on port 3001");
  });