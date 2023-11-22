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
import Cookies from "js-cookie";
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
  const uid = Cookies.get("uid");
  console.log(uid);
  const { data: classroom } = useQuery<IClassroomObject | null>({
    queryKey: ["classroom", uid],
    queryFn: async () => {
      if (uid) {
        const action = await dispatch(getClassroom(uid));
        return action.payload || null;
      }
    },
    initialData: null,
  });
  const { data: member } = useQuery<IMemberObject | null>({
    queryKey: ["member-classroom", uid],
    queryFn: async () => {
      if (uid) {
        const action = await dispatch(getMember(uid));
        return action.payload || null;
      }
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
