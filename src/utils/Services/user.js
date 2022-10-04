import firebase from "firebase/compat/app";
import auth from '../firebase'
export const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      alert(err.message);
    }
  };