import React, { useEffect, useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

const ProductSinglePage = () => {
  // using location hook to get the product id from the url
  const location = useLocation();
  const product = location.state.product;
  console.log(product)
  
  // using navigate hook to navigate to the product page
  const navigate = useNavigate();

  // Update
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  // Get the products from the context and distructure them
  const { products, dispatch } = useProductsContext();
  // Fetches product from the server
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${product._id}`, {
        method: "GET",
      });
      const data = await res.json();

      // Assign the data
      console.log(data);
      setTitle(data.title);
      setPrice(data.price);
      setQuantity(data.quantity);
      setDescription(data.description);

      if (res.ok) {
        // Dispatch using the action type and products/data
        dispatch({ type: "SET_ONE_PRODUCT", payload: data });
      }
    };
    fetchProduct();
  }, [dispatch, product._id]);

  // Function to update the product
  const handleUpdate = async (id) => {
     console.log(title, price, quantity, description);
    // Fetch the server using the product id (from props)
    const res = await fetch(`/api/products/${product._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    //Wait for the response json(product._id)
    const json = await res.json();

    // Check if response is ok
    if (res.ok) {
      toast("Product updated successfully", { type: "success" });
      dispatch({ type: "UPDATE_PRODUCT", payload: json });
      navigate("/");
    }
  };

  return (
    <form className="create" onSubmit={handleUpdate}>
      <h2>Update Product</h2>

      <label>Product :</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Description :</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <label>Price :</label>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />

      <label>Quantity :</label>
      <input
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
      />
      <button>Update product</button>
      <ToastContainer />
    </form>
  );
};

export default ProductSinglePage;
