import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout.js";

const Navbar = () => {
  // Get the logout function from useLogout hook
  const { logout } = useLogout();

  // handleClick logout function
  const handleLogOut = () => {
    // Call the logout function
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Product Mgmt</h1>
        </Link>
        <nav>
          <div>
            <button className="btn-logout" onClick={handleLogOut}>Log Out</button>
          </div>
          <div>
            <button>Dark Mode</button>
          </div>
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
