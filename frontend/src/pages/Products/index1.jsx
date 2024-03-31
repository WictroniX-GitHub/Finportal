import React, { useState, useEffect, useContext } from "react";

import {
  useFirebase,
} from "../../components/context/firebaseContext";
import "../styles.css";
import Loading from "../Loading";
import Product from "./Product";

function Products() {
  const firebasee = useFirebase();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    userData();
  }, []);

  const [search, setSearch] = useState("");
  const [service, setService] = useState("Salary Or House Rent Income");
  // console.log(service);

  
  const userData = () => {
    firebasee.getUser().then((result) => {
      const dataArr = [];
      result.forEach((doc) => {
        dataArr.push({ id: doc.id, ...doc.data() });
      });
      setLoading(false)
      setOrders(dataArr);
      // console.log(orders);
    });
  };

  if(loading) {
    return <Loading />
  }

  return (
    <div className="dashboard-content">
      {/* <DashboardHeader btnText="New Order" /> */}

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Products List</h2>
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

        {/* <h3 style={{color: "white", textAlign: "center", backgroundColor: "green"}}>{message}</h3> */}

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
                {document[service] && document[service].status === "accept" && (
                  <Product document={document} service={service}/>
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
