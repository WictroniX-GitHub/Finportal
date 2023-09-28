import React from 'react'
 
function UserData(props) {
  return (
    <div>
    firstname:      <h3 style={{display:'inline-block',padding:"10px"}}>          {props.firstname}</h3><br />
    lastname:       <h3 style={{display:'inline-block',padding:"10px"}}>         {props.lastname}</h3><br />
    phoneno:        <h3 style={{display:'inline-block',padding:"10px"}}>        {props.phoneno}</h3> <br />
    email:          <h3 style={{display:'inline-block',padding:"10px"}}>      {props.email}</h3> <br />
    message:        <h3 style={{display:'inline-block',padding:"10px"}}>        {props.message}</h3><br /> 
    Preference:     <h3 style={{display:'inline-block',padding:"10px"}}>           {props.Prefrence}</h3> <br />
    password:       <h3 style={{display:'inline-block',padding:"10px"}}>         {props.password}</h3> <br />
    linked:         <h3 style={{display:'inline-block',padding:"10px"}}>       {props.linked}</h3> <br />
    startingIncome: <h3 style={{display:'inline-block',padding:"10px"}}>               {props.startingIncome}</h3><br /> 
    status:         <h3 style={{display:'inline-block',padding:"10px"}}>       {props.status}</h3>  <br />
    </div>
  )
}

export default UserData