import React, { useState, useEffect, useContext } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import Preview from "../../components/layout/Preview";
import {
  FirebaseApp,
  useFirebase,
} from "../../components/context/firebaseContext";
import "../styles.css";

function Products() {

  const firebasee = useFirebase();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    userData();
  }, []);

  const [search, setSearch] = useState("");
  const [message, setmessage] = useState("");
  const [imageUpload, setImageUpload] = useState([]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setmessage(event.target.value);
  };
  

  const putData = async (event) => {
    event.preventDefault();
    try {
      console.log("startttt");
      await imageUpload.forEach((element) => {
        console.log("working");
        firebasee.submitITRFilebyadmin(element);
      });
      
    } catch (error) {
      console.log(error)
    }
    // window.location.reload();
  };

  const imageSet = (name, file) => {
    setImageUpload([
      ...imageUpload,
      {
        name: name,
        file: file,
      },
    ]);
    console.log(imageUpload);
  };

  

  const handlebar = async (document) => {
    // event.preventDefault()
    console.log(document);
    document.message = message;
    document.status = "reject"
    setmessage("")
    await firebasee.updateMessage(document).then((data) => {
      console.log(data);
    });
    userData();
    // window.location.reload();
  };
  const acceptData = async (doc) => {
      doc.message = "success";
      doc.status = "true"
      await firebasee.updateMessage(doc);
      userData()
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
            <th>Message</th>
            <th>Status</th>
            <th>ITRFile</th>
          
          </thead>

          {orders.map((document) => {
            return (
              document.status === "true" && (
                <tr>
                  {/* <td>{document.id}</td> */}
                  <td>{document.firstname + " " + document.lastname}</td>
                  <td>{document.email}</td>
                  <td>{document.message}</td>
                  <td>{document.status}</td>
                  
                  <td style={{ display: "flex", gap: "10px" }}>
                   
                    


                    <div className="first-box">
                    <label htmlFor="" className="titles">
                      
                    </label>
                    <input
                      type="file"
                      name="ITRFile"
                      onChange={(event) => {
                        imageSet(event.target.name, event.target.files[0]);
                      }}
                    />

                    <button onClick={putData}>Upload File</button>
                  </div>
                  </td>
                </tr>
              )
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Products;
