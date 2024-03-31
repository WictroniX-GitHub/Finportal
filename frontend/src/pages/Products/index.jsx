import { useEffect, useState } from "react";
import { useFirebase } from "../context";
import "../styles.css";
import serviceData from "./servicelist";
import { Link, useNavigate } from "react-router-dom";


function Products() {
    const firebase = useFirebase();
    const [loading, setLoading] = useState("notyet");
    const [service, setService] = useState("All");
    const [products, setProducts] = useState([]);
    const [linkDisable, setDisable] = useState(false);
    const navigate = useNavigate();

    const userData = async () => {
        setProducts(serviceData)
        await firebase.getData().then((rs) => {
            if (rs) {
              setDisable(true)
            } 
            setLoading("done")
        });
    };

    const handleClick = (path) => {
        navigate(path)
    }
    

    useEffect(() => {
    userData();
    }, []);

    if(loading === "notyet") {
        return <>
            Loading
        </>
    }

    return (
        <div className="dashboard-content">

        <div className="dashboard-content-container">
            <div className="dashboard-content-header">
            <h2>Products List</h2>
            {/* <div className="dashboard-content-search">
                <input
                type="text"
                value={search}
                placeholder="Search.."
                className="dashboard-content-input"
                />
            </div> */}
            <select
                name="Service"
                id=""
                onClick={(event) => setService(event.target.value)}
            >
                <option value="All">
                All
                </option>
                <option value="Salary Or House Rent Income">
                Salary Or House Rent Income
                </option>
                <option value="Capital Gains Income">Capital Gains Income</option>
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
                <th>Title</th>
                <th>Discounted Price</th>
                <th>Actual Price</th>
                <th>Income Covers</th>
                <th>File ITR</th>
                {/* <th>ITRFile</th> */}
            </thead>

            {products && products.map((document) => {
                return (
                <>
                    {(document.title === service || service === "All")  && (
                    <tr>
                        {/* <td>{document.id}</td> */}
                        <td>{document.title}</td>
                        <td>{document.discountedPrice}</td>
                        <td>{document.actualPrice}</td>
                        <td>
                        {document.incomeCovers.map((doc) => {
                        return (
                            <h5>{doc}</h5>
                        )
                        })}
                        </td>

                        <td>
                           
                                {/* <Link to={document.linkurl}> */}
                                    <button style={{backgroundColor: linkDisable && "grey", cursor: linkDisable && "not-allowed"}} disabled={linkDisable} onClick={() => handleClick(document.linkurl)} className="service-card__button" >
                                    BUY NOW
                                    </button>
                                {/* </Link> */}
                        </td>

                        {/* <td style={{ display: "flex", gap: "10px" }}>
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
                        </td> */}


                    </tr>
                    )}
                </>
                );
            })}
            </table>
        </div>
        </div>
    )
}

export default Products