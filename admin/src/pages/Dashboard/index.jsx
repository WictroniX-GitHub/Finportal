import React, { useState, useEffect, useContext } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import Preview from "../../components/layout/Preview";
import {
  FirebaseApp,
  useFirebase,
} from "../../components/context/firebaseContext";
import "../styles.css";
import SideBar from "../../components/Sidebar";

import sidebar_menu from "../../constants/sidebar-menu" ;
function Dashboard() {
  const firebasee = useFirebase();
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    userData();
  }, []);

  const [search, setSearch] = useState("");
  const [message, setmessage] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setmessage(event.target.value);
  };

  const handlebar = async (document) => {
    // event.preventDefault()
    console.log(document);
    document.message = message;
    document.status = "reject";
    setmessage("");
    await firebasee.updateMessage(document).then((data) => {
      console.log(data);
    });
    userData();
    // window.location.reload();
  };
  const acceptData = async (doc) => {
    doc.message = "success";
    doc.status = "true";
    await firebasee.updateMessage(doc);
    userData();
  };
  const userData = () => {
    firebasee.getUser().then((result) => {
      const dataArr = [];
      result.forEach((doc) => {
        dataArr.push({ id: doc.id, ...doc.data() });
      });
      setOrders(dataArr);
      console.log(orders);
    });
  };

  return (
    <div className="dashboard-content">
      <DashboardHeader btnText="New Order" />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Orders List</h2>
          <div className="dashboard-content-search">
            <input
              type="text"
              value={search}
              placeholder="Search.."
              className="dashboard-content-input"
            />
          </div>
          <button onClick={userData}>Refresh</button>
        </div>

        <table>
          <thead>
            {/* <th>ID</th> */}
            <th>Client</th>
            <th>Email</th>
            <th>Mobile No</th>
            
            <th>Delete</th>
          </thead>

          {orders.map((document) => {
            return (
              <tr>
                <td>{document.firstname + " " + document.lastname}</td>
                <td>{document.email}</td>
                <td>{document.phoneno}</td>
               
                
                <td>
                  <button
                    onClick={() => {
                      firebasee.handleDelete(document.id);
                    }}
                    style={{
                      width: "70px",
                      fontSize: "10px",
                      display: "inline-block",
                    }}
                  >
                    Delete User
                  </button>
                </td>
                
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
} 

export default Dashboard;
