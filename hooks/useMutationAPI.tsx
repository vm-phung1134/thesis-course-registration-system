import { useMutation } from "@tanstack/react-query";

type ActionFunction = (data: any) => Promise<any>;
interface CustomMutationResult {
  mutate: ActionFunction | any;
  isLoading: boolean;
  error: any;
}

const useCustomMutation = (action: ActionFunction): CustomMutationResult => {
  const handleMutation = (data: unknown) => {
    return new Promise((resolve, reject) => {
      action(data)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const mutation = useMutation(handleMutation);

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

export default useCustomMutation;
