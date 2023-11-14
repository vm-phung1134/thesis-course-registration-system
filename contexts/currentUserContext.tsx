/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getOneAuth } from "@/redux/reducer/auth/api";
import { IAuthObject } from "@/interface/auth";
import Cookies from "js-cookie";
import { INITIATE_AUTH } from "@/data";

interface CurrentUserContextType {
  currentUser: IAuthObject;
}

interface CurrentUserProps {
  children: React.ReactNode;
}

const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: INITIATE_AUTH,
});

export const useCurrentUserContext = () => useContext(CurrentUserContext);

export const CurrentUserContextProvider: React.FC<CurrentUserProps> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const userJson = Cookies.get("user");
  const user: IAuthObject = userJson ? JSON.parse(userJson) : null;
  const { auth: currentUser } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(getOneAuth(user));
  }, []);

  const currentUserValue: CurrentUserContextType = {
    currentUser,
  };

  return (
    <CurrentUserContext.Provider value={currentUserValue}>
      {children}
    </CurrentUserContext.Provider>
  );
};
