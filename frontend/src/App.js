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
import Itrform from "./pages/ITR_Form/Itrform";

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
                firebase.isLoggedIn ? <Products /> : <Navigate to="/login" />
              }
            />
            {/* <Route path="/register" element={<SignupPage />} /> */}
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
              path="/signup"
              element={
                firebase.isLoggedIn ? <Navigate to="/" /> : <SignupPage />
              }
            />
            <Route path='/itrform1' element={firebase.isUser ? <Itrform price="₹299.00" fieldArea={[]} heading = "Salary Or House Rent Income" /> : <Navigate to="/signin" />}/>
            <Route path='/itrform2' element={firebase.isUser ? <Itrform price="₹399.00" fieldArea={["CG"]} heading = {"Capital Income"}/> : <Navigate to="/signin" />}/> 
            <Route path='/itrform3' element={firebase.isUser ? <Itrform price="₹599.00" fieldArea={["CG", "PGBP"]} heading={"PGBP Income"}/> : <Navigate to="/signin" />}/>
            <Route path='/itrform4' element={firebase.isUser ? <Itrform price="₹699.00" fieldArea={["CG"]} heading={"Share Trading"} /> : <Navigate to="/signin" />}/>
            <Route path='/itrform5' element={firebase.isUser ? <Itrform price="₹799.00" fieldArea={["CG","PGBP"]} heading={"Presumptive Taxation"}/> : <Navigate to="/signin" />}/>
            <Route path='/itrform6' element={firebase.isUser ? <Itrform price="₹899.00" fieldArea={["CG"]} heading={"Crypto Transactions"} /> : <Navigate to="/signin" />}/>
            <Route path='/itrform7' element={firebase.isUser ? <Itrform price="₹999.00" fieldArea={["CG"]} heading={"Private Limited Company Registration"}/> : <Navigate to="/signin" />}/>
            <Route path='/itrform8' element={firebase.isUser ? <Itrform price="₹3999.00" fieldArea={["CG"]} heading={"Trademark Registration (Individual)"}/> :<Navigate to="/signin" />}/>
            <Route path='/itrform9' element={firebase.isUser ? <Itrform price="₹4999.00" fieldArea={["CG"]} heading={"Run Your Business (Lite)"}/> : <Navigate to="/signin" />}/>
            {/* <Route
              exact
              path="/products"
              element={
                firebase.isLoggedIn ? <Products /> : <Navigate to="/login" />
              }
            /> */}
            {/* <Route exact path="/locations" element={<div></div>} />
            <Route exact path="/profile" element={<div></div>} /> */}
          </Routes>
        </div>
    </div>
      </Router>
  );
}

export default App;
