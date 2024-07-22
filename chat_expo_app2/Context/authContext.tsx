import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Auth,
  onAuthStateChanged
} from "firebase/auth";
import { auth, db, usersRef } from "../firebaseConfig";
import { doc, setDoc, Firestore,addDoc } from "firebase/firestore";

type User = {
  email: string;
  userName: string;
  profileUrl: string | null;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    userName: string,
    profileUrl: string | null
  ) => Promise<{ success: boolean; data: any } | void>;
};

// Create the initial context with null values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: undefined,
  login: async (email: string, password: string) => {},
  logout: async () => {},
  register: async (
    email: string,
    password: string,
    userName: string,
    profileUrl: string | null
  ) => {},
});

export const AuthContextProvider: React.FC = ({ children }: any) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in user:", response.user);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const register = async (
    email: string,
    password: string,
    userName: string,
    profileUrl: string | null
  ) => {
    try {
      // Validate email format (optional step)
      if (!isValidEmail(email)) {
        throw new Error('Invalid email format');
      }
  
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log('response.user:', response?.user);
  
      await addDoc(usersRef,{
        username: userName,
        profileUrl,
        userId: response?.user?.uid,
      }).then(res => console.log(res))
      .catch((error)=>{
        console.log(error.message)
      })
     
  

    } catch (error) {
      console.error('Registration error:', error);
      throw error; // Rethrow the error to handle it in the calling function or component
    }
  };
  
  // Utility function to validate email format
  const isValidEmail = (email: string): boolean => {
    // Basic email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return authContext;
};