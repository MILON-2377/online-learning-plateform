"use client";

import { createContext } from "react";

const contextProvider = createContext(null);

export default function AuthProvider({ children }) {
  const authInfo = { name: "milon" };

  return (
    <contextProvider.Provider value={authInfo}>
      {children}
    </contextProvider.Provider>
  );
}
