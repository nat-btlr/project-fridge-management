// Importing necessary dependencies
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// Initializing the Express application
const app = express();

// Using the middleware
app.use(cors());
app.use(express.json());

// Initializing the database and introducing the right configuration of the connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "fridge_management",
});

// Establishing the connection to MySQL
db.connect((error) => {
    if (error) {
        console.error("MySQL connection error: ", error);
        throw error;
    }
    console.log("Connection to MySQL successful.");
});

// Creating a wrapper for db.query using Promise
const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

// Endpoint for adding a new product to the fridge 
app.post("/addproduct", async (req, res) => {
    const {name, quantity, units, expiration_date, category_name} = req.body;
    try {
        const unit_result = await query("SELECT id FROM units WHERE unit_name = ?", [units]);
        if (unit_result.length === 0) {
            return res.status(400).send({ message: "Invalid unit name." });
        }
        const unit_id = unit_result[0].id;

        const category_result = await query("SELECT id FROM categories WHERE category_name = ?", [category_name]);
        if (category_result.length === 0) {
            return res.status(400).send({ message: "Invalid category name." });
        }
        const category_id = category_result[0].id;

        const sql_request = "INSERT INTO products (_name, quantity, unit_id, expiration_date, category_id) VALUES (?, ?, ?, ?, ?)";
        await query(sql_request, [name, quantity, unit_id, expiration_date, category_id]);
        res.status(200).send({message: "The product was successfully added to the database."});
    } catch (error) {
        console.log("Error while adding a product:", error);
        res.status(500).send({ message: "Internal server error", error });
    }
});

// Endpoint for deleting a product from the fridge


// Launching the server
app.listen(3002, () => {
    console.log("Backend server launched on port 3002");
});
