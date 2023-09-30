import { INITIATE_AUTH, INITIATE_COURSE } from "@/data";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { IMemberObject } from "@/interface/member";
import { checkStateSubscribe } from "@/redux/reducer/auth/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";

interface ISubscribeStateContext {
  subscribeState: IMemberObject;
}

interface SubscribeStateProps {
  children: React.ReactNode;
}

const SubscribeStateContext = createContext<ISubscribeStateContext>({
  subscribeState: {
    classroom: INITIATE_COURSE,
    member: INITIATE_AUTH,
  },
});

export const useSubscribeStateContext = () => useContext(SubscribeStateContext);

export const SubscribeStateContextProvider: React.FC<SubscribeStateProps> = ({
  children,
}) => {
  const { currentUser } = useCurrentUser();
  const dispatch = useAppDispatch();
  const { data: subscribeState } = useQuery<IMemberObject>({
    queryKey: ["subscribe-state", currentUser],
    queryFn: async () => {
      const action = await dispatch(checkStateSubscribe(currentUser));
      return action.payload || {};
    },
    initialData: {
      classroom: INITIATE_COURSE,
      member: INITIATE_AUTH,
    },
  });

  return (
    <SubscribeStateContext.Provider value={{ subscribeState }}>
      {children}
    </SubscribeStateContext.Provider>
  );
};
