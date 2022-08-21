import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout.js";
import { useAuthContext } from "../hooks/useAuthContext";


const Navbar = () => {
  // Invoke the logout function from useLogout hook
  const { logout } = useLogout();
  const { user } = useAuthContext();
 
  // handleClick logout function
  const handleLogOut = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Product Mgmt</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button className="btn-logout" onClick={handleLogOut}>
                Log Out
              </button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
