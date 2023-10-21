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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux/store";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { getAllMemberClassroom } from "@/redux/reducer/member/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const addRequirementMutation = useMutation(
    (postData: Omit<IMemberObject, "id">) => {
      return dispatch(createRequirement(postData))
        .unwrap()
        .then((data) => {
          toast.success(data.message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 3000,
          });
        })
        .catch((error) => {
          toast.error(error?.message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 3000,
          });
        });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["subscribe-state"]);
      },
    }
  );
  const { currentUser } = useCurrentUser();
  const handleSubcribeClass = () => {
    if (!addRequirementMutation.isLoading) {
      addRequirementMutation.mutate({
        classroom: item,
        member: currentUser,
        registerDefense: false,
      });
    }
  };
  const { data: members } = useQuery<IMemberObject[]>({
    queryKey: ["members-in-classroom", item],
    queryFn: async () => {
      const action = await dispatch(getAllMemberClassroom(item));
      return action.payload || [];
    },
    initialData: [],
  });
  return (
    <>
      <div className="w-[340px] shadow-lg">
        <div className="bg-cover bg-[url('https://images.pexels.com/photos/301943/pexels-photo-301943.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load')]">
          <div className="bg-black/60 p-5 text-gray-100">
            <div className="flex justify-between gap-5 mb-2">
              <h3 className="text-md font-bold uppercase text-green-500">
                {item?.lecturer?.name}
              </h3>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 rotate-90 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex gap-2 flex-col">
              <p className="text-sm flex gap-2">
                <span>Course:</span>
                <span className="font-normal">{item.classCourse}</span>
              </p>
              <p className="text-sm flex gap-2">
                <span>Students:</span>
                <span className="font-normal">
                  {members.length} / {item?.quantityStudent}
                  <small>{` ( ${
                    item?.quantityStudent - members.length
                  } available )`}</small>
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
      <ToastContainer
        toastStyle={{
          color: "black",
          fontSize: "14px",
          fontFamily: "Red Hat Text",
        }}
      />
    </>
  );
};
