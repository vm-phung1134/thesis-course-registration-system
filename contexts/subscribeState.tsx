import { useUserCookies } from "@/hooks/useCookies";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { IMemberObject } from "@/interface/member";
import { checkStateSubscribe } from "@/redux/reducer/auth/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";
import { useCurrentUserContext } from "./currentUserContext";

interface ISubscribeStateContext {
  subscribeState: any; // IMemberObject or {status: ""}
}

interface SubscribeStateProps {
  children: React.ReactNode;
}

const SubscribeStateContext = createContext<ISubscribeStateContext>({
  subscribeState: [],
});

export const useSubscribeStateContext = () => useContext(SubscribeStateContext);

export const SubscribeStateContextProvider: React.FC<SubscribeStateProps> = ({
  children,
}) => {
  // const { currentUser } = useCurrentUserContext();
  const [user] = useUserCookies();
  const dispatch = useAppDispatch();
  const { data: subscribeState } = useQuery<
    IMemberObject[] | { status: string }
  >({
    queryKey: ["subscribe-state", user],
    queryFn: async () => {
      const action = await dispatch(checkStateSubscribe(user));
      return action.payload || [];
    },
    initialData: [],
  });

  return (
    <SubscribeStateContext.Provider value={{ subscribeState: subscribeState }}>
      {children}
    </SubscribeStateContext.Provider>
  );
};
