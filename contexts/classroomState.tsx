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
import React, { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUserContext } from "./currentUserContext";

interface IClassroomStateContext {
  authClassroomState: IClassroomObject | null;
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
  const [user] = useUserCookies();

  const { data: classroom } = useQuery<IClassroomObject | null>({
    queryKey: ["classroom", user],
    queryFn: async () => {
      if (user) {
        const action = await dispatch(getClassroom(user));
        return action.payload || null;
      }
      return null;
    },
    initialData: null,
  });

  const { data: member } = useQuery<IMemberObject | null>({
    queryKey: ["member", user],
    queryFn: async () => {
      if (user) {
        const action = await dispatch(getMember(user));
        return action.payload || null;
      }
      return null;
    },
    initialData: null,
  });

  return (
    <ClassroomStateContext.Provider
      value={{
        authClassroomState: member ? member.classroom : classroom,
      }}
    >
      {children}
    </ClassroomStateContext.Provider>
  );
};
