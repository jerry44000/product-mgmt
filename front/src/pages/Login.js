import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function to submit form and request the back
  const handleSubmit = async(e) => {
    e.preventDefault();
    // if (password !== confirmPassword) {
    //   alert("Passwords do not match");
    //   return;
    // }
    // const res = await fetch("/api/signup", {})
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

      <button>Log In</button>
      <ToastContainer />  
    </form>
  );
};

export default Login;