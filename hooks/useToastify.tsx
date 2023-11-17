import { useEffect } from "react";
import { toast } from "react-toastify";

const useToastify = (
  mutation: any,
  successMessage: string
) => {
  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success(successMessage, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 2000,
      });
    }
  }, [mutation.isSuccess, successMessage]);
};

export default useToastify;
