import { Button } from "@/components/Atoms";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { IAuthObject } from "@/interface/auth";
import { unsubscribeState } from "@/redux/reducer/auth/api";
import { useAppDispatch } from "@/redux/store";
import { convertToUnaccentedString } from "@/utils/convertString";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";

export interface ICardLecturerInClassProps {
  lecturer: IAuthObject;
}

export const CardLecturerInClass: FC<ICardLecturerInClassProps> = ({
  lecturer,
}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();
  const deleteMutation = useMutation(
    (postData: IAuthObject) => {
      return new Promise((resolve, reject) => {
        dispatch(unsubscribeState(postData))
          .unwrap()
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["member"]);
      },
    }
  );
  const handleUnsubscribeState = () => {
    deleteMutation.mutate(currentUser);
  };
  return (
    <>
      <h3 className="text-sm uppercase">Thesis graduation - CT550</h3>
      <h4 className="text-[24px] font-semibold uppercase">{lecturer?.name}</h4>
      <h5 className="font-medium text-green-700">Major: {lecturer?.major}</h5>
      <ul>
        <li className="text-base flex gap-2">
          <span className="">Email: {lecturer?.email}</span>
        </li>
        <li className="text-base flex gap-2">
          <span className="">Phone: {lecturer?.phone}</span>
        </li>
      </ul>
      <div className="flex justify-end items-end">
        <div className="flex gap-5">
          {currentUser.role === ROLE_ASSIGNMENT.LECTURER && (
            <label className="swap text-sm">
              <input type="checkbox" />
              <div className="swap-on flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <p>Lock</p>
              </div>
              <div className="swap-off flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                </svg>
                <p>Open</p>
              </div>
            </label>
          )}
          <Button
            handleSubcribeClass={handleUnsubscribeState}
            className="bg-transparent hover:bg-red-600 hover:text-white border-red-600 text-red-600 font-normal capitalize"
            title="Leave Group"
          />
        </div>
      </div>
    </>
  );
};
