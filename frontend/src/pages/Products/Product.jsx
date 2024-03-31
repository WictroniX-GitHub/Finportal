import React, { useState } from 'react'
import { useFirebase } from '../../components/context/firebaseContext';

const Product = (props) => {

    const firebasee = useFirebase();
    const [imageUpload, setImageUpload] = useState(null);
    const [message, setmessage] = useState("");

    const putData = async (event) => {
        event.preventDefault();
        try {
            firebasee.submitITRFilebyadmin(imageUpload, props.service, props.document.id).then(() => {
                console.log("done")
                setmessage("File Uploaded !!")
                setTimeout(() => {
                setmessage("")
                }, 3000)
            })
        } catch (error) {
            console.log(error);
        }
        // window.location.reload();
    };


    const imageSet = (name, file) => {
        setImageUpload(
            {
            name: name,
            file: file,
            },
        );
    };

    // console.log(props)
  return (
    <>
    <tr>
        {/* <td>{document.id}</td> */}
        <td>{props.document.firstname + " " + props.document.lastname}</td>
        <td>{props.document.email}</td>
        <td>{props.document[props.service].message}</td>
        <td>{props.document[props.service].status}</td>
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
            {message && <span style={{ marginLeft: "1vh",padding: "2vh",width:"20vh", height:"2vh", color: "white", textAlign: "center", fontSize:"2vh" ,backgroundColor: "green"}}>{message}</span>}
            </div>
        </td>
    </tr>
    </>
  )
}

export default Product