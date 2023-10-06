import { INITIATE_CLASSROOM, INITIATE_MEMBER } from "@/data";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { checkAuthRoleForClassroomState } from "@/redux/reducer/auth/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";

interface IClassroomStateContext {
  authClassroomState: any;
}

interface ClassroomStateProps {
  children: React.ReactNode;
}

const ClassroomStateContext = createContext<IClassroomStateContext>({
  authClassroomState: {
    classroom: INITIATE_CLASSROOM,
    member: INITIATE_MEMBER,
  },
});

export const useClassroomStateContext = () => useContext(ClassroomStateContext);

export const ClassroomStateContextProvider: React.FC<ClassroomStateProps> = ({
  children,
}) => {
  const { currentUser } = useCurrentUser();
  const dispatch = useAppDispatch();
  const { data: authClassroomState } = useQuery<unknown>({
    queryKey: ["checkAuthRoleForClassroomState", currentUser],
    queryFn: async () => {
      const action = await dispatch(
        checkAuthRoleForClassroomState(currentUser)
      );
      return action.payload || {};
    },
    initialData: {
      classroom: INITIATE_CLASSROOM,
      member: INITIATE_MEMBER,
    },
  });

  return (
    <ClassroomStateContext.Provider value={{ authClassroomState }}>
      {children}
    </ClassroomStateContext.Provider>
  );
};
