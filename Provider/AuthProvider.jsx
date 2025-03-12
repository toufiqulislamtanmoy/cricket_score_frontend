"use client"
import { createContext } from "react";
import { Toaster } from "react-hot-toast";

export const AuthContext = createContext();
const AuthProvider = ({ children}) => {
    return (
        <AuthContext.Provider>
          {children}
          <Toaster />
        </AuthContext.Provider>
      );
};

export default AuthProvider;