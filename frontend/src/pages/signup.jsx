import React, { useState } from "react";
import { useFirebase } from "../components/context/firebaseContext";
import { NavLink, useNavigate } from "react-router-dom";
import "./signup.css";
import { FcGoogle } from 'react-icons/fc';

const SignupPage = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [err, setError] = useState("")
  

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    password: "",
    cpassword: ""
  });

  // send data to firebase
  const handleSubmit = async (event) => {
    event.preventDefault();
    for (const key in formData) {
      if (formData[key] === "") {
        setError(`${key} is required !!`)
        setTimeout(() => {
          setError("")
        }, 3000)
        return; 
      }
    }
    
    if(formData.mobilenumber.length !== 10){
      setError("Enter valid mobile number !")
        setTimeout(() => {
          setError("")
        }, 3000)
      return;
    }

    if(formData.password.length < 6) {
      setError("Password should be at least 6 characters !")
        setTimeout(() => {
          setError("")
        }, 3000)
      return;
    }

    if(formData.password !== formData.cpassword) {
      setError("Password and Confirm Password does not match !")
        setTimeout(() => {
          setError("")
        }, 3000)
      return;
    }

    // useFirebase to create user
    const userCredential = await firebase.createUser(
      formData.email,
      formData.password
    );
    // console.log(userCredential);
    if (userCredential) {
      navigate("/");
    }

    // also update user's info to realtime database
    const userData = {
      firstName: formData.name,
      lastName: formData.lastname,
      username: formData.username,
      email: formData.email,
    };
    // realtimeDb
    const storeUser = await firebase.storeInfo(userCredential, userData);
    // console.log(storeUser);

    // reset the values after updating the Database
    setFormData({
      name: "",
      username: "",
      lastname: "",
      email: "",
      mobilenumber: "",
      password: "",
      cpassword: ""
    });
  };

  // handle onchange function
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const googleHandler = async(event) => {
    await firebase.signupWithGoogle().then(() => {
      navigate('/')
    })
  }

  return (

    <div className="signup-main">
    <div className="signcont container">
      <h1>Sign Up</h1>
      <h3 style={{color: "red", textAlign: "center"}}>{err}</h3>

      <form id="signup-form">
        <div className="form-group">
          <input
            placeholder="Firstname"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            
          />
          <input
            placeholder="Lastname"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            
          />
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Telephone"
            type="tel"
            name="mobilenumber"
            value={formData.mobilenumber}
            onChange={handleInputChange}
            
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            
          />
          <input
            type="password"
            name="cpassword"
            value={formData.cpassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            
          />  
        </div>
        <div style={{textAlign: "center"}}>
          <button onClick={handleSubmit} type="submit">Sign Up</button>
        </div>
      </form>
      <div style={{textAlign: "center"}}>
        <button className="google" onClick={googleHandler}> <FcGoogle  className="fc"size={40} />Sign UP with Google</button>
      </div>
      <p style={{textAlign: "center"}}>
          Already have an account? <NavLink style={{color: "#FF9500", textDecoration: "none"}} to="/login">Login</NavLink>
      </p>
    </div>
    </div>
  );
};
export default SignupPage;
