import { INITIATE_AUTH } from "@/data";
import { IAuthObject } from "@/interface/auth";
import { getOneAuth } from "@/redux/reducer/auth/api";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux/store";
import Cookies from "js-cookie";

export const useCurrentUser = () => {
  const dispatch = useAppDispatch();
  const userJson = Cookies.get("user");
  const user: IAuthObject = userJson ? JSON.parse(userJson) : null;
  const { data: currentUser, isLoading } = useQuery<IAuthObject>({
    queryKey: ["auth", user],
    queryFn: async () => {
      const action = await dispatch(getOneAuth(user));
      return action.payload || INITIATE_AUTH;
    },
    initialData: INITIATE_AUTH,
  });

  return { currentUser, isLoading, user };
};
