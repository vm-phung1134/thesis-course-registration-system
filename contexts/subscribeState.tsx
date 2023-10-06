import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { IMemberObject } from "@/interface/member";
import { checkStateSubscribe } from "@/redux/reducer/auth/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";

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
  const { currentUser } = useCurrentUser();
  const dispatch = useAppDispatch();
  const { data: subscribeState } = useQuery<
    IMemberObject[] | { status: string }
  >({
    queryKey: ["subscribe-state", currentUser],
    queryFn: async () => {
      const action = await dispatch(checkStateSubscribe(currentUser));
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
