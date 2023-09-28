import React from "react";
import { useState, useEffect } from "react";
import { useFirebase } from "../firebaseContext";
import { listAll, getDownloadURL, ref } from "firebase/storage";
function Preview(props) {
  const firebase = useFirebase();

  const [imageList, setImageList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = (event) => {
    event.preventDefault();
    setIsModalOpen(false);
  };
  useEffect(() => {
    const imageListRef = ref(firebase.storage, `Documents/${firebase.isUser}/${props.heading}`);
    const fetchImages = async () => {
      try { 
        const res = await listAll(imageListRef);
        const newImages = await Promise.all(
          res.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return { url, name: item.name };
          })
        );
        setImageList(newImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [firebase.isUser]);
  return (
    <div>
      {!isModalOpen?<button onClick={openModal}>Preview Document</button>:
      <button onClick={closeModal}>Close</button>}
      {isModalOpen && (
        <div className="image-list">
          <h1>List of Images</h1>
          {imageList ? (
            imageList.map((image, index) => (
              <div key={index}>
                <img src={image.url} alt="loading" />
                <p>{image.name}</p>
              </div>
            ))
            ) : (
              <p>Please Submit Documents...</p>
              )}
        </div>
      )}
    </div>
  );
}

export default Preview;
