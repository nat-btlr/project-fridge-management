import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";

export const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);

  async function getCategories() {
    try {
      const response = await axios.get("http://localhost:3002/categories");
      console.log(response);
      const result = response.data;
      const categoryArray = Array.isArray(result) ? result : [result];
      setCategories(categoryArray);
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  async function getUnits() {
    try {
      const response = await axios.get("http://localhost:3002/units");
      console.log(response);
      const result = response.data;
      //const unitsArray = Array.isArray(result) ? result : [result];
      setUnits(result);
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  useEffect(() => {
    getCategories();
    getUnits();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    fetch("http://localhost:3002/products/addproduct", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJson), 
    })
  };

  return (
    <div>
      <h1>Add products</h1>
      <div>
        <form method="post" onSubmit={handleSubmit}>
          <label htmlFor="name">Product:</label>
          <input type="text" id="name" name="name" required minLength="3" maxLength="50" />

          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" name="quantity" />

          <label htmlFor="units-select">Choose units</label>
          <select name="units" id="units-select">
            <option value=""> Choose the unit type </option>
            {units.map((unit) => (
            <option key={unit.id} value={unit.unit_name}>
              {unit.unit_name}
            </option>
            ))}
          </select>

          <label for="expiration_date">Expiration date:</label>
          <input type="date" id="expiration_date" name="expiration_date" />

          <label htmlFor="categories-select">Category:</label>
          <select name="category_name" id="categories-select">
            <option value=""> Choose the category </option>
            {categories.map((category) => (
              <option key={category.id} value={category.category_name}>
              {category.category_name}
            </option>
          ))}
          </select>
          <button type="submit">Add a product</button>

        </form>
      </div>
    </div>
  )
}
