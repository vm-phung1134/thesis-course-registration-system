import { UseMutationResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";

const useToastify = (
  mutation: any,
  successMessage: string,
  errorMessage?: string
) => {
  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success(successMessage, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 2000,
      });
    }
    if (mutation.isError) {
      toast.error(errorMessage, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 2000,
      });
    }
  }, [mutation.isSuccess, successMessage, errorMessage, mutation.isError]);
};

export default useToastify;
