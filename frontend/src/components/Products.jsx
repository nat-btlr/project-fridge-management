import { useEffect, useState } from "react";
import axios from 'axios';
import { AddProduct } from "./AddProduct";

const Products = ({ className }) => {
  const [products, setProducts] = useState([]);

  async function getProduct() {
    try {
      const response = await axios.get("http://localhost:3002/products");
      const productData = response.data;
      const productArray = Array.isArray(productData) ? productData : [productData];
      setProducts(productArray);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className={`${className} bg-blue-100`}>
      <h1>Here will be the products</h1>
      <AddProduct />
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <p>{product._name}</p>
            <p>{product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
