import { ProductContext } from "../context/ProductContext.js";
import { useContext } from "react";

export const useProductsContext = () => {
    const context = useContext(ProductContext);

    if(!context) {
        throw Error("useProductsContext must be used within a ProductsContextProvider.");
    }

    return context;
};