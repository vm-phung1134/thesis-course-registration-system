import { FC } from "react";
import { Avatar, Button } from "@/components/Atoms";
import { IClassroomObject } from "@/interface/classroom";
import { useState } from "react";
import classNames from "classnames";

interface ICardClassroomProps {
  item: IClassroomObject;
}

export const CardClassroom: FC<ICardClassroomProps> = ({ item }) => {
  const [openModalClassroomDetail, setOpenModalClassroomDetail] =
    useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalClassroomDetail,
  });
  return (
    <>
      <div className="w-80 shadow-xl">
        <div className="bg-cover bg-[url('https://images.pexels.com/photos/301943/pexels-photo-301943.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load')]">
          <div className="bg-black/60 p-5 text-gray-100">
            <div className="flex justify-between mb-3">
              <h3 className="text-xl font-bold capitalize">
                {item.lecturer.name}
              </h3>
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
        <div className="max-h-fit p-3 border dark:border-none dark:shadow-lg dark:shadow-gray-600 relative">
          <div className="absolute -top-8 right-3">
            <Avatar
              widthStr="w-16"
              srcImg="https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm uppercase text-gray-500 py-2">Information</p>
            <ul>
              <li className="text-sm flex gap-2">
                <span>Major:</span>
                <span className="font-medium capitalize">
                  {item.lecturer.major}
                </span>
              </li>
              <li className="text-sm flex gap-2">
                <span>Email:</span>
                <span className="font-medium">{item.lecturer.email}</span>
              </li>
              <li className="text-sm flex gap-2">
                <span>Phone:</span>
                <span className="font-medium">{item.lecturer.phone}</span>
              </li>
            </ul>
            <p className="text-sm uppercase text-gray-500 py-2">Topics</p>
            <ul className="flex gap-2 flex-wrap cursor-pointer">
              {item.topicTags?.map((tag) => {
                return (
                  <li
                    key={tag.id}
                    className="py-1 px-2 bg-gray-600 text-white text-xs w-fit"
                  >
                    {tag.label}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex justify-end mt-6 items-center">
            <Button
              title="Detail"
              setToggle={setOpenModalClassroomDetail}
              toggle={openModalClassroomDetail}
              otherType="detail"
              className="bg-transparent dark:text-green-500 border-none hover:border-none hover:bg-transparent"
            />
            <Button
              id={item.id}
              otherType="subscribe"
              title="Subscribe"
              className="hover:bg-[#165b31] border-none btn-sm bg-[#018937] text-white"
            />
          </div>
        </div>
      </div>
      <dialog id="my_modal_7" className={modalClass}>
        <div className="w-6/12 bg-white p-5 h-fit shadow-2xl">
          <div className="bg-green-700 p-5 flex items-center gap-3 text-sm">
            <h4 className="uppercase text-white">Classroom information</h4>
            <div className="flex-grow h-[1px] bg-white"></div>
          </div>
          <div className="grid grid-cols-12 gap-5 mt-3 text-sm">
            <div className="col-span-4">
              <div className="flex items-center gap-3">
                <Avatar
                  widthStr="w-10"
                  srcImg="https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&cs=tinysrgb&w=600"
                />
                <div>
                  <p>CT550 - Thesis Graduation</p>
                  <h4 className="uppercase font-medium ">Le huynh quoc bao</h4>
                </div>
              </div>
              <div className="flex gap-2 mt-5">
                <span className="text-gray-500">Course:</span>
                <span>HK1_2023</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500">Total members:</span>
                <span>15 members</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500">Available:</span>
                <span>5 members</span>
              </div>
            </div>
            <div className="col-span-8 border-l px-5">
              <p className="text-sm uppercase text-gray-500">Requirements</p>
              <ul className="list-disc ml-5 mb-4">
                <li>You have to fill out your information</li>
                <li>Register topic you are going to do</li>
                <li>{`GPA > 2.8`}</li>
              </ul>
              <div className="flex gap-10">
                <div>
                  <p className="uppercase text-gray-500">Information</p>
                  <ul>
                    <li className="text-sm flex gap-2">
                      <span>Major:</span>
                      <span className="font-medium capitalize">
                        {item.lecturer.major}
                      </span>
                    </li>
                    <li className="text-sm flex gap-2">
                      <span>Email:</span>
                      <span className="font-medium">{item.lecturer.email}</span>
                    </li>
                    <li className="text-sm flex gap-2">
                      <span>Phone:</span>
                      <span className="font-medium">{item.lecturer.phone}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm uppercase text-gray-500 py-2">Topics</p>
                  <ul className="flex gap-2 flex-wrap cursor-pointer">
                    {item.topicTags?.map((tag) => {
                      return (
                        <li
                          key={tag.id}
                          className="py-1 px-2 bg-gray-600 text-white text-xs w-fit"
                        >
                          {tag.label}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <Button
              title="Cancel"
              setToggle={setOpenModalClassroomDetail}
              toggle={openModalClassroomDetail}
              otherType="detail"
              className="bg-transparent dark:text-green-500 border-none hover:border-none hover:bg-transparent"
            />
            <Button
              id={item.id}
              otherType="subscribe"
              title="Subscribe"
              className="hover:bg-[#165b31] border-none btn-sm bg-[#018937] text-white"
            />
          </div>
        </div>
      </dialog>
    </>
  );
};
