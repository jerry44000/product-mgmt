import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin.js";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const { login, isLoading, signup } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  // Function to submit form and request the back
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Waiting for login function
    await login(email, password);
    
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      <label htmlFor="">Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label htmlFor="">Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Log In</button>
      <ToastContainer />  
    </form>
  );
};

export default Login;