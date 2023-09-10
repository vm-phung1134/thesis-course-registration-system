import { IAuthObject } from "@/interface/auth";
import { FC } from "react";

export interface IPersonalInforProps {
  member: IAuthObject;
}

export const PersonalInfor: FC<IPersonalInforProps> = ({ member }) => {
  return (
    <div>
      <h5 className="mb-5 font-medium capitalize">Personal information</h5>
      <ul className="text-sm flex flex-col gap-3">
        <li className="flex gap-3">
          <p className="text-gray-500">Fullname: </p>
          <p className="uppercase">Vo Minh Phung</p>
        </li>
        <li className="flex gap-3">
          <p className="text-gray-500">Class: </p>
          <p className="uppercase">DI19V7A7</p>
        </li>
        <li className="flex gap-3">
          <p className="text-gray-500">Email: </p>
          <p className="">phungb1910282@student.ctu.edu.vn</p>
        </li>
        <li className="flex gap-3">
          <p className="text-gray-500">Phone: </p>
          <p className="">0591593175</p>
        </li>
        <li className="flex gap-3">
          <p className="text-gray-500">Major: </p>
          <p className="capitalize">Information technology</p>
        </li>
      </ul>
    </div>
  );
};
