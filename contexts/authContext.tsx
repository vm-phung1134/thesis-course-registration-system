/* eslint-disable react-hooks/exhaustive-deps */

import React, { createContext, useContext, useState } from "react";
import {
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider } from "../config/firebase-config";
import Cookies from "js-cookie";
import { IAuthObject } from "@/interface/auth";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  GUEST = "guest",
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
    }
  );
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        if (
          // result?.user.email?.endsWith("cit.ctu.edu.vn") || // GIANG VIEN
          result?.user.email?.endsWith("student.ctu.edu.vn") || // SINH VIEN
          result?.user.email?.startsWith("tcrsystem911") // ADMIN OR THE CLERK TO THE COUNCIL
        ) {
          const authObject: IAuthObject = {
            id: result.user.uid,
            name: result.user.displayName || "",
            photoSrc: result.user.photoURL || "",
            email: result.user.email,
            role: roleAssignment(result.user.email || ""),
            major: "CNTT",
            class: "unknow",
            phone: "0909090909",
          };
          await addMutation.mutate(authObject);
          const token = await result.user.getIdToken();
          const role = roleAssignment(result.user.email || "");
          setUserCookies(authObject);
          setIsAuthenticated(true);
          role === "admin"
            ? router.push("/admin/dashboard")
            : router.push("/mainboard");
          Cookies.set("token", token);
          Cookies.set("uid", result.user.uid);
        } else {
          logout();
          setMessage("Your email must be from CTU organization");
        }
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
        Cookies.set("uid", user.uid);
        const authObject: IAuthObject = {
          id: user.uid,
          name: user.displayName || "",
          photoSrc: user.photoURL || "",
          email: email,
        };
        setUserCookies(authObject);
        setIsAuthenticated(true);
        router.push("/mainboard");
      })
      .catch((error) => {
        setMessage(() => "Account or password incorrect !!!");
        console.error("Error signing in:", error);
      });
  };

  const signUpWithEmailPassword = (
    email: string,
    password: string,
    lecturer: IAuthObject
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await addMutation.mutate({
          id: user.uid,
          email: email,
          name: lecturer.name,
          photoSrc: lecturer.photoSrc,
          role: lecturer.role,
          password: password,
          phone: lecturer.phone,
          class: lecturer.class,
          major: lecturer.major,
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
    const uid = Cookies.get("uid");
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
    }
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
