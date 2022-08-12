import React, { useEffect } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { useLocation } from "react-router-dom";

const ProductSinglePage = () => {
  // using location hook to get the product id from the url
  const location = useLocation();
  const product = location.state.product;

  // Get the products from the context and distructure them
  const { products, dispatch } = useProductsContext();
  // Fetches product from the server
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${product._id}`, {
        method: "GET",
      });
      const data = await res.json();

      if (res.ok) {
        // Dispatch using the action type and products/data
        dispatch({ type: "SET_ONE_PRODUCT", payload: data });
      }
    };
    fetchProduct();
  }, [dispatch]);
  return (
    <div>
      <h1>{product.title}</h1>
    </div>
  );
};

export default ProductSinglePage;
