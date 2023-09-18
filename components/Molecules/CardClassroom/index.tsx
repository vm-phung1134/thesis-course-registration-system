import { FC } from "react";
import { Avatar, Button } from "@/components/Atoms";
import { IClassroomObject } from "@/interface/classroom";

interface ICardClassroomProps {
  item: IClassroomObject;
}

export const CardClassroom: FC<ICardClassroomProps> = ({ item }) => {
  return (
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
  );
};
