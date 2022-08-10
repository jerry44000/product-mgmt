import { AuthContext } from "../context/ProductContext.js";
import { useContext } from "react";

export const useProductsContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used within a AuthContextProvider.");
  }

  return context;
};
