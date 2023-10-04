import { Breadcrumb, Button, SnipperRound } from "@/components/Atoms";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { BREADCRUMB_MAINBOARD } from "../mock-data";
import { IClassroomObject } from "@/interface/classroom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IAuthObject } from "@/interface/auth";
import { unsubscribeState } from "@/redux/reducer/auth/api";
import { useAppDispatch } from "@/redux/store";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import classNames from "classnames";
import { ModalConfirm } from "@/components/Molecules";

export interface IWaitingViewProps {
  classroom?: IClassroomObject;
}

export const WaitingView: FC<IWaitingViewProps> = ({ classroom }) => {
  const [loading, setLoading] = useState<boolean>(true);
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
        queryClient.invalidateQueries(["checkAuthRoleForClassroomState", currentUser]);
      },
    }
  );

  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
  const modalClassConfirm = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalConfirm,
  });

  const handleOpenModalConfirm = () => {
    setOpenModalConfirm?.(!openModalConfirm);
  };

  const handleUnsubscribeState = () => {
    deleteMutation.mutate(currentUser);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          <Breadcrumb dataBreadcrumb={BREADCRUMB_MAINBOARD} />
          <div className="flex gap-2 justify-center items-center min-h-[70%] max-h-full">
            <Image
              src="https://tailwindcomponents.com/svg/queue-animate.svg"
              alt="bg-create-class"
              width="300"
              height="300"
              className="-hue-rotate-[38deg] saturate-[.85]"
              objectFit="cover"
              objectPosition="center"
            />
            <div className="flex gap-3 flex-col items-center">
              <h4 className="">
                You subscribed classroom of{" "}
                <span className="uppercase font-medium">
                  {classroom?.title}
                </span>
              </h4>
              <p className="font-thin text-sm">
                Please waiting until the lecturer add you into class
              </p>
              <span className="loading loading-dots loading-md text-green-700"></span>
              <div>
                <Button
                  title="Unsubcribe"
                  otherType="subscribe"
                  handleSubcribeClass={handleOpenModalConfirm}
                  className="px-5 bg-green-700 text-white hover:bg-green-600"
                />
              </div>
            </div>
          </div>
          <ModalConfirm
            modalClass={modalClassConfirm}
            setOpenModal={setOpenModalConfirm}
            openModal={openModalConfirm}
            action={handleUnsubscribeState}
            title="Message!!!"
            message="Do you want to unsubscribe this classroom"
          />
        </>
      )}
    </>
  );
};
