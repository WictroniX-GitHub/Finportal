import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./signin.css" 
  import { useFirebase } from "./context";
export default function Signin() {
  // use firebase context
  const firebase = useFirebase();
  const navigate = useNavigate();

  // hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("")

  // onclick function
  const handleUser = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await firebase.signInUser(email, password);
      // console.log(userCredential.msg);
      if(userCredential.msg) {
        setError(userCredential.msg)
        setTimeout(() => {
          setError("")
        }, 3000)
      }
      // if (userCredential.user) {
      //   navigate("/");
      // }
    } catch (error) {
      setError("Invalid credentials !!")
        setTimeout(() => {
          setError("")
        }, 3000)
      // console.log(error);
    }
  };

  return (
    <div className="mainlogincont">
    <div className="logincont">
      <div className="left-panel">
        <h2>Welcome Back!</h2>
        <p>Log in to access your account.</p>
      </div>
      <div className="right-panel">
        <h1>Login</h1>
        <h3 style={{color: "red", textAlign: "center"}}>{err}</h3>
        <form id="login-form">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            placeholder="Email"
            required
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            placeholder="Password"
            required
          />
          <button onClick={handleUser} type="submit">
            Log In
          </button>
          {/* <button onClick={firebase.signupWithGoogle}> Sign in with google</button> */}
        </form>
        <p>
          {/* Don't have an account? <a href="/register">Sign Up</a> */}
        </p>

      </div>
    </div>
    </div>
  );
}
