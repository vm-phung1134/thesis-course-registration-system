import { Avatar, CodeClass, MenuClassroom } from "@/components/Atoms";
import { ROLE_ASSIGNMENT, useAuthContext } from "@/contexts/authContext";
import { FC, useState } from "react";
import { DATA_MENU_CLASSROOM } from "../mock-data";
import { CardLecturerInClass, CountDown } from "@/components/Molecules";
import { useUserCookies } from "@/hooks/useCookies";

export interface IClassroomFoundProps {
  children: React.ReactNode;
  setCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>;
  openCreatePostModal: boolean;
}
export const ClassroomFound: FC<IClassroomFoundProps> = ({
  children,
  setCreatePostModal,
  openCreatePostModal,
}) => {
  const [userCookies] = useUserCookies();
  const [timeLeft, setTimeLeft] = useState<number>(0);

  return (
    <div className="px-5">
      <div className="grid grid-cols-12 gap-4 py-5">
        <div className="col-span-4 p-5 border">
          <CardLecturerInClass />
        </div>
        <div className="bg-gray-800 col-span-8 h-fit w-full text-white">
          <div className="p-5">
            <MenuClassroom listMenu={DATA_MENU_CLASSROOM} />
            <div className="mt-5 flex flex-col items-center gap-3">
              <div className="flex justify-center gap-4 items-center cursor-pointer">
                <Avatar
                  widthStr="w-10"
                  srcImg={
                    userCookies?.photoSrc ||
                    "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                />
                {userCookies?.role === ROLE_ASSIGNMENT.STUDENT ? (
                  <CountDown timeLeft={timeLeft} />
                ) : (
                  <p
                    onClick={() => setCreatePostModal(!openCreatePostModal)}
                    className="hover:text-orange-600 ease-in-out duration-200"
                  >
                    Write a message for your class today
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-end justify-end">
              <CodeClass />
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
