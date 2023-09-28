import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import SideBar from "./components/Sidebar";
import sidebar_menu from "./constants/sidebar-menu";
import SignupPage from "./pages/signup";
import Signin from "./pages/signin";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import { useFirebase, auth } from "./pages/context";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

function App() {
  const firebase = useFirebase();
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // navigate("/home");
      } else {
        console.log("You are Logged out");
        setUser(null);
      }
    });
  }, []);

  return (
      <Router>
    <div className="dashboard-container">
       {firebase.isLoggedIn && <SideBar menu={sidebar_menu} />} 

        <div className="dashboard-body">
          <Routes>
            <Route
              path="/"
              element={
                firebase.isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route path="/register" element={<SignupPage />} />
            <Route
              path="/login"
              element={firebase.isLoggedIn ? <Navigate to="/" /> : <Signin />}
            />
            <Route
              exact
              path="/orders"
              element={
                firebase.isLoggedIn ? <Orders /> : <Navigate to="/login" />
              }
            />
            <Route
              exact
              path="/products"
              element={
                firebase.isLoggedIn ? <Products /> : <Navigate to="/login" />
              }
            />
            {/* <Route exact path="/locations" element={<div></div>} />
            <Route exact path="/profile" element={<div></div>} /> */}
          </Routes>
        </div>
    </div>
      </Router>
  );
}

export default App;
