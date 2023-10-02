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
  const [service, setService] = useState("Salary Or House Rent Income");
  console.log(service);

  const handleChange = (event) => {
    console.log(event.target.value);
    setmessage(event.target.value);
  };

  const putData = async (event) => {
    event.preventDefault();
    try {
      console.log("start");
      await imageUpload.forEach((element) => {
        console.log("working .... end");
        firebasee.submitITRFilebyadmin(element, service);
      });
    } catch (error) {
      console.log(error);
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
          <select
            name="Service"
            id=""
            onClick={(event) => setService(event.target.value)}
          >
            <option value="Salary Or House Rent Income">
              Salary Or House Rent Income
            </option>
            <option value="Capital Income">Capital Income</option>
            <option value="PGBP Income">PGBP Income</option>
            <option value="Share Trading">Share Trading</option>
            <option value="Presumptive Taxation">Presumptive Taxation</option>
            <option value="Crypto Transactions">Crypto Transactions</option>
            <option value="Private Limited Company Registration">
              Private Limited Company Registration
            </option>
            <option value="Trademark Registration (Individual)">
              Trademark Registration (Individual)
            </option>
            <option value="Run Your Business (Lite)">
              Run Your Business (Lite)
            </option>
          </select>

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
              <>
                {document[service] && document[service].status === "true" && (
                  <tr>
                    {/* <td>{document.id}</td> */}
                    <td>{document.firstname + " " + document.lastname}</td>
                    <td>{document.email}</td>
                    <td>{document[service].message}</td>
                    <td>{document[service].status}</td>
                    <td style={{ display: "flex", gap: "10px" }}>
                      <div className="first-box">
                        <label htmlFor="" className="titles"></label>
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
                )}
              </>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Products;
