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
  deleteDoc,
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
// const secondaryApp = {
//   apiKey: "AIzaSyDbF8gyfgZYANqyWAB72QRireh8ma7GE3A",
//   authDomain: "finportal-37d63.firebaseapp.com",
//   databaseURL: "https://finportal-37d63-default-rtdb.firebaseio.com",
//   projectId: "finportal-37d63",
//   storageBucket: "finportal-37d63.appspot.com",
//   messagingSenderId: "688216393507",
//   appId: "1:688216393507:web:02c884cc0601f328c02e96",
// };

// Dhanish Firebase API
// const secondaryAppConfig = {
//   apiKey: "AIzaSyDcZZqM60_U-HaM9XnZSbfVIuxwZv9RFyU",
//   authDomain: "fir-project-38425.firebaseapp.com",
//   databaseURL: "https://fir-project-38425-default-rtdb.firebaseio.com",
//   projectId: "fir-project-38425",
//   storageBucket: "fir-project-38425.appspot.com",
//   messagingSenderId: "412992568512",
//   appId: "1:412992568512:web:7f9782ac6872723873c125",
// };

// Aaryan Firebase API
// const secondaryApp = {
//   apiKey: "AIzaSyBT945IYFy9Tkg_cqBdrirwu-oHxPviLBw",
//   authDomain: "finportal-e0cbf.firebaseapp.com",
//   projectId: "finportal-e0cbf",
//   storageBucket: "finportal-e0cbf.appspot.com",
//   messagingSenderId: "896200911693",
//   appId: "1:896200911693:web:fed94ead60d9ca7a74a504",
//   databaseURL: "https://finportal-e0cbf-default-rtdb.firebaseio.com",
// };

// Mihir Firebase API
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
const secondaryApp =  initializeApp(firebaseConfig);
// const app = initializeApp(secondaryApp);
export const auth = getAuth(secondaryApp);
const db = getDatabase(secondaryApp);
const firestore = getFirestore(secondaryApp);
const storage = getStorage(secondaryApp);
const googleprovider = new GoogleAuthProvider();

export const FirebaseApp = (props) => {
  const [isloading, setIsLoading] = useState(true);
  const [isUser, setIsUser] = useState("Loading");
  const [isNewUser, setIsNewUser] = useState(" ");
  const isLoggedIn = isUser ? true : false;
  const [itrfile, setItrfile] = useState(null);

  const user = () => {
    onAuthStateChanged(auth, (userFound) => {
      if (userFound) {
        const uid = userFound.uid;
        // console.log(uid)
        setIsUser(uid);
      } else {
        setIsUser(false);
      }
    });
    console.log(isUser);
    setIsLoading(false);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (userFound) => {
      if (userFound) {
        const uid = userFound.uid;
        // console.log(uid)
        setIsUser(uid);
      } else {
        setIsUser(false);
      }
    });
    console.log(isUser);
    setIsLoading(false);
  }, []);

  // registeration of user..
  const createUser = async (email, password) => {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  };
  // login user..
  const signInUser = async (email, password) => {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  };
  //sign in with google
  const signupWithGoogle = async() => {
    return await signInWithPopup(auth, googleprovider);
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
  const payment = async (token) => {
    console.log(token)
    const userDocRef = doc(firestore, "users", isUser);
    getDoc(userDocRef).then(async (docSnapshot) => {
      if (docSnapshot.exists()) {
        // Document exists
        return await updateDoc(userDocRef, {
          payment: token
        });
      }
    });

    try {
      await getDoc(userDocRef).then(async (docSnapshot) => {
        if (docSnapshot.exists()) {
          // Document exists
          return await updateDoc(userDocRef, {
            payment: token
          });
        }
      });
    } catch(err) {
      console.log(err)
    }
    
  };

  // updating and uploading image in firestore
  const submitITRimages = async(coverImage, servicename) => {
    try {
      const serviceRef = ref(storage, `Documents/${isUser}/${servicename}/${coverImage.name}`);
      await deleteObject(serviceRef);
    } catch(err) {
      console.log(err)
    }
    try {
      const storeRef = ref(
        storage,
        `Documents/${isUser}/${servicename}/${coverImage.name}`
      );
      await uploadBytes(storeRef, coverImage.file);
    } catch(err) {
      console.log(err)
    }
  }


  // updating ITR details in user uid`
  const submitITR = async (userData, servicename) => {
    try {
      const userDocRef = doc(firestore, "users", isUser);

      await getDoc(userDocRef).then(async (docSnapshot) => {
        if (docSnapshot.exists()) {
          // Document exists
          return await updateDoc(userDocRef, {
            ...userData
          });
        } else {
          // Document does not exist
          return await setDoc(userDocRef, {
            ...userData, 
          });
        }
      });

    } catch (err) {
      console.log(err)
    }
  };


  // list all details of user
  const listDocs = async () => {
    const res = await listAll(ref(storage, `Documents/${isUser}`));
    return res;
  };

  // fetch one user
  const getData = async () => {
    try {
      const user = await new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (userFound) => {
          if (userFound) {
            unsubscribe();
            resolve(userFound);
          } else {
            reject("User not found");
          }
        });
      });

      const uid = user.uid;
      const userDocRef = doc(firestore, `users/${uid}`);
      const snapshot = await getDoc(userDocRef);

      if (snapshot.exists()) {
        const userData = snapshot.data();
        // console.log("Data:", userData);
        return userData;
      } else {
        console.log("User not found in Firestore");
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  // fetch ITRfile

  const FetchPdf = async (service) => {
    console.log("fetch pdf function run");
    const format = ".pdf";

    try {
      const url = await getDownloadURL(
        ref(
          storage,
          `Documents/${isUser}/${service}/Admin/ITRFILE-${isUser}${format}`
        )
      )
      return url;

    } catch (err) {
      console.log(err)
      return null;
    }

  };

  

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
        FetchPdf,
        payment,
        submitITRimages
      }}
    >
      {props.children}
    </firebaseContext.Provider>
  );
};
