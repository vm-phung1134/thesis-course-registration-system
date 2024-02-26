import React, { createContext, useContext, useState } from "react";
import {
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { auth, provider } from "../config/firebase-config";
import Cookies from "js-cookie";
import { IAuthObject } from "@/interface/auth";
import { useRouter } from "next/router";
import { loginAuth, updateAuth } from "@/redux/reducer/auth/api";
import { useUserCookies } from "@/hooks/useCookies";
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";
import { INITIATE_AUTH } from "@/data";

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
  changePassword: (account: IAuthObject, newPassword: string) => void;
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
  const [, setUserCookies] = useUserCookies();
  const [message, setMessage] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const addMutation = useMutationQueryAPI({
    action: loginAuth,
    queryKeyLog: [""],
  });
  const updateMutation = useMutationQueryAPI({
    action: updateAuth,
    queryKeyLog: ["get-one-auth"],
    successMsg: "Change password successfully!",
    errorMsg: "Fail to update your information!",
  });
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const token = await result.user.getIdToken();
        const authObject: IAuthObject = {
          id: result.user.uid,
          name: result.user.displayName || INITIATE_AUTH.name,
          photoSrc: result.user.photoURL || INITIATE_AUTH.photoSrc,
          email: result.user.email || INITIATE_AUTH.email,
          role: roleAssignment(result.user.email || INITIATE_AUTH.email),
          class: INITIATE_AUTH.class,
          major: INITIATE_AUTH.major,
          phone: INITIATE_AUTH.phone,
        };
        addMutation.mutate(authObject);
        Cookies.set("token", token);
        Cookies.set("uid", result.user.uid);
        setUserCookies(authObject);
        setIsAuthenticated(true);
        authObject.role === ROLE_ASSIGNMENT.ADMIN
          ? router.push("/admin/dashboard")
          : router.push("/mainboard");
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
          name: user.displayName || INITIATE_AUTH.name,
          photoSrc: user.photoURL || INITIATE_AUTH.photoSrc,
          email: email,
        };
        setUserCookies(authObject);
        setIsAuthenticated(true);
        email === "tcrsystem911@gmail.com"
          ? router.push("/admin/dashboard")
          : router.push("/manage-classroom");
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

  const changePassword = (account: IAuthObject, newAccountPassword: string) => {
    const user = auth.currentUser;
    console.log(newAccountPassword);
    if (user) {
      updatePassword(user, newAccountPassword)
        .then(() => {
          updateMutation.mutate({ ...account, password: newAccountPassword });
        })
        .catch((error) => {
          console.error("Error updating password:", error);
        });
    } else {
      console.error("No user is currently signed in");
    }
  };

  const checkUserLoginState = () => {
    const token = Cookies.get("token");
    const user = Cookies.get("user");
    if (!token && !isAuthenticated && !user) {
      logout();
      router.push("/");
    }
  };

  const roleAssignment = (email: string) => {
    if (email.includes("cit")) {
      return ROLE_ASSIGNMENT.LECTURER;
    } else if (email.includes("system")) {
      return ROLE_ASSIGNMENT.ADMIN;
    }
    return ROLE_ASSIGNMENT.STUDENT;
  };

  const authContextValue: AuthContextType = {
    message,
    checkUserLoginState,
    isAuthenticated,
    signInWithGoogle,
    logout,
    signInWithEmailPassword,
    signUpWithEmailPassword,
    changePassword,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
