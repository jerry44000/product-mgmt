import React, { useState } from "react";
import { useSignUp } from "../hooks/useSignUp.js";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const { error, isLoading, signup } = useSignUp();

  const reset = () => {
    setPassword("");
    setEmail("");
  };

  // Function to submit form and request the back
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (password !== confirmPassword) {
      toast("Passwords do not match", { type: "error" });
      return;
    } else {
      // Waiting for signup function
      await signup(email, password);
      reset();
    }
  };
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
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
      <label htmlFor="">Confirm password:</label>
      <input
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />

      <button disabled={isLoading}>Sign Up</button>

      <ToastContainer />
    </form>
  );
};

export default SignUp;
