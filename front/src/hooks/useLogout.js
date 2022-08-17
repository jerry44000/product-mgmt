import { useAuthContext } from "./useAuthContext.js";

export const useLogout = () => {
    // Get the auth context
    const { dispatch } = useAuthContext();
    const logout = () => {
        // Remove user from local storage
        localStorage.removeItem("user");
        // Update auth context to logout using dispatch
        dispatch({ type: "LOGOUT" });
    }
    return { logout };
};