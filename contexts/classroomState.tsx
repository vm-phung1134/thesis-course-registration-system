import { INITIATE_CLASSROOM, INITIATE_MEMBER } from "@/data";
import { useUserCookies } from "@/hooks/useCookies";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { IClassroomObject } from "@/interface/classroom";
import { IMemberObject } from "@/interface/member";
import { checkAuthRoleForClassroomState } from "@/redux/reducer/auth/api";
import { getClassroom } from "@/redux/reducer/classroom/api";
import { getMember } from "@/redux/reducer/member/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";

interface IClassroomStateContext {
  authClassroomState: IClassroomObject;
}

interface ClassroomStateProps {
  children: React.ReactNode;
}

const ClassroomStateContext = createContext<IClassroomStateContext>({
  authClassroomState: INITIATE_CLASSROOM,
});

export const useClassroomStateContext = () => useContext(ClassroomStateContext);

export const ClassroomStateContextProvider: React.FC<ClassroomStateProps> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useCurrentUser();
  const { data: classroom } = useQuery<IClassroomObject>({
    queryKey: ["classroom", currentUser],
    queryFn: async () => {
      const action = await dispatch(getClassroom(currentUser));
      return action.payload || {};
    },
    initialData: INITIATE_CLASSROOM,
  });

  const { data: member } = useQuery<IMemberObject>({
    queryKey: ["member", currentUser],
    queryFn: async () => {
      const action = await dispatch(getMember(currentUser));
      return action.payload || {};
    },
    initialData: INITIATE_MEMBER,
  });

  return (
    <ClassroomStateContext.Provider
      value={{
        authClassroomState:
          member?.classroom?.id !== "" ? member?.classroom : classroom,
      }}
    >
      {children}
    </ClassroomStateContext.Provider>
  );
};
