import { useAppDispatch } from "@/redux/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type MutationParams = {
  action: any;
  queryKeyLog: string[];
  successMsg?: string;
  errorMsg?: string;
};

export const useMutationQueryAPI = (params: MutationParams) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  return useMutation(
    (postData: any) => {
      return new Promise<void>((resolve, reject) => {
        dispatch(params.action(postData))
          .unwrap()
          .then(() => {
            toast.success(params.successMsg, {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 3000,
            });
            resolve();
          })
          .catch(() => {
            toast.error(params.errorMsg, {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 3000,
            });
            reject();
          });
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(params.queryKeyLog);
      },
    }
  );
};
