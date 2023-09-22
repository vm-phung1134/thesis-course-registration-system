import { FC } from "react";
import { IClassroomObject } from "@/interface/classroom";
import { useState } from "react";
import classNames from "classnames";
import {
  ClassroomContentCard,
  ClassroomDetailModal,
} from "@/components/Molecules";
import { createRequirement } from "@/redux/reducer/requirement/api";
import { IMemberObject } from "@/interface/member";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux/store";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";

interface IClassroomCardProps {
  item: IClassroomObject;
}

export const ClassroomCard: FC<IClassroomCardProps> = ({ item }) => {
  const [openModalClassroomDetail, setOpenModalClassroomDetail] =
    useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalClassroomDetail,
  });

  // HANDLE CALL API
  const dispatch = useAppDispatch();
  const addRequirementMutation = useMutation(
    (postData: IMemberObject) => {
      return new Promise((resolve, reject) => {
        dispatch(createRequirement(postData))
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
        console.log("Create new requirement success");
      },
    }
  );
  const {user} = useCurrentUser();
  const handleSubcribeClass = (classroom: IClassroomObject) => {
    addRequirementMutation.mutate({classroom, member: user})
    // Call api check status mainboard
    
  };

  return (
    <>
      <div className="w-80 shadow-xl">
        <div className="bg-cover bg-[url('https://images.pexels.com/photos/301943/pexels-photo-301943.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load')]">
          <div className="bg-black/60 p-5 text-gray-100">
            <div className="flex justify-between mb-3">
              <h3 className="text-lg font-bold uppercase">{item.title}</h3>
              <button>...</button>
            </div>
            <div className="flex gap-2 flex-col">
              <p className="text-sm flex gap-2">
                <span>Courses:</span>
                <span className="font-normal">{item.codeCourse}</span>
              </p>
              <p className="text-sm flex gap-2">
                <span>Students:</span>
                <span className="font-normal">
                  {item.quantity}/15 <small>{`(10 available)`}</small>
                </span>
              </p>
            </div>
          </div>
        </div>
        <ClassroomContentCard
          setOpenModalClassroomDetail={setOpenModalClassroomDetail}
          openModalClassroomDetail={openModalClassroomDetail}
          handleSubcribeClass={handleSubcribeClass}
          item={item}
        />
      </div>
      <ClassroomDetailModal
        item={item}
        setOpenModalClassroomDetail={setOpenModalClassroomDetail}
        openModalClassroomDetail={openModalClassroomDetail}
        handleSubcribeClass={handleSubcribeClass}
        modalClass={modalClass}
      />
    </>
  );
};
