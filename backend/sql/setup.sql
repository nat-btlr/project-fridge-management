/* creating a database */
CREATE DATABASE fridge_management;

/* using the database */
USE fridge_management;

/* creating tables in the database */
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    _name VARCHAR(255),
    quantity_pieces INT NOT NULL,
    quantity_kilos INT NOT NULL,
    expiration_date DATE,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    _name VARCHAR(255),
);

CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    _name VARCHAR(100) NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    difficulty_level VARCHAR(50) NOT NULL,
    preparation_time INT NOT NULL
);






