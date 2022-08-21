import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext.js";
import Home from "./pages/Home";
import Navbar from "./components/Navbar.js";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import ProductSinglePage from "./pages/ProductSinglePage.js";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/products/:productId"
              element={<ProductSinglePage />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
