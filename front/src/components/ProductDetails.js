import React from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ProductDetails = ({ product }) => {
  // Get dispatch from the context and distructure it
  const { dispatch } = useProductsContext();

  // Function to delete the product
  const handleDelete = async () => {
    // Fetch the server using the product id (from props)
    const res = await fetch(`/api/products/${product._id}`, {
      method: "DELETE",
    });
    //Wait for the response json(product._id)
    const json = await res.json();

    // Check if response is ok
    if (res.ok) {
      toast("Product deleted successfully", { type: "success" });
      dispatch({ type: "DELETE_PRODUCT", payload: json });
    }
  };

  return (
    <div className="product-details">
      <h4>{product.title}</h4>
      <p>
        <strong>Description : </strong> {product.description}
      </p>
      <p>
        <strong>Price : </strong> {product.price}$
      </p>
      <p>
        <strong>Quantity : </strong> {product.quantity}
      </p>
      <p>
        {formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}
      </p>
      <Link to={`/products/${product._id}`} state={{ product }}>
        <p className="update">Update</p>
      </Link>
      <button className="material-symbols-outlined" onClick={handleDelete}>
        close
      </button>
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
