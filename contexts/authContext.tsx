/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../config/firebase-config";
import Cookies from "js-cookie";
import { IAuthObject } from "@/interface/auth";
import { useRouter } from "next/router";

interface AuthContextType {
  message: string;
  user: IAuthObject | null;
  isAuthenticated: boolean;
  signInWithGoogle: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export enum ROLE_ASSIGNMENT {
  STUDENT = "student",
  LECTURER = "lecturer",
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<IAuthObject | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const token = await result.user.getIdToken();
        Cookies.set("token", token);
      })
      .then(() => router.push("/mainboard"))
      .catch((error) => {
        console.error(error);
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        Cookies.remove("token");
      })
      .then(() => router.push("/"))
      .catch((error) => {
        console.log(error);
      });
    setIsAuthenticated(false);
  };

  const authContextValue: AuthContextType = {
    message,
    user,
    isAuthenticated,
    signInWithGoogle,
    logout,
  };

  const roleAssignment = (email: string) => {
    if (email.includes(ROLE_ASSIGNMENT.STUDENT)) {
      return ROLE_ASSIGNMENT.STUDENT;
    } else {
      return ROLE_ASSIGNMENT.LECTURER;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (
        currentUser?.email?.endsWith("gmail.com") ||
        currentUser?.email?.endsWith("student.ctu.edu.vn")
      ) {
        const authObject: IAuthObject = {
          id: currentUser.uid,
          name: currentUser.displayName || "",
          photoSrc: currentUser.photoURL || "",
          email: currentUser.email,
          role: roleAssignment(currentUser.email || ""),
        };
        setUser(authObject);
        setIsAuthenticated(true);
      } else {
        currentUser
          ?.delete()
          .then(() => setMessage("Your email must be from CTU organization"));
        logout();
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
