import { useAuthContext } from "./useAuthContext.js";
import { useProductsContext } from "./useProductsContext.js";

export const useLogout = () => {
    // Get the auth context & products context
    const { dispatch } = useAuthContext();
    const { dispatch: dispatchProducts } = useProductsContext();

    const logout = () => {
        // Remove user from local storage
        localStorage.removeItem("user");
        // Update auth context to logout using dispatch
        dispatch({ type: "LOGOUT" });
        // Update products context to logout using dispatch
        dispatchProducts({ type: "SET_PRODUCTS", payload: null });
    }
    return { logout };
};