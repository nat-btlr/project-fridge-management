/* creating a database */
CREATE DATABASE fridge_management;

/* using the database */
USE fridge_management;

/* creating tables in the database */
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255)
);

CREATE TABLE units (
    id INT AUTO_INCREMENT PRIMARY KEY,
    unit_name VARCHAR(255)
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    _name VARCHAR(255),
    quantity INT,
    unit_id INT,
    FOREIGN KEY (unit_id) REFERENCES units(unit_id),
    expiration_date DATE,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

/* populating the categories tables with pre-defined categories */
INSERT INTO categories (category_name) VALUES 
("Fruits"),
("Vegetables"),
("Grains"),
("Fish"),
("Meat and poultry"),
("Dairy products"), 
("Nuts and seeds"),
("Oils"),
("Spreads"),
("Beverages"),
("Bread and pastries"),
("Plants and herbs"),
("Eggs"),
("Cereals"),
("Spices"),
("Seafood"),
("Other");

INSERT INTO units (unit_name) VALUES 
("pieces"),
("kilograms"),
("grams"),
("litres"),
("millilitres");

CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    _name VARCHAR(100) NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    difficulty_level VARCHAR(50) NOT NULL,
    preparation_time INT NOT NULL
);

/* joining the categories and the products tables */
SELECT category_name
FROM categories
INNER JOIN products ON categories.id = products.category_id;