import React, { useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductForm = () => {
  // Get dispatch from the context and distructure it
  const { dispatch } = useProductsContext();

  // Form for adding new product
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  // Function to reset the form after submission
  const reset = () => {
    setTitle("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setError(null);

  };

  // Function to submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { title, price, quantity, description };
    // Fetch the server
    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    });
    const json = await res.json();
    // Check if response is ok and set error
    if (!res.ok) {
      setError(json.error);
      toast(error, { type: "error" });
    }
    if (res.ok) {
      toast("Product added successfully", { type: "success" });
      reset();
      console.log(json);
      // Dispatch using the action type and payload
      dispatch({ type: "ADD_PRODUCT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h2>Add product</h2>

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
      <button>Add product</button>
      <ToastContainer />
    </form>
  );
};

export default ProductForm;
