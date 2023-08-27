import { Avatar, Button } from "@/components/Atoms";
import { MainboardTemplate } from "@/components/Templates";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";

function ManageClassroomTab() {
  const [openModalEx, setOpenModalEx] = useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalEx,
  });
  return (
    <>
      <MainboardTemplate title="Manage Class | Thesis course registration system">
        <div className="grid grid-cols-12 gap-4 py-5">
          <div className="col-span-4 p-5 border">
            <h3 className="text-md uppercase">Thesis graduation - CT550</h3>
            <h4 className="text-[26px] font-semibold uppercase">
              Le Huynh Quoc Bao
            </h4>
            <h5 className="font-medium text-green-700">
              Major: Sercurity Information
            </h5>
            <ul>
              <li className="text-base flex gap-2">
                <span className="">lhqbao@ctu.edu.vn</span>
              </li>
              <li className="text-base flex gap-2">
                <span className="">0953812461</span>
              </li>
            </ul>
            <div className="flex justify-end items-end">
              <button className="btn rounded-none bg-transparent border-red-500 text-red-600 font-normal capitalize">
                Leave Group
              </button>
            </div>
          </div>
          <div className="bg-gray-800 col-span-8 h-fit w-full text-white">
            <div className="p-5">
              <ul className="flex gap-10 mb-10 text-base font-medium justify-center">
                <li>
                  <Link
                    className="hover:white text-white hover:bg-transparent relative after:absolute after:bg-white 
                    after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500
                    cursor-pointer py-1"
                    href="/"
                  >
                    Newfeeds
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:white text-white hover:bg-transparent relative after:absolute after:bg-white 
                    after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500
                    cursor-pointer py-1"
                    href="/"
                  >
                    Report progress
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:white text-white hover:bg-transparent relative after:absolute after:bg-white 
                    after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500
                    cursor-pointer py-1"
                    href="/"
                  >
                    Members
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:white text-white hover:bg-transparent relative after:absolute after:bg-white 
                    after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500
                    cursor-pointer py-1"
                    href="/"
                  >
                    Point
                  </Link>
                </li>
              </ul>
              <div className="flex justify-center mt-5 gap-4 items-center">
                <Avatar
                  widthStr="w-10"
                  srcImg="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
                />
                <p>Write a message for your class today</p>
              </div>
              <div className="flex justify-center flex-col items-end">
                <div className="border w-fit p-2">
                  <div className="flex justify-between items-center">
                    <small>Code</small>
                    <button>...</button>
                  </div>
                  <p className="font-medium text-md px-5 py-2">zggbvj3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4 h-fit p-5 border">
            <h2 className="uppercase text-sm mb-2">Critical tasks</h2>
            <p className="text-red-600 text-sm mb-2">
              Deadline 28, August 2023
            </p>
            <p className="font-medium text-md uppercase">
              report progress thesis
            </p>
            <div className="flex justify-start">
              <button className="btn rounded-none bg-transparent p-0 hover:bg-transparent border-none capitalize font-normal">
                View detail
              </button>
            </div>
          </div>
          <div className="col-span-8 h-fit w-full">
            <div className="border p-5">
              <div className="border p-5 bg-green-700 text-white">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <Avatar
                      widthStr="w-10 h-10"
                      srcImg="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
                    />
                    <div className="flex flex-col">
                      <p
                        onClick={() => setOpenModalEx(!openModalEx)}
                        className="cursor-pointer hover:text-orange-400"
                      >
                        <span className="font-medium">Le Huynh Quoc Bao</span>{" "}
                        has been added a new report
                      </p>
                      <small>20, August 2023 - 20:30 PM</small>
                    </div>
                  </div>

                  <button>...</button>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-3 border">
                <p className="text-[15px]">2 Comment for class</p>
                <div className="flex gap-3">
                  <Avatar
                    widthStr="w-10 h-10"
                    srcImg="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
                  />
                  <div className="text-[15px]">
                    <p className="font-medium">
                      Le Huynh Quoc Bao{" "}
                      <small className="font-normal">10:00</small>
                    </p>
                    <p>I Like this post</p>
                  </div>
                </div>
                <form className="relative">
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
              </div>
            </div>
          </div>
        </div>
      </MainboardTemplate>
      <dialog id="my_modal_2" className={modalClass}>
        <form
          method="dialog"
          className="w-8/12 bg-white p-5 h-[70%] shadow-2xl overflow-y-scroll"
        >
          <div className="grid grid-cols-12 h-full">
            <div className="col-span-8 border-r px-3">
              <div className="border-b pb-5">
                <h3 className="font-medium text-lg uppercase text-green-700">
                  Report grogress - Design Phrase
                </h3>
                <p className="text-base font-medium uppercase py-1">Le huynh quoc bao</p>
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
                <form className="relative">
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
                <div className="flex gap-3 py-2">
                  <Avatar
                    widthStr="w-10 h-10"
                    srcImg="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
                  />
                  <div className="text-[15px]">
                    <p className="font-medium">
                      Le Huynh Quoc Bao{" "}
                      <small className="font-normal">10:00</small>
                    </p>
                    <p className="text-sm">I Like this post</p>
                  </div>
                </div>
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
                <CardStudentShort />
                <CardStudentShort />
                <CardStudentShort />
                <CardStudentShort />
                <CardStudentShort />
                <CardStudentShort />
                <CardStudentShort />
                <CardStudentShort />
                <CardStudentShort />
                <CardStudentShort />
              </div>
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
}

const CardStudentShort = () => {
  return (
    <div className="border py-1 px-2 w-fit">
      <div className="flex gap-2 items-center">
        <Avatar
          widthStr="w-7 h-7"
          srcImg="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        <div className="">
          <p className="uppercase text-[11px]">vo minh phung</p>
          <p className=" text-[11px] text-gray-500">Submited</p>
        </div>
      </div>
    </div>
  );
};

export default ManageClassroomTab;
