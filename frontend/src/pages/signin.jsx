import React, { useState } from "react";
import { useFirebase } from "./context";
import { useNavigate, NavLink } from "react-router-dom";
import './signin.css'
import { FcGoogle } from 'react-icons/fc';


export default function Signin() {
  // use firebase context
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [err, setError] = useState("")

  // hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // onclick function
  const handleUser = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await firebase.signInUser(email, password);
      // console.log("welocme", userCredential);
      if (userCredential.user) {
        navigate("/");
        console.log(firebase.isLoggedIn);
      }
    } catch (error) {
      setError("Invalid credentials !!")
        setTimeout(() => {
          setError("")
        }, 3000)
      // console.log(error);
    }
  };

  const googleHandler = async () => {
    
    await firebase.signupWithGoogle().then(() => {
      navigate('/')
    })
  }

  return (
    <div className="signin-main">
    <div class="logincont container">
      <div class="left-panel">
        <h2>Welcome Back!</h2>
        <p>Log in to access your account.</p>
      </div>
      <div class="right-panel">
        <h1>Login</h1>
        <h3 style={{color: "red", textAlign: "center"}}>{err}</h3>
        <form id="login-form">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            placeholder="Email"
            
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            placeholder="Password"
            
          />
          <button onClick={handleUser} type="submit">
            Log In
          </button>
        </form>
          <div style={{textAlign: "center"}} >
            <button className="google" style={{marginTop: "2vh", textAlign: "center"}} onClick={googleHandler}> <FcGoogle  className="fc"size={40} />Sign IN with Google</button>
          </div>
        <p>
          Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
        </p>
        
      </div>
    </div>
    </div>
  );
}
