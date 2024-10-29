import { useEffect } from "react";
import axios from 'axios';

async function getProduct() {
  try {
    const response = await axios.get("http://localhost:3002/products");
    console.log(response);
  } catch (error) {
    console.log("Error: ", error);
  }
}

const Products = ({ className }) => {
  useEffect(() => {
    console.log("test");
    getProduct();
  }, []);

  return (
    <div className={`${className} bg-blue-100`}>
      <h1>Here will be the products</h1>
    </div>
  );
};

export default Products;
