import React, { useState, useEffect, useContext } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import Preview from "../../components/layout/Preview";
import {
  FirebaseApp,
  useFirebase,
} from "../../components/context/firebaseContext";
import "../styles.css";

function Orders() {
  const firebasee = useFirebase();
  const [orders, setOrders] = useState([]);
  const [filter, setfilter] = useState("false");
  const [service, setService] = useState("Salary Or House Rent Income");

  useEffect(() => {
    userData();
    console.log(filter);
  }, [filter]);

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

  console.log(filter);

  return (
    <div className="dashboard-content">
      <DashboardHeader btnText="New Order" />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Orders List</h2>
          <select
            name="Status"
            id=""
            onClick={(event) => setfilter(event.target.value)}
          >
            <option value="true">Accept</option>
            <option value="reject">Reject</option>
            <option value="false">Pending</option>
          </select>
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
            <th>Files</th>
            {/* <th>Accept</th>
            <th>Reject</th> */}
          </thead>

          {orders.map((document) => {
            console.log(document[service])
            return (
              <>
                {document[service] && document[service].status === filter && (
                  <tr>
                    <td>{document.firstname + " " + document.lastname}</td>
                    <td>{document.email}</td>
                    <td>{document[service].message}</td>

                    <td>
                      {filter == "true" && "Accept"}
                      {filter == "false" && "Pending"}
                      {filter == "reject" && "Reject"}
                    </td>
                    <div className="preview button">
                      <Preview
                        id={document.id}
                        document={document}
                        services={service}
                        filters={filter}
                      />
                    </div>
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

export default Orders;
