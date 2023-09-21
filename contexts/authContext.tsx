/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../config/firebase-config";
import Cookies from "js-cookie";
import { IAuthObject } from "@/interface/auth";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { loginAuth } from "@/redux/reducer/auth/api";
import { useAppDispatch } from "@/redux/store";
import { INITIATE_AUTH } from "@/data";

interface AuthContextType {
  message: string;
  user: IAuthObject;
  isAuthenticated: boolean;
  signInWithGoogle: () => void;
  logout: () => void;
  checkUserLoginState: () => void;
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
  const [user, setUser] = useState<IAuthObject>(INITIATE_AUTH);
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
        //return checkStatusAuth(result.user.uid);
      })
      .then(() => router.push("/mainboard"))
      // .then((response) => {
      //   if (response === "api_success") {
      //     router.push("/mainboard");
      //   } else {
      //     router.push("/error");
      //   }
      // })
      .catch((error) => {
        console.error(error);
      });
  };

  // checkStatusAuth(uid của user firebase);
  // dung api de check trang thai user trong lop hoc o mainboard
  // TH1: Chua dang ky thì {status: "NOT_REGISTER"}
  // TH2: Nếu trong trạng thái subscribe nhưng chưa dược add {status: "WAITING", classroom: {}}
  // TH3: Nếu đã đăng ký + added thì {status: "ADDED", classroom: {}}

  const logout = () => {
    signOut(auth)
      .then(() => {
        Cookies.remove("token");
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
        addMutation.mutate(authObject);
        setUser(authObject);
        Cookies.set("user", JSON.stringify(authObject));
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
