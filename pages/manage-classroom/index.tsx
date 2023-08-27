import { Avatar, Button } from "@/components/Atoms";
import {
  CardStudentShort,
  CommentForm,
  ContentComment,
} from "@/components/Molecules";
import { ClassroomTemplate } from "@/components/Templates";
import classNames from "classnames";
import { FC, useState } from "react";
import { DATA_CARD_STUDENT } from "./members/mock-data";

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
            <p
              onClick={() => setOpenModalEx?.(!openModalEx)}
              className="cursor-pointer hover:text-orange-400"
            >
              <span className="font-medium">Le Huynh Quoc Bao</span> has been
              added a new report
            </p>
            <small>20, August 2023 - 20:30 PM</small>
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
  return (
    <>
      <ClassroomTemplate title="Manage Class | Thesis course registration system">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <CriticalTask />
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
                  <ContentComment />
                  <CommentForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClassroomTemplate>
      <dialog id="my_modal_2" className={modalClass}>
        <div className="w-8/12 bg-white p-5 h-[70%] shadow-2xl overflow-y-scroll">
          <div className="grid grid-cols-12 h-full">
            <div className="col-span-8 border-r px-3">
              <div className="border-b pb-5">
                <h3 className="font-medium text-lg uppercase text-green-700">
                  Report grogress - Design Phrase
                </h3>
                <p className="text-base font-medium uppercase py-1">
                  Le huynh quoc bao
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-sm">
                    {`20, August 2023 - `}
                    <span className="text-sm">{`12:36 AM (Edited)`}</span>
                  </p>
                  <p className="text-red-500 text-sm">
                    Deadline: 21, August 2023
                  </p>
                </div>
              </div>
              <div className="py-5 font-thin border-b">
                <ul>
                  <li>
                    - They make progress reports by writing down the features
                    they have implemented in a word file.
                  </li>
                  <li>- At the report you will review what you are doing.</li>
                </ul>
              </div>
              <div className="py-5 flex flex-col gap-3">
                <p className="text-[15px]">2 Comment for this report</p>
                <form action="/" method="POST" className="relative">
                  <input
                    type="text"
                    name="content"
                    id="content"
                    placeholder="Enter your comment ..."
                    className="input text-[13px] rounded-none w-full border-gray-300  focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute text-black w-28 text-[13px] rounded-none font-medium normal-case btn right-0 top-0 bottom-0"
                  >
                    Send
                    <i className="fa-regular fa-paper-plane"></i>
                  </button>
                </form>
                <ContentComment />
                <button className="btn font-normal normal-case rounded-none">
                  View more comments
                </button>
              </div>
            </div>
            <div className="col-span-4 px-3">
              <div className="flex justify-between">
                <h3 className="font-medium text-lg uppercase text-green-700">
                  Status report
                </h3>
                <button
                  onClick={() => setOpenModalEx(!openModalEx)}
                  className="btn btn-sm  btn-circle border"
                >
                  ✕
                </button>
              </div>

              <div className="flex gap-5 my-3 pb-2 border-b">
                <p>
                  <span className="text-lg font-bold">1</span> submited
                </p>
                <p>
                  <span className="text-lg font-bold">15</span> Assignment
                </p>
              </div>
              <div className="flex justify-start">
                <select className="select font-thin select-sm my-2 select-bordered rounded-none focus:outline-none max-w-xs">
                  <option>Sort by name</option>
                  <option>Large Apple</option>
                  <option>Large Orange</option>
                  <option>Large Tomato</option>
                </select>
              </div>
              <div className="flex flex-wrap gap-2">
                {DATA_CARD_STUDENT.map((student) => {
                  return (
                    <CardStudentShort key={student.id} student={student} />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
export default ManageClassroomTab;
