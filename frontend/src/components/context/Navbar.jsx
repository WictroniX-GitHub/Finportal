import React from "react";
import { useFirebase } from "./firebaseContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const firebase = useFirebase();

  const navigate = useNavigate();
  const handleUser = () => {
    firebase.signOutUser();
    navigate("/");
  };

  
  return (
    <div style={{}}>
      {firebase.isLoggedIn && 
      <button
        style={{
          display: "block",
          float: "right",
          margin: "20px",
          backgroundColor: "#FFB400",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          fontSize: "1.2rem",
          cursor: "pointer",
          // marginTop: "10px",
        }}
        onClick={handleUser}
      >
        Logout
      </button>
}
    </div>
  );
}

export default Logout;
