import React, { useState } from "react";
import { useAuthContext } from  "./useAuthContext";
import { ToastContainer, toast } from "react-toastify";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    // Fetch the server to sign up the user and method
    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    // Wait for response json
    const data = await res.json();
    // Check if response is ok
    if (!res.ok) {
      setIsLoading(false);
      setError(data.message);
      toast(error, { type: "error" });
    }
    if (res.ok) {
      // Save user to local storage
      localStorage.setItem("user", JSON.stringify(data));
      toast("Signed up successfully", { type: "success" });
      // Update auth context
      dispatch({type: 'LOGIN', payload: data});
      setIsLoading(false);
    }
  };
    return { error, isLoading, signup };
};
