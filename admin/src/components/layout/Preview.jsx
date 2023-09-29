import React from "react";
import { useState, useEffect } from "react";
import { useFirebase } from "../context/firebaseContext";
import { listAll, getDownloadURL, ref } from "firebase/storage";

import UserData from "./UserData";

function Preview({document,services,filters}) {
  const firebase = useFirebase();
  const [info, setinfo] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setmessage] = useState("");
  const [imageUpload, setImageUpload] = useState([]);
  const [orders, setOrders] = useState([]);
  const handleChange = (event) => {
    console.log(event.target.value);
    setmessage(event.target.value);
  };
  const openModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
    firebase.getData(document.id).then((rs) => {
      console.log(rs.data());
      setinfo(rs.data());
    });
    console.log(info);

  };
  const handlebar = async (document) => {
    // event.preventDefault()
    console.log(document);    
    document.service.map(serv => {
      console.log(serv)
    if(services == serv.servicename){
      serv.message = message;
      serv.status = filters
     return;
    }
    })
    console.log(document)
    firebase.updateMessage(document).then((data) => {
      console.log(data);
    });
    setmessage("");
    userData();
    // window.location.reload();
  };
  const userData = () => {
    firebase.getUser().then((result) => {
      const dataArr = [];
      result.forEach((doc) => {
        dataArr.push({ id: doc.id, ...doc.data() });
      });
      setOrders(dataArr);
      console.log(orders);
    });
  };
  const acceptData = async (document) => {
    document.service.map(serv => {
      console.log(serv)
    if(services == serv.servicename){
      serv.message = message;
      serv.status = "accept"
     return;
    }
    })
    await firebase.updateMessage(document);
    userData();
  };
  const closeModal = (event) => {
    event.preventDefault();
    setIsModalOpen(false);
  };
  useEffect(() => {
    const imageListRef = ref(firebase.storage, `Documents/${document.id}`);
    const fetchImages = async () => {
      try {
        console.log(services)
        const res = await listAll(imageListRef);
        const newImages = await Promise.all(
          res.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return { url, name: item.name };
          })
        );
        setImageList(newImages);
        // console.log(imageList);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [firebase.isUser]);
  return (
    <div className="modal-container">
      <button onClick={openModal}>Open Modal</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Modal Content</h2>
            <div className="image-list">
              <UserData {...info} />
              <h1>List of Images</h1>
              {imageList ? (
                imageList.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.url}
                      alt="loading"
                      width="400"
                      height="400"
                    />
                    <p>{image.name}</p>
                  </div>
                ))
              ) : (
                <p>Please Submit Documents...</p>
              )}
            </div>
            <button
              onClick={() => {
                acceptData(document);
              }}
              style={{
                width: "70px",
                fontSize: "10px",
                display: "inline-block",
              }}
            >
              Accept
            </button>
            <input
              style={{ width: "100px", display: "inline-block" }}
              type="text"
              onChange={handleChange}
              placeholder="Message"
            />
            <button
              style={{
                width: "70px",
                fontSize: "10px",
                display: "inline-block",
              }}
              onClick={() => handlebar(document)}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Preview;
