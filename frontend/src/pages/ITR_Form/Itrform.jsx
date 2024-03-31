import React, { useState, useEffect } from "react";
// import Razorpay from 'razorpay';
import { useFirebase } from "../context";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import Preview from "../layout/Preview";
import "./ITRform.css";
import Common from "../layout/Common";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
// import Payment from "./Payment";

function ItrForm(props) {
  
  const firebase = useFirebase();
  // console.log(firebase)
  const [imageUpload, setImageUpload] = useState([]);
  const [adminMSG, setAdminMSG] = useState(null)
  const [Error, setError] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [payment, setPayment] = useState(false);
  const [reject, setReject] = useState(false);
  const [filedITR, setFiledITR] = useState(null);
  const navigate = useNavigate();
  const [isUpload, setIsUpload] = useState(false);
  const [CheckBox, setCheckbox] = useState({
    Salary: false,
    Property: false,
    OtherIncome: false,
  });

  const [err, setErr] = useState("");


  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phoneno: "",
    email: "",
    Balancesheet: "",
    password: "",
    linked: "",
    startingIncome: [],
    serve: props.heading,
    payment: ""
  });

  const initiatePayment = async() => {
    // e.preventDefault();
    // fetch('https://blackcoffer-api-u0yp.onrender.com/payment/', {
    fetch('http://localhost:8000/payment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        props,
      }),
    })
    .then((res) => 
      // console.log(res),
      window.location.href=res
    ).catch((err) => {
        console.log(err)
    })
  }
  
  
  // const localData = (e) => {
  //   e.preventDefault();
  //   localStorage.setItem("formData", JSON.stringify(formData));
  //   localStorage.setItem("checkboxes", JSON.stringify(CheckBox));
  // };

  

  const putData = async (event) => {
    event.preventDefault();

    const checkImage = ["Pan-Card", "Addhhar-Card", "Bank-Statement"];

    for (const key in formData) {
      if (formData[key] === "" && key !== "payment") {
        setErr(`${key} is required !!`)
        setTimeout(() => {
          setErr("")
        }, 3000)
        return; 
      }
    }

    
    for (const imageName of checkImage) {
      const uploadedImage = imageUpload.find(img => img.name === imageName);
      // console.log(uploadedImage.file)
  
      if (!uploadedImage) {
        setErr(`${imageName} is required !!`)
        setTimeout(() => {
          setErr("")
        }, 3000)
        return;
      }
    }
    console.log("err")
    try {
      // if(formData.payment === ""){ 
      //   initiatePayment()
      // }
      // else {
        try {
            
          await firebase.submitITR(formData, [props.heading]).then(async() => {
              await imageUpload.forEach(async (element) => {
                await firebase.submitITRimages(element, [props.heading])
                .then(() => 
                  navigate('/')
                )
                // console.log("working");
              });
          });

          setIsUpload(true);
          // localStorage.setItem("formData", "");
          // localStorage.setItem("checkboxes", "");
          
          setError(false);
        } catch (error) {
          setError(true);
          setIsUpload(false);
        }
      // }
    } catch(err) {
      console.log(err)
    }
    // window.location.reload();
  };
  const handleCommon = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;

    if (checked && !formData.startingIncome.includes(name)) {
      formData.startingIncome.push(name);
    }
    if (!checked && formData.startingIncome.includes(name)) {
      const ans = formData.startingIncome.indexOf(name);
      formData.startingIncome.splice(ans, 1);
    }

    // console.log(formData.startingIncome);
    // console.log(formData);

    setCheckbox({ ...CheckBox, [name]: checked });
  };

  const imageSet = (name, file) => {
    setImageUpload([
      ...imageUpload,
      {
        name: name,
        file: file,
      },
    ]);
    // console.log(imageUpload);
  };
  const fetchData = async () => {
    // firebase.getData()
    // console.log("prehello");
    await firebase.getData().then((rs) => {
      if (rs) {
        setFormData(rs);
        // console.log(rs)
        // console.log(rs[props.heading].status)
        setFiledITR(rs.serve)
        setIsSubmit(true);
        if(rs[props.heading]) {
          if(rs[props.heading].status !== "pending") {
            setAdminMSG(rs[props.heading].message)
          }
          if(rs[props.heading].status === "reject") {
            // setIsSubmit(false);
            setReject(true)
            handleCommon(props.heading, {
              message: rs[props.heading].message,
              status: "pending",
            });
            handleCommon("payment", rs.payment);
          }
        }
      } else {
        handleCommon(props.heading, {message: "Pending", status: "pending" });
      }

      handleCommon("serve", props.heading);
    });
  };
  
  
  useEffect(() => {
    const form_data = localStorage.getItem("formData");
    const checking = localStorage.getItem("checkboxes");
    // console.log(form_data);
    if (form_data) {
      setFormData(JSON.parse(form_data));
    } else {
      fetchData();
    }
    if (checking) {
      setCheckbox(JSON.parse(checking));
    }
  }, []);

  const loadingUI = <div className="spin"></div>;
  return (
    <div class="full_form">
      {firebase.isloading ? (
        loadingUI
      ) : (
        <div class="itrform signcont">
          <form>
            <h2 class="text-black">{props.heading}</h2>
            <Common
              imageData={imageSet}
              formData={formData}
              handleProps={handleCommon}
            />
            <div className="field">
              <label htmlFor="" className="titles">
                Please Select one starting income : &#42;
              </label>
              <div className="income">
                <input
                  type="checkbox"
                  value="1"
                  name="Salary"
                  onChange={handleCheckbox}
                />
                <label htmlFor="">Salary</label>
                <input
                  type="checkbox"
                  value="2"
                  name="Property"
                  onChange={handleCheckbox}
                />
                <label htmlFor="">House Property</label>
                {props.fieldArea.includes("CG") && (
                  <>
                    <input
                      type="checkbox"
                      value="2"
                      name="Capital"
                      onChange={handleCheckbox}
                    />
                    <label htmlFor="">Capital Gains</label>
                  </>
                )}
                {props.fieldArea.includes("PGBP") && (
                  <>
                    <input
                      type="checkbox"
                      value="2"
                      name="profession"
                      onChange={handleCheckbox}
                    />
                    <label htmlFor="">
                      Profits & Gain form Business or Profession
                    </label>
                  </>
                )}
                <input
                  type="checkbox"
                  value="3"
                  name="OtherIncome"
                  onChange={handleCheckbox}
                />
                <label htmlFor="">Other Income</label>
              </div>

              <div className="files wrapper">
                {CheckBox.Salary && (
                  <>
                    <div className="first-box">
                      <label htmlFor="" className="titles">
                        Form 16
                      </label>
                      <input
                        required
                        type="file"
                        accept=".jpeg,.png,.jpg"
                        name="Form 16"
                        onChange={(event) => {
                          imageSet(event.target.name, event.target.files[0]);
                        }}
                      />
                    </div>
                    <div className="first-box">
                      <label htmlFor="" className="titles">
                        Monthly Salary Slips (if not included in FORM-16)
                      </label>
                      <input
                        type="file"
                        accept=".jpeg,.png,.jpg"
                        name="monthly-salary-slip"
                        onChange={(event) => {
                          imageSet(event.target.name, event.target.files[0]);
                        }}
                      />
                    </div>
                    <div className="first-box">
                      <label htmlFor="" className="titles">
                        Salary Slips if not included in form 16
                      </label>
                      <input
                        type="file"
                        accept=".jpeg,.png,.jpg"
                        name="salary-slip-not16"
                        onChange={(event) => {
                          imageSet(event.target.name, event.target.files[0]);
                        }}
                      />
                    </div>
                    <div className="first-box">
                      <label htmlFor="" className="titles">
                        Annual Information Statement
                      </label>
                      <input
                        type="file"
                        accept=".jpeg,.png,.jpg"
                        name="Annual-Information"
                        onChange={(event) => {
                          imageSet(event.target.name, event.target.files[0]);
                        }}
                      />
                    </div>
                  </>
                )}
                {CheckBox.Property && (
                  <>
                    <div className="first-box">
                      <label htmlFor="" className="titles">
                        Rent Agreement
                      </label>
                      <input
                        type="file"
                        accept=".jpeg,.png,.jpg"
                        name="Rent-Agreement"
                        onChange={(event) => {
                          imageSet(event.target.name, event.target.files[0]);
                        }}
                      />
                    </div>
                    <div className="first-box">
                      <label htmlFor="" className="titles">
                        Loan Interest Certificate for Claiming Deductions
                      </label>
                      <input
                        type="file"
                        accept=".jpeg,.png,.jpg"
                        name="interest-deduction"
                        onChange={(event) => {
                          imageSet(event.target.name, event.target.files[0]);
                        }}
                      />
                    </div>
                    <div className="first-box">
                      <label htmlFor="" className="titles">
                        Municipal Tax Receipt
                      </label>
                      <input
                        type="file"
                        accept=".jpeg,.png,.jpg"
                        name="Municipal-Tax"
                        onChange={(event) => {
                          imageSet(event.target.name, event.target.files[0]);
                        }}
                      />
                    </div>
                    <div className="first-box">
                      <label htmlFor="" className="titles">
                        Sale Deed of new property
                      </label>
                      <input
                        type="file"
                        accept=".jpeg,.png,.jpg"
                        name="sale-deed"
                        onChange={(event) => {
                          imageSet(event.target.name, event.target.files[0]);
                        }}
                      />
                    </div>
                  </>
                )}

                {CheckBox.OtherIncome && (
                  <>
                    <div className="first-box">
                      <label htmlFor="" className="titles">
                        Proof of Dividend
                      </label>
                      <input
                        type="file"
                        accept=".jpeg,.png,.jpg"
                        name="proof-dividend"
                        onChange={(event) => {
                          imageSet(event.target.name, event.target.files[0]);
                        }}
                      />
                    </div>
                    <div className="first-box">
                      <label htmlFor="" className="titles">
                        Fixed Deposit Interest Statement
                      </label>
                      <input
                        type="file"
                        accept=".jpeg,.png,.jpg"
                        name="Fixed-Deposit-Interest"
                        onChange={(event) => {
                          imageSet(event.target.name, event.target.files[0]);
                        }}
                      />
                    </div>
                    <div className="first-box">
                      <label htmlFor="" className="titles">
                        Any other income from Interest
                      </label>
                      <input
                        type="file"
                        accept=".jpeg,.png,.jpg"
                        name="other-income-interest"
                        onChange={(event) => {
                          imageSet(event.target.name, event.target.files[0]);
                        }}
                      />
                    </div>
                  </>
                )}
                {Error && <div>Error please Select Image</div>}
              </div>
            </div>

            {CheckBox.Capital && (
              <>
                <div className="field">
                  <label htmlFor="" className="titles">
                    Capital Gains : &#42;
                  </label>
                  <div className="income">
                    <input
                      type="checkbox"
                      value="1"
                      name="landproperty"
                      onChange={handleCheckbox}
                    />
                    <label htmlFor="">Land/Property</label>
                    <input
                      type="checkbox"
                      value="2"
                      name="sharesmutual"
                      onChange={handleCheckbox}
                    />
                    <label htmlFor="">Shares/Mutual Property</label>
                  </div>

                  <div className="files wrapper">
                    {CheckBox.landproperty && (
                      <>
                        <div className="first-box">
                          <label htmlFor="" className="titles">
                            Proof of Sale / Sale Deed
                          </label>
                          <input
                            type="file"
                            accept=".jpeg,.png,.jpg"
                            name="proof-of-sale"
                            onChange={(event) => {
                              setImageUpload([
                                ...imageUpload,
                                {
                                  name: event.target.name,
                                  file: event.target.files[0],
                                },
                              ]);
                            }}
                          />
                        </div>
                        <div className="first-box">
                          <label htmlFor="" className="titles">
                            Proof of Purchase
                          </label>
                          <input
                            type="file"
                            accept=".jpeg,.png,.jpg"
                            name="Proof-of-Purchase"
                            onChange={(event) => {
                              setImageUpload([
                                ...imageUpload,
                                {
                                  name: event.target.name,
                                  file: event.target.files[0],
                                },
                              ]);
                            }}
                          />
                        </div>
                        <div className="first-box">
                          <label htmlFor="" className="titles">
                            Proof of Exemptions (if any)
                          </label>
                          <input
                            type="file"
                            accept=".jpeg,.png,.jpg"
                            name="Proof-of-Exemptions"
                            onChange={(event) => {
                              setImageUpload([
                                ...imageUpload,
                                {
                                  name: event.target.name,
                                  file: event.target.files[0],
                                },
                              ]);
                            }}
                          />
                        </div>
                      </>
                    )}
                    {CheckBox.sharesmutual && (
                      <>
                        <div className="first-box">
                          <label htmlFor="" className="titles">
                            Contract Note
                          </label>
                          <input
                            type="file"
                            accept=".jpeg,.png,.jpg"
                            name="Contract-Note"
                            onChange={(event) => {
                              setImageUpload([
                                ...imageUpload,
                                {
                                  name: event.target.name,
                                  file: event.target.files[0],
                                },
                              ]);
                            }}
                          />
                        </div>
                        <div className="first-box">
                          <label htmlFor="" className="titles">
                            Holding Certificate
                          </label>
                          <input
                            type="file"
                            accept=".jpeg,.png,.jpg"
                            name="Holding-Certificate"
                            onChange={(event) => {
                              setImageUpload([
                                ...imageUpload,
                                {
                                  name: event.target.name,
                                  file: event.target.files[0],
                                },
                              ]);
                            }}
                          />
                        </div>
                        <div className="first-box">
                          <label htmlFor="" className="titles">
                            P&L Statement and Ledger
                          </label>
                          <input
                            type="file"
                            accept=".jpeg,.png,.jpg"
                            name="P&L-Statement"
                            onChange={(event) => {
                              setImageUpload([
                                ...imageUpload,
                                {
                                  name: event.target.name,
                                  file: event.target.files[0],
                                },
                              ]);
                            }}
                          />
                        </div>
                      </>
                    )}

                    {CheckBox.OtherIncome && (
                      <>
                        <div className="first-box">
                          <label htmlFor="" className="titles">
                            Proof of Dividend
                          </label>
                          <input
                            type="file"
                            accept=".jpeg,.png,.jpg"
                            name="proof-dividend"
                            onChange={(event) => {
                              setImageUpload([
                                ...imageUpload,
                                {
                                  name: event.target.name,
                                  file: event.target.files[0],
                                },
                              ]);
                            }}
                          />
                        </div>
                        <div className="first-box">
                          <label htmlFor="" className="titles">
                            Fixed Deposit Interest Statement
                          </label>
                          <input
                            type="file"
                            accept=".jpeg,.png,.jpg"
                            name="Fixed-Deposit-Interest"
                            onChange={(event) => {
                              setImageUpload([
                                ...imageUpload,
                                {
                                  name: event.target.name,
                                  file: event.target.files[0],
                                },
                              ]);
                            }}
                          />
                        </div>
                        <div className="first-box">
                          <label htmlFor="" className="titles">
                            Any other income from Interest
                          </label>
                          <input
                            type="file"
                            accept=".jpeg,.png,.jpg"
                            name="other-income-interest"
                            onChange={(event) => {
                              setImageUpload([
                                ...imageUpload,
                                {
                                  name: event.target.name,
                                  file: event.target.files[0],
                                },
                              ]);
                            }}
                          />
                        </div>
                      </>
                    )}
                    {Error && <div>Error please Select Image</div>}
                  </div>
                </div>
              </>
            )}
            {CheckBox.profession && (
              <>
                <div className="field">
                  <label htmlFor="" className="titles">
                    Do you have Books of Accounts Prepared?
                  </label>
                  <div className="income">
                    <input
                      type="radio"
                      value="1"
                      name="booksofaccount"
                      onChange={handleCheckbox}
                    />
                    <label htmlFor="">Yes</label>
                    <input
                      type="radio"
                      value="2"
                      name="booksofaccount"
                      onChange={handleCheckbox}
                    />
                    <label htmlFor="">No</label>
                  </div>

                  {/* //if yes then show documents */}

                  <div className="first-box">
                    <label htmlFor="" className="titles">
                      Income and Expense Statement
                    </label>
                    <input
                      type="file"
                      accept=".jpeg,.png,.jpg"
                      name="income-expense-statement"
                      onChange={(event) => {
                        setImageUpload([
                          ...imageUpload,
                          {
                            name: event.target.name,
                            file: event.target.files[0],
                          },
                        ]);
                      }}
                    />
                  </div>

                  <div className="first-box">
                    <label htmlFor="" className="titles">
                      Current Statements
                    </label>
                    <input
                      type="file"
                      accept=".jpeg,.png,.jpg"
                      name="current-statement"
                      onChange={(event) => {
                        setImageUpload([
                          ...imageUpload,
                          {
                            name: event.target.name,
                            file: event.target.files[0],
                          },
                        ]);
                      }}
                    />
                  </div>
                  <div className="first-box">
                    <label htmlFor="" className="titles">
                      Books of Accounts
                    </label>
                    <input
                      type="file"
                      accept=".jpeg,.png,.jpg"
                      name="Book-Accounts"
                      onChange={(event) => {
                        setImageUpload([
                          ...imageUpload,
                          {
                            name: event.target.name,
                            file: event.target.files[0],
                          },
                        ]);
                      }}
                    />
                  </div>

                  {/* //if no then show documents */}
                  <label htmlFor="">Drop your contact number</label>
                  <input type="text" name="conatact-number" id="" />
                </div>
              </>
            )}

            <div className="payment">
              <p className="payment-text">
                If you have any confusion regarding the form or documents you
                can call us at: +91 80006 85556
              </p>
              <div className="price">{props.price}</div>
              
              {/* display error */}
              <h3 style={{color: "red", textAlign: "center"}}>{err}</h3>
              

            </div>
            {(props.heading === filedITR) && (formData.payment !== "") && formData[props.heading].status !== "accept" && reject &&
            <div className="button">
              <button onClick={putData} type="submit">
                Submit
              </button>
            </div>
            }
            
            {isSubmit && props.heading === filedITR &&
            <div className="preview button">
              <Preview heading={props.heading} />
            </div>
            }
            {props.heading === filedITR && formData[props.heading].status === "accept" &&
              <div className="preview button">
              <Modal service = {props.heading} adminmsg={adminMSG} />
            </div>
            }
            
            {
              filedITR && props.heading !== filedITR && 
              <>
                <h3 style={{color: "red", textAlign: "center"}}>Already filled One ITR !!</h3>
              </>
              
            }

            {adminMSG && <h3 style={{color: "red", textAlign: "center"}}><span style={{color: "black"}}>Admin Message: </span>{adminMSG}</h3>}
          </form>


          {!isSubmit && (formData.payment === "") &&
          <div className="button">
            <button onClick={putData}>Complete Order Now</button>
          </div>
          }
        </div>
      )}
    </div>
  );
}

export default ItrForm;
