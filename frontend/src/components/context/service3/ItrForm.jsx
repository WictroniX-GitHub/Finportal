import React, { useState, useEffect } from "react";
import { useFirebase } from "../firebaseContext";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import Preview from "../layout/Preview";
import "../ItrForm.css";
import Common from "../layout/Common";
function ItrForm(props) {
  const firebase = useFirebase();
  const [imageUpload, setImageUpload] = useState([]);
  const [Error, setError] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const [CheckBox, setCheckbox] = useState({
    Salary: false,
    Property: false,
    OtherIncome: false,
  });

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phoneno: "",
    email: "",
    Balancesheet: "",
    password: "",
    linked: "",
    startingIncome: [],
    status: "false",
    message: "Pending",
    service: props.heading
  });
  const localData = (e) => {
    e.preventDefault();
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("checkboxes", JSON.stringify(CheckBox));
  };
  const putData = async (event) => {
    event.preventDefault();
    try {
      console.log("startttt");
      await imageUpload.forEach((element) => {
        console.log("working");
        firebase.submitITR(formData, element,props.heading);
      });
      console.log("endd...");
      setIsUpload(true);
      localStorage.setItem("formData", "");
      localStorage.setItem("checkboxes", "");
      // const data = await firebase.submitITR(formData);
      // console.log(data);
      console.log("end2222");
      setError(false);
      console.log(Error);
    } catch (error) {
      setError(true);
      setIsUpload(false);
    }
    // window.location.reload();
  };
  const handleCommon = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };
  const handleCheckbox = (event) => {
    const { name, checked, value } = event.target;

    if (checked && !formData.startingIncome.includes(name)) {
      formData.startingIncome.push(name);
    }
    if (!checked && formData.startingIncome.includes(name)) {
      const ans = formData.startingIncome.indexOf(name);
      formData.startingIncome.splice(ans, 1);
    }

    console.log(formData.startingIncome);
    console.log(formData);

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
    console.log(imageUpload);
  };

  
  useEffect(() => {
    const form_data = localStorage.getItem("formData");
    const checking = localStorage.getItem("checkboxes");
    // console.log(form_data);
    if (form_data) {
      setFormData(JSON.parse(form_data));
    } else {
      // firebase.getData()
      console.log("prehello");
      firebase.getData().then((rs) => {
        if (rs.data()) {
          // console.log(rs.data());
          setFormData(rs.data());
          setFormData({...formData,service:props.heading})
        }
      });
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
                {props.fieldArea.includes("CG")&&<><input
                  type="checkbox"
                  value="2"
                  name="Capital"
                  onChange={handleCheckbox}
                />
                <label htmlFor="">Capital Gains</label></> }
                {props.fieldArea.includes("PGBP") && <><input
                  type="checkbox"
                  value="2"
                  name="profession"
                  onChange={handleCheckbox}
                />
                <label htmlFor="">
                  Profits & Gain form Business or Profession
                </label></>
                }
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
                        type="file" accept=".jpeg,.png,.jpg"
                       
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
                        type="file" accept=".jpeg,.png,.jpg"
                       
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
                        type="file" accept=".jpeg,.png,.jpg"
                        
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
                        type="file" accept=".jpeg,.png,.jpg"
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
                        type="file" accept=".jpeg,.png,.jpg"
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
                        type="file" accept=".jpeg,.png,.jpg"
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
                        type="file" accept=".jpeg,.png,.jpg"
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
                        type="file" accept=".jpeg,.png,.jpg"
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
                        type="file" accept=".jpeg,.png,.jpg"
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
                        type="file" accept=".jpeg,.png,.jpg"
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
                        type="file" accept=".jpeg,.png,.jpg"
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
                            type="file" accept=".jpeg,.png,.jpg"
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
                            type="file" accept=".jpeg,.png,.jpg"
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
                            type="file" accept=".jpeg,.png,.jpg"
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
                            type="file" accept=".jpeg,.png,.jpg"
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
                            type="file" accept=".jpeg,.png,.jpg"
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
                            type="file" accept=".jpeg,.png,.jpg"
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
                            type="file" accept=".jpeg,.png,.jpg"
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
                            type="file" accept=".jpeg,.png,.jpg"
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
                            type="file" accept=".jpeg,.png,.jpg"
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
                      type="file" accept=".jpeg,.png,.jpg"
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
                      type="file" accept=".jpeg,.png,.jpg"
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
                      type="file" accept=".jpeg,.png,.jpg"
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
              <div className="button">
                <button>Complete Order Now</button>
              </div>
            </div>

            <div className="button">
              <button onClick={putData} type="submit">
                Submit
              </button>
            </div>

            <div className="preview button">
              <Preview heading={props.heading}/>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ItrForm;
