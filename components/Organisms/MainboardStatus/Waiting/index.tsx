import { Button, SelectBox, SnipperRound } from "@/components/Atoms";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { IClassroomObject } from "@/interface/classroom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IAuthObject } from "@/interface/auth";
import { unsubscribeState } from "@/redux/reducer/auth/api";
import { useAppDispatch } from "@/redux/store";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import classNames from "classnames";
import { ModalConfirm } from "@/components/Molecules";
import { ClassroomCard } from "../..";
import { useSubscribeStateContext } from "@/contexts/subscribeState";
import { IMemberObject } from "@/interface/member";
import { ICategoryObject } from "@/interface/category";
import { IOptionItem } from "@/interface/filter";
import { DATA_FILTER_COURSE, DATA_FILTER_TOPICS } from "../mock-data";

export interface IWaitingViewProps {
  classroom?: IClassroomObject;
}

export const WaitingView: FC<IWaitingViewProps> = ({ classroom }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();
  const { subscribeState } = useSubscribeStateContext();
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
        queryClient.invalidateQueries([
          "checkAuthRoleForClassroomState",
          currentUser,
        ]);
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
  const [filterCourse, setFilterCourse] = useState<
    IOptionItem | ICategoryObject
  >({
    label: "Filter course",
    value: "",
  });
  const [filterTopic, setFilterTopic] = useState<IOptionItem | ICategoryObject>(
    {
      label: "Filter Topic",
      value: "",
    }
  );
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }, []);
  return (
    <>
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="mt-3 flex gap-3 w-1/3">
              <div className="flex-grow">
                <SelectBox
                  setSelected={setFilterCourse}
                  selected={filterCourse}
                  options={DATA_FILTER_COURSE}
                  setPadding="lg"
                />
              </div>
              <div className="flex-grow">
                <SelectBox
                  setSelected={setFilterTopic}
                  selected={filterTopic}
                  options={DATA_FILTER_TOPICS}
                  setPadding="lg"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 mt-5">
            {(subscribeState ?? []).map((item: IMemberObject) => {
              return <ClassroomCard key={item.id} item={item.classroom} />;
            })}
          </div>
          <ModalConfirm
            modalClass={modalClassConfirm}
            setOpenModal={setOpenModalConfirm}
            openModal={openModalConfirm}
            action={handleUnsubscribeState}
            typeButton="subscribe"
            title="Message!!!"
            message="Do you want to unsubscribe this classroom"
          />
        </>
      )}
    </>
  );
};
