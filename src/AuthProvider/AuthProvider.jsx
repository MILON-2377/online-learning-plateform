"use client";

import auth from "@/Firebase.Config/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, useContext, useState } from "react";

const contextProvider = createContext(null);

export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // handle sign wiht email and password
  const userSignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }


  // social login handle
  const logInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth);
  }

  const authInfo = { user, loading, userSignUp, logInWithGoogle};

  return (
    <contextProvider.Provider value={authInfo}>
      {children}
    </contextProvider.Provider>
  );
}

export const useAuth = () => {
  const authContext = useContext(contextProvider);
  return authContext;
}

