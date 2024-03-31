import React, { useEffect, useState } from "react";

import { useFirebase } from "../context";

export const Modal = (props) => {
  const firebase = useFirebase();
  // const [modal,setModal] = useState(false);
  const [itrfile, setItrfile] = useState(null);

  // console.log(props.adminmsg)

  // const FetchITR = () => {
  //   firebase.FetchPdf(props.service)
  //   .then((url) => {
  //     setItrfile(url);
  //     // console.log(url);
  //   })


  //   //  setModal(true);
  // };

  useEffect(() => {
    firebase.FetchPdf(props.service)
    .then((url) => {
      setItrfile(url);
      // console.log(url);
    })
  }, [])
  // console.log(itrfile)

  const handleClick = (event) => {
    
    if(itrfile === null ) {
      event.preventDefault();
    }
  }

  return (
    <div style={{margin:"2vh"}}>
      
        {/* <a href={itrfile} target="_blank"  onClick={FetchITR}>
          View ITRFile
        </a> */}

      { 
        itrfile ?
        <button onClick={handleClick}>
          <a href={itrfile} target="_blank">
            View ITRFile
          </a>
        </button>
        :
        <h3 style={{color: "gray"}}>Under Process...</h3>
      }
       
    </div>
  );
};
export default Modal;

        {/* :
        <h3 style={{color: "red"}}>
        {
          (props.adminmsg) 
          ? 
          <><span style={{color: "black"}}>Admin Message: </span>{props.adminmsg}</>
          :
          "In Process ..."
        }
        </h3> */}