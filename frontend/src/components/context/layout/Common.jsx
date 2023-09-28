import React, { useEffect } from "react";

function Common({ formData, handleProps, imageData }) {
  const handleData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    handleProps(name, value);
  };
  const handleImage = (e) => {
    e.preventDefault();
    imageData(e.target.name, e.target.files[0]);
    // const {}
  };
  return (
    <div>
      
      <div className="field">
        <label htmlFor="text" className="titles">
          First-name &#42;
        </label>
        <input
          type="text"
          value={formData.firstname}
          name="firstname"
          onChange={handleData}
        />
      </div>
      <div className="field">
        <label htmlFor="" className="titles">
          Last-name &#42;
        </label>
        <input
          type="text"
          value={formData.lastname}
          name="lastname"
          onChange={handleData}
        />
      </div>
      <div className="field">
        <label htmlFor="" className="titles">
          Phone-Number &#42;
        </label>
        <input
          type="text"
          value={formData.phoneno}
          name="phoneno"
          onChange={handleData}
        />
      </div>
      <div className="field">
        <label htmlFor="" className="titles">
          Email &#42;
        </label>
        <input
          type="text"
          value={formData.email}
          name="email"
          onChange={handleData}
        />
      </div>
      <div className="field">
        <label htmlFor="" className="titles">
          Do you want us to prepare your balancesheet? &#42;
        </label>
        <div className="balancesheet">
          <input
            type="radio"
            name="Balancesheet"
            value="true"
            checked={formData.Balancesheet === "true"?true:false}
            onChange={handleData}
          />
          <label htmlFor="">Yes</label>

          <input
            type="radio"
            name="Prefrence"
            value="false"
            onChange={handleData}
            checked={formData.Prefrence === "false"}
          />
          <label htmlFor="">No</label>
        </div>
      </div>
      <div className="field">
        <label htmlFor="" className="titles">
          Password &#42;
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleData}
        />
      </div>
      <div className="field">
        <label htmlFor="" className="titles">
          Have you linked your PAN with Aadhar? &#42;
        </label>
        <div className="balancesheet">
          <input
            type="radio"
            name="linked"
            value="Yes"
            onChange={handleData}
            checked={formData.linked === "Yes"}
          />
          <label htmlFor="">Yes</label>

          <input
            type="radio"
            name="linked"
            value="No"
            onChange={handleData}
            checked={formData.linked === "No"}
          />
          <label htmlFor="">No</label>
        </div>
      </div>
      <div className="first-box">
        <label htmlFor="" className="titles">
          Pan-Card
        </label>
        <input type="file" accept=".jpeg,.png,.jpg" name="Pan-Card" onChange={handleImage} />
      </div>
      <div className="first-box">
        <label htmlFor="" className="titles">
          Addhhar Card
        </label>
        <input type="file" accept=".jpeg,.png,.jpg" name="Addhhar-Card" onChange={handleImage} />
      </div>
      <div className="first-box">
        <label htmlFor="" className="titles">
          Bank Statement
        </label>
        <input type="file" accept=".jpeg,.png,.jpg" name="Bank-Statement" onChange={handleImage} />
      </div>
    </div>
  );
}

export default Common;
