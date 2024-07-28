"use client";

import auth from "@/Firebase.Config/firebase.config";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const contextProvider = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // handle sign wiht email and password
  const userSignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // social login handle
  const logInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  // user onAuthStateChanged hanlde
  useEffect(() => {
    const subScribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const { email, userName } = currentUser;
        try {
          const resUser = await axios.get(
            `/api/createUser?email=${email}`
          );
          setUser(resUser.data.user);
          console.log(resUser.data.user);
        } catch (error) {
          console.log(error);
        }
      } else {
        setUser(null);
      }
    });

    return () => subScribe();
  }, []);

  const authInfo = { user, loading, userSignUp, logInWithGoogle };

  return (
    <contextProvider.Provider value={authInfo}>
      {children}
    </contextProvider.Provider>
  );
}

export const useAuth = () => {
  const authContext = useContext(contextProvider);
  return authContext;
};
