import { Avatar } from "@/components/Atoms";
import { CommentForm, ContentComment } from "@/components/Molecules";
import { ClassroomTemplate } from "@/components/Templates";
import classNames from "classnames";
import { FC, useState } from "react";
import { PostModal } from "@/components/Organisms";
import { DATA_POST_MODAL } from "@/components/Organisms/PostModal/mock-data";
import { ICommentObject } from "@/interface/comment";

const CriticalTask = () => {
  return (
    <div className="h-fit p-5 border shadow-xl">
      <h2 className="uppercase text-md font-normal mb-2">Critical tasks</h2>
      <p className="text-red-600 text-sm mb-2">Deadline 28, August 2023</p>
      <p className="font-medium text-md uppercase">report progress thesis</p>
      <div className="flex justify-start">
        <button className="btn rounded-none bg-transparent p-0 hover:bg-transparent border-none capitalize font-normal">
          View detail
        </button>
      </div>
    </div>
  );
};

interface ITaskHeaderProps {
  setOpenModalEx?: React.Dispatch<React.SetStateAction<boolean>>;
  openModalEx?: boolean;
}

const TaskHeader: FC<ITaskHeaderProps> = ({ setOpenModalEx, openModalEx }) => {
  return (
    <div className="border p-5 bg-green-700 text-white">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Avatar
            widthStr="w-10 h-10"
            srcImg="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
          <div className="flex flex-col">
            <div
              onClick={() => setOpenModalEx?.(!openModalEx)}
              className="cursor-pointer ease-in-out duration-300"
            >
              <div className="flex gap-3 items-center">
                <p className="text-xs px-3 py-1 bg-green-900 w-fit">Exercise</p>
                <small>20, August 2023 - 20:30 PM</small>
              </div>
              <span className="font-medium">Le Huynh Quoc Bao</span> has been
              added a new exercise
            </div>
          </div>
        </div>
        <button>...</button>
      </div>
    </div>
  );
};

function ManageClassroomTab() {
  const [openModalEx, setOpenModalEx] = useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalEx,
  });
  const [arrComment, setArrComment] = useState<ICommentObject[]>([]);
  return (
    <>
      <ClassroomTemplate title="Manage Class | Thesis course registration system">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <CriticalTask />
            {/* WAITING TIME */}
            {/* <div className="h-52 flex justify-center items-center p-5 border shadow-xl">
              <p className="uppercase text-green-700">OPS! Not have any critiacal task for you</p>
            </div> */}
          </div>
          <div className="col-span-8">
            <div className="h-fit w-full">
              <div className="border p-5 shadow-xl">
                <TaskHeader
                  setOpenModalEx={setOpenModalEx}
                  openModalEx={openModalEx}
                />
                <div className="p-5 flex flex-col gap-1 border">
                  <p className="text-[15px]">2 Comment for class</p>
                  <ContentComment arrComment={arrComment} />
                  <CommentForm
                    arrComment={arrComment}
                    setArrComment={setArrComment}
                  />
                </div>
              </div>
              {/* WAITING TIME */}
              {/* <div className="h-20 flex justify-center items-center border p-5 shadow-xl">
                <p className="uppercase text-green-700">Ops! We do not have post for you</p>
              </div> */}
            </div>
          </div>
        </div>
        <PostModal
          modalClass={modalClass}
          post={DATA_POST_MODAL}
          setOpenModalEx={setOpenModalEx}
          openModalEx={openModalEx}
        />
      </ClassroomTemplate>
    </>
  );
}
export default ManageClassroomTab;
