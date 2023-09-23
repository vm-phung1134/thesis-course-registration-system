import { IAuthObject } from "@/interface/auth";
import { convertToUnaccentedString } from "@/utils/convertString";
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
          <p className="uppercase">{convertToUnaccentedString(member?.name)}</p>
        </li>
        <li className="flex gap-3">
          <p className="text-gray-500">Class: </p>
          <p className="uppercase">{member?.class}</p>
        </li>
        <li className="flex gap-3">
          <p className="text-gray-500">Email: </p>
          <p className="">{member?.email}</p>
        </li>
        <li className="flex gap-3">
          <p className="text-gray-500">Phone: </p>
          <p className="">{member?.phone}</p>
        </li>
        <li className="flex gap-3">
          <p className="text-gray-500">Major: </p>
          <p className="capitalize">{member?.major}</p>
        </li>
      </ul>
    </div>
  );
};
