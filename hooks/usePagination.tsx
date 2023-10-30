import { IStudentDefObject } from "@/interface/studef";
import { getAllStudentDefPag } from "@/redux/reducer/student-def/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";

export interface StudentDefLimit {
  page: number;
  limit: number;
  uid: string;
}

export const usePagination = (props: StudentDefLimit) => {
  const dispatch = useAppDispatch();
  const { page, limit } = props;
  return useQuery<IStudentDefObject[]>({
    queryKey: ["studef-limit", page, limit],
    queryFn: async () => {
      const action = await dispatch(getAllStudentDefPag(props));
      return action.payload || [];
    },
    initialData: [],
  });
};
