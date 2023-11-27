/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext } from "react";
import { useAppDispatch } from "@/redux/store";
import { getOneAuth } from "@/redux/reducer/auth/api";
import { IAuthObject } from "@/interface/auth";
import Cookies from "js-cookie";
import { INITIATE_AUTH } from "@/data";
import { useQuery } from "@tanstack/react-query";

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
  const { data: currentUser } = useQuery<IAuthObject>({
    queryKey: ["get-one-auth", user],
    queryFn: async () => {
      const action = await dispatch(getOneAuth(user));
      return action.payload || INITIATE_AUTH;
    },
    initialData: INITIATE_AUTH,
  });

  const currentUserValue: CurrentUserContextType = {
    currentUser,
  };

  return (
    <CurrentUserContext.Provider value={currentUserValue}>
      {children}
    </CurrentUserContext.Provider>
  );
};
