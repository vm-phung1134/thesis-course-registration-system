/* eslint-disable react-hooks/exhaustive-deps */

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider } from "../config/firebase-config";
import Cookies from "js-cookie";
import { IAuthObject } from "@/interface/auth";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { loginAuth } from "@/redux/reducer/auth/api";
import { useAppDispatch } from "@/redux/store";
import { useUserCookies } from "@/hooks/useCookies";

interface AuthContextType {
  message: string;
  isAuthenticated: boolean;
  signInWithGoogle: () => void;
  logout: () => void;
  checkUserLoginState: () => void;
  signInWithEmailPassword: (email: string, password: string) => void;
  signUpWithEmailPassword: (
    email: string,
    password: string,
    lecturer: IAuthObject
  ) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export enum ROLE_ASSIGNMENT {
  STUDENT = "student",
  LECTURER = "lecturer",
  ADMIN = "admin",
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
  const dispatch = useAppDispatch();
  const [, setUserCookies] = useUserCookies();
  const [message, setMessage] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const addMutation = useMutation(
    (postData: IAuthObject) => {
      return new Promise((resolve, reject) => {
        dispatch(loginAuth(postData))
          .unwrap()
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    {
      onSuccess: () => {
        console.log("Save the user's information");
      },
    }
  );
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const token = await result.user.getIdToken();
        Cookies.set("token", token);
        const role = roleAssignment(result.user.email || "");
        role === "admin" ? router.push("/admin") : router.push("/mainboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const signInWithEmailPassword = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.getIdToken().then((token) => {
          Cookies.set("token", token);
        });
        router.push("/mainboard");
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };

  const signUpWithEmailPassword = (
    email: string,
    password: string,
    lecturer: IAuthObject
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        addMutation.mutate({
          id: user.uid,
          email: user.email || "",
          name: lecturer.name || "",
          photoSrc: lecturer.photoSrc || "",
          role: roleAssignment(user.email || ""),
        });
      })
      .catch((error) => {
        console.error("Errors:", error);
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        Cookies.remove("token");
        Cookies.remove("user");
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
    setIsAuthenticated(false);
  };

  const checkUserLoginState = () => {
    const token = Cookies.get("token");
    if (!token && !isAuthenticated) {
      logout();
      router.push("/");
    }
  };

  const authContextValue: AuthContextType = {
    message,
    checkUserLoginState,
    isAuthenticated,
    signInWithGoogle,
    logout,
    signInWithEmailPassword,
    signUpWithEmailPassword,
  };

  const roleAssignment = (email: string) => {
    if (email.includes(ROLE_ASSIGNMENT.STUDENT)) {
      return ROLE_ASSIGNMENT.STUDENT;
    } else if (email.includes("system")) {
      return ROLE_ASSIGNMENT.ADMIN;
    } else {
      return ROLE_ASSIGNMENT.LECTURER;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (
        currentUser?.email?.endsWith("cit.ctu.edu.vn") || // GIANG VIEN
        currentUser?.email?.endsWith("student.ctu.edu.vn") || // SINH VIEN
        currentUser?.email?.endsWith("gmail.com") // THU KY KHOA
      ) {
        const authObject: IAuthObject = {
          id: currentUser.uid,
          name: currentUser.displayName || "",
          photoSrc: currentUser.photoURL || "",
          email: currentUser.email,
          role: roleAssignment(currentUser.email || ""),
        };
        setUserCookies(authObject);
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
