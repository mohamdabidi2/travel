// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// const firebaseConfig = {
//     apiKey: "AIzaSyCPhOfXbi2xFLx39JsvQhvxbE1wAvA2z3w",
//     authDomain: "kounouz-b146d.firebaseapp.com",
//     projectId: "kounouz-b146d",
//     storageBucket: "kounouz-b146d.appspot.com",
//     messagingSenderId: "198365652019",
//     appId: "1:198365652019:web:c2d33632b11e3d6d76ef46",
//     measurementId: "G-877WQLFD7F"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// // Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);
// export { db };
import firebase from "firebase/compat/app";
import { getFirestore, collection, addDoc, where, query, getDocs} from "firebase/firestore"
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYLstp9-SnljNmB6Sy0i9v7fmfUuJOrJs",
  authDomain: "kounouz-ea153.firebaseapp.com",
  projectId: "kounouz-ea153",
  storageBucket: "kounouz-ea153.appspot.com",
  messagingSenderId: "70776990805",
  appId: "1:70776990805:web:44c3471e3e2b3fdfd078dc",
  measurementId: "G-FGSRF3QF6B"
};

firebase.initializeApp(firebaseConfig);
const db = getFirestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export {db}
export const auth = firebase.auth();
export default firebase;

export const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(provider);
    const user = res.user;
    const userRef = collection(db, "users");
    const result = await getDocs(query(userRef, where("uid", "==", user.uid)));
    if (result.empty) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    alert(err.message);
  }
};

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password)
    return true
  } catch (err) {
   
    alert(err.message);
    return false
  }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    alert(err.message);
  }
};

// const sendPasswordResetEmail = async (email) => {
//   try {
//     await auth.sendPasswordResetEmail(email);
//     alert("Password reset link sent!");
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const logout = () => {
//   auth.signOut();
// };
