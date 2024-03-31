import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FirebaseApp } from "./components/context/firebaseContext";
import { FirebaseApp as Signin } from "./pages/context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <FirebaseApp>
    <Signin>
        <App />
    </Signin>
      </FirebaseApp>
  </React.StrictMode>
);
