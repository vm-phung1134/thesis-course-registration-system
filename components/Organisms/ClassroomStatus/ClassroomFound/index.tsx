import { CodeClass, MenuClassroom, NormalAvatar } from "@/components/Atoms";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { FC, useState } from "react";
import {
  DATA_MENU_CLASSROOM_LECTURER,
  DATA_MENU_CLASSROOM_STUDENT,
} from "../mock-data";
import { CardLecturerInClass, CountDown } from "@/components/Molecules";
import { IClassroomObject } from "@/interface/classroom";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";

export interface IClassroomFoundProps {
  children: React.ReactNode;
  setCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>;
  openCreatePostModal: boolean;
  classroom: IClassroomObject;
}
export const ClassroomFound: FC<IClassroomFoundProps> = ({
  children,
  setCreatePostModal,
  openCreatePostModal,
  classroom,
}) => {
  const { currentUser } = useCurrentUser();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  return (
    <div className="px-5">
      <div className="grid grid-cols-12 gap-4 my-3">
        <div className="col-span-4 p-5 border rounded-xl">
          <CardLecturerInClass lecturer={classroom?.lecturer} />
        </div>
        <div className="bg-gray-800 col-span-8 h-fit w-full text-white rounded-xl">
          <div className="p-5">
            <MenuClassroom
              listMenu={
                currentUser.role === ROLE_ASSIGNMENT.LECTURER
                  ? DATA_MENU_CLASSROOM_LECTURER
                  : DATA_MENU_CLASSROOM_STUDENT
              }
            />
            <div className="mt-5 flex flex-col items-center gap-3">
              <div className="flex justify-center gap-4 items-center cursor-pointer">
                <NormalAvatar
                  setSize="w-10"
                  photoSrc={classroom?.lecturer?.photoSrc}
                />
                {currentUser?.role === ROLE_ASSIGNMENT.STUDENT ? (
                  <CountDown timeLeft={timeLeft} />
                ) : (
                  <p
                    onClick={() => setCreatePostModal(!openCreatePostModal)}
                    className="hover:text-orange-600-600 ease-in-out duration-200"
                  >
                    Write a message for your class today
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-end justify-end">
              <CodeClass code={classroom?.classCourse} />
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
