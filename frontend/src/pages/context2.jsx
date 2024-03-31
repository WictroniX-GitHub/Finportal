import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  signOut,
  onAuthStateChanged,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  addDocs,
  getDocs,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getDatabase, set, ref as mihir, get, child } from "firebase/database";

// context api
const firebaseContext = createContext(null);

// Madhvesh Firebase API
// const firebaseConfig = {
//   apiKey: "AIzaSyDbF8gyfgZYANqyWAB72QRireh8ma7GE3A",
//   authDomain: "finportal-37d63.firebaseapp.com",
//   databaseURL: "https://finportal-37d63-default-rtdb.firebaseio.com",
//   projectId: "finportal-37d63",
//   storageBucket: "finportal-37d63.appspot.com",
//   messagingSenderId: "688216393507",
//   appId: "1:688216393507:web:02c884cc0601f328c02e96",
// };

// Dhanish Firebase API
// const firebaseConfig = {
//   apiKey: "AIzaSyD6MQy2d-bOJKE0QruR_IQahNue5A0LrDI",
//   authDomain: "finportal-4d01f.firebaseapp.com",
//   databaseURL: "https://finportal-4d01f-default-rtdb.firebaseio.com/",
//   projectId: "finportal-4d01f",
//   storageBucket: "finportal-4d01f.appspot.com",
//   messagingSenderId: "691533092881",
//   appId: "1:691533092881:web:499ab1cd636543223979b0",
// };

// Aaryan Firebase API
// const firebaseConfig = {
//   apiKey: "AIzaSyBT945IYFy9Tkg_cqBdrirwu-oHxPviLBw",
//   authDomain: "finportal-e0cbf.firebaseapp.com",
//   projectId: "finportal-e0cbf",
//   storageBucket: "finportal-e0cbf.appspot.com",
//   messagingSenderId: "896200911693",
//   appId: "1:896200911693:web:fed94ead60d9ca7a74a504",
//   databaseURL: "https://finportal-e0cbf-default-rtdb.firebaseio.com",
// };


// Mihir Firebase API
// console.log(process.env.REACT_APP_API_KEY)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_DOMAIN_NAME,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_API_ID
};

//Firebase Instances
export const useFirebase = () => useContext(firebaseContext);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const googleprovider = new GoogleAuthProvider();
// firebase.initializeApp(firebaseConfig);
export const FirebaseApp = (props) => {
  const [isloading, setIsLoading] = useState(true);
  const [isUser, setIsUser] = useState("Loading");
  const [data, setData] = useState([]);

  // registeration of user..
  const createUser = async (email, password) => {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  };
  // login user..
  const signInUser = async (email, password) => {
    const usersRef = mihir(db);


    const fetching = await get(child(usersRef, "admin"));
    const users = fetching.val()

    const filteredUser = Object.values(users).find(dbemail => dbemail === email) || null;


    if(filteredUser){
      const user = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } else {
      return {msg: "Invalid credentials !!"}
    }
  };
  // logout user..
  const signOutUser = async () => {
    return await signOut(auth);
  };

  // realtime Database for user info..
  const storeInfo = async (userCredential, data) => {
    const user = await set(
      mihir(db, "users/" + userCredential.user.uid),
      data
    );
    return user;
  };
  // fetch one user
  const getData = async (user) => {
    const rs = await getDoc(doc(firestore, `users/${user}`));
    return rs;
  };

  // updating ITR details in user uid`
  const submitITR = async (userData, coverImage) => {
    const storeRef = ref(
      storage,
      `Documents/${isUser}/${coverImage.name}-${coverImage.file.name}`
    );
    const resultBucket = await uploadBytes(storeRef, coverImage.file);

    return await setDoc(doc(firestore, "users", isUser), {
      ...userData,
      // imageUrl: resultBucket.ref.fullPath,
    });
  };


  const updateMessage = async (document) => {
    const updateValue = {
      message: document.message,
      status: document.status,
    };

    const folderRef = ref(storage, `Documents/${document.id}`);
    listAll(folderRef).then((result) => {
      result.items.forEach((itemRef) => {
        // Delete each item (file) in the folder
        deleteObject(itemRef);
      });
    });
    return await updateDoc(doc(firestore, "users", document.id), updateValue);
  };

  
   //Upload ITRFORM File the Admin side

   const submitITRFilebyadmin = async (coverImage) => {
    const filename = coverImage.file.name.split(".")
    // console.log(filename.length)
    const format = "."+filename[filename.length-1];
    console.log(format)
    const storeRef = ref(
      storage,
      `Documents/${isUser}/Admin/ITRFILE-${isUser}${format}`
    );
    const resultBucket = await uploadBytes(storeRef, coverImage.file);
  };

  // list all details of user
  const listDocs = async () => {
    const res = await listAll(ref(storage, `Documents/${isUser}`));
    return res;
  };
  const getUser = async () => {
    const collectionRef = collection(firestore, "users");
    // const q = query(collectionRef, where("userId", "==", "rApylQJz61NMJT3CrCtxojg7tdc2"));
    const result = await getDocs(collectionRef);
    return result;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (userFound) => {
      if (userFound) {
        const uid = userFound.uid;
        return setIsUser(uid);
      } else {
        setIsUser(false);
      }
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  //sign in with google
  const signupWithGoogle = () => {
    signInWithPopup(auth, googleprovider);
  };

  //Handle Delete User
  const handleDelete = async (id) => {
    console.log("Handle button cilcked");
    try {
      //storage photo delete
      const folderRef = ref(storage, `Documents/${id}`);
      listAll(folderRef).then((result) => {
        result.items.forEach((itemRef) => {
          // Delete each item (file) in the folder
          deleteObject(itemRef);
        });
      });

      await deleteDoc(doc(firestore, "users", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const isLoggedIn = isUser ? true : false;

  

  return (
    <firebaseContext.Provider
      value={{
        signInUser,
        createUser,
        storeInfo,
        submitITR,
        isUser,
        isLoggedIn,
        signOutUser,
        isloading,
        listDocs,
        storage,
        signupWithGoogle,
        getData,
        // FetchPdf,
        // payment,
        // submitITRimages
      }}
    >
      {props.children}
    </firebaseContext.Provider>
  );
};
