import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './components/Homepage';
import Footer from './components/Footer';
import ItrFiling from './components/ItrFiling';  //services
import Contact from './components/Contact'
import Signin from './components/Signin';
import Signup from './components/Signup';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFirebase,auth } from "./components/context/firebaseContext";
import { Navigate } from "react-router-dom";
import Itrform from "./components/context/service3/ItrForm"

function App() {
  const firebase = useFirebase()
  const [user,setUser]= useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    console.log(firebase.isUser)
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setUser(user);
      }
      else{
        console.log("You are Logged out");
        setUser(null);
      }
    })
  },[]);


  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/itr' element={<ItrFiling/>} />
      <Route path='/itrform1' element={firebase.isUser ? <Itrform price="₹299.00" fieldArea={[]} heading = "Salary Or House Rent Income" /> : <Navigate to="/signin" />}/>
      <Route path='/itrform2' element={firebase.isUser ? <Itrform price="₹399.00" fieldArea={["CG"]} heading = {"Capital Income"}/> : <Navigate to="/signin" />}/>
      <Route path='/itrform3' element={firebase.isUser ? <Itrform price="₹499.00"fieldArea={["CG", "PGBP"]} heading={"PGBP Income"}/> : <Navigate to="/signin" />}/>
      
      <Route path='/itrform4' element={firebase.isUser ? <Itrform price="₹699.00" fieldArea={["CG"]} heading={"Share Trading"} /> : <Navigate to="/signin" />}/>
      <Route path='/itrform5' element={firebase.isUser ? <Itrform price="₹799.00" fieldArea={["CG","PGBP"]} heading={"Presumptive Taxation"}/> : <Navigate to="/signin" />}/>
      <Route path='/itrform6' element={firebase.isUser ? <Itrform price="₹899.00" fieldArea={["CG"]} heading={"Crypto Transactions"} /> : <Navigate to="/signin" />}/>
      <Route path='/itrform7' element={firebase.isUser ? <Itrform price="₹999.00" fieldArea={["CG"]} heading={"Private Limited Company Registration"}/> : <Navigate to="/signin" />}/>
      <Route path='/itrform8' element={firebase.isUser ? <Itrform price="₹3999.00" fieldArea={["CG"]} heading={"Trademark Registration (Individual)"}/> :<Navigate to="/signin" />}/>
      <Route path='/itrform9' element={firebase.isUser ? <Itrform price="₹4999.00" fieldArea={["CG"]} heading={"Run Your Business (Lite)"}/> : <Navigate to="/signin" />}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
