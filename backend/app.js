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

//* ENDPOINTS *//

// Creating endpoints for manipulating products

// Endpoint for retrieving all available products
app.get("/products", async (_, res) => {
    try {
        const sql_request = "SELECT * FROM products";
        const [results] = await query(sql_request);
        console.log("Products were retrieved successfully.");
        res.status(200).send(results)
    } catch (error) {
        console.log("Error while adding a product: ", error);
        res.status(500).send({message: "Internal server error", error})
    }
});

// Endpoint for retrieving all available categories
app.get("/categories", async (_, res) => {
    try {
        const sql_request = "SELECT * FROM categories";
        const results = await query(sql_request);
        console.log("Raw Results: ", results); 

        res.status(200).send(results);
    } catch (error) {
        console.log("Error while retrieving categories: ", error);
        res.status(500).send({ message: "Internal server error", error });
    }
});

// Endpoint for retrieving all available units
app.get("/units", async (_, res) => {
    try {
        const sql_request = "SELECT * FROM units";
        const results = await query(sql_request);
        console.log("Raw Results: ", results); 

        res.status(200).send(results);
    } catch (error) {
        console.log("Error while retrieving units: ", error);
        res.status(500).send({ message: "Internal server error", error });
    }
});

// Endpoint for adding a new product to the fridge 
app.post("/products/addproduct", async (req, res) => {
    const {name, quantity, units, expiration_date, category_name} = req.body;
    try {
        // Processing the input for a unit name to convert it into an id to save it in the db
        const unit_result = await query("SELECT id FROM units WHERE unit_name = ?", [units]);
        if (unit_result.length === 0) {
            return res.status(400).send({ message: "Invalid unit name." });
        }
        const unit_id = unit_result[0].id;

        // Processing the input for a category name to convert it into an id to save it in the db
        const category_result = await query("SELECT id FROM categories WHERE category_name = ?", [category_name]);
        if (category_result.length === 0) {
            return res.status(400).send({ message: "Invalid category name." });
        }
        const category_id = category_result[0].id;


        // Inserting a product into the db
        const sql_request = "INSERT INTO products (_name, quantity, unit_id, expiration_date, category_id) VALUES (?, ?, ?, ?, ?)";
        await query(sql_request, [name, quantity, unit_id, expiration_date, category_id]);
        res.status(200).send({message: "The product was successfully added to the database."});
    } catch (error) {
        console.log("Error while adding a product:", error);
        res.status(500).send({ message: "Internal server error", error });
    }
});

// Endpoint for deleting one product from the fridge
app.delete("/products/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
    const sql_request = "DELETE FROM products WHERE id = ?";
    await query(sql_request, [id]);
    res.status(200).send({message: "The product was successfully deleted from the database."});
    } catch (error) {
        console.log("Error while deleting a product:", error);
        res.status(500).send({ message: "Internal server error", error });
    }
});

// Endpoint for deleting everything from the fridge
app.delete("/products/deleteall", (_, res) => {
    const sql_resuest = "DELETE FROM products";

    query(sql_resuest, (error) => {
        if (error) {
            res.status(500).send("Error deleting products");
        } else {
            res.send("All products deleted successfully");
        }
    })
});

// Endpoint for updating the quantity of products
app.put("/products/modify/:product_id", async (req, res) => {
    // We are getting the id and the quantity of the product we want to modify
    const { product_id } = req.params;
    const { updated_quantity} = req.body;
    console.log(`Product ID: ${product_id}, Updated Quantity: ${updated_quantity}`);

    try {
        const sql_request = "UPDATE products SET quantity = ? WHERE id = ?"
        await query(sql_request, [updated_quantity, product_id]);
        res.status(200).send({message: "The quantity was successfully updated."});
    } catch (error) {
        res.status(500).send({message: "An error occurred: ", error})
    }
});

// Launching the server
app.listen(3002, () => {
    console.log("Backend server launched on port 3002");
});
