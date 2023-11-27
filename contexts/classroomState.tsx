import { INITIATE_CLASSROOM } from "@/data";
import { IClassroomObject } from "@/interface/classroom";
import { IMemberObject } from "@/interface/member";
import { getClassroom } from "@/redux/reducer/classroom/api";
import { getMember } from "@/redux/reducer/member/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect } from "react";
import Cookies from "js-cookie";

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

  const classroomQuery = useQuery<IClassroomObject | null>({
    queryKey: ["get-one-classroom", uid],
    queryFn: async () => {
      if (uid) {
        const action = await dispatch(getClassroom(uid));
        return action.payload || null;
      }
    },
    initialData: null,
  });

  const memberQuery = useQuery<IMemberObject | null>({
    queryKey: ["get-one-member", uid],
    queryFn: async () => {
      if (uid) {
        const action = await dispatch(getMember(uid));
        return action.payload || null;
      }
    },
    initialData: null,
  });

  useEffect(() => {
    // Prefetch the data for classroom and member
    classroomQuery.refetch();
    memberQuery.refetch();
  }, [classroomQuery, classroomQuery.refetch, memberQuery, memberQuery.refetch]);

  return (
    <ClassroomStateContext.Provider
      value={{
        authClassroomState: memberQuery.data ? memberQuery.data.classroom : classroomQuery.data,
      }}
    >
      {children}
    </ClassroomStateContext.Provider>
  );
};
