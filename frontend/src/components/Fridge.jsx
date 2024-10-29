import React from "react";
import Products from "./Products";
import Recipes from "./Recipes";

function Fridge() {
    return (
      <div className="flex flex-col h-screen p-4">
        <div className="text-center mb-4">
          <h1>Here will be the products and the recipes</h1>
        </div>
        <div className="flex flex-grow gap-4">
          <Products className="w-1/2 p-4 rounded-md overflow-y-auto" />
          <Recipes className="w-1/2 p-4 rounded-md overflow-y-auto" />
        </div>
      </div>
    );
}

export default Fridge;
