import React, { useEffect } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import ProductDetails from "../components/ProductDetails.js";
import ProductForm from "../components/ProductForm.js";

const Home = () => {
  // Get the products from the context and distructure them
  const { products, dispatch } = useProductsContext();

  // Fetches products from the server and sets them to the state
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();

      if (res.ok) {
        // Dispatch using the action type and products/data
        dispatch({ type: "SET_PRODUCTS", payload: data });
      }
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="products">
        {products &&
          products.map((product) => (
            <ProductDetails key={product._id} product={product} />
          ))}
      </div>
      <ProductForm />
    </div>
  );
};

export default Home;
