import Link from "next/link";
import { FC } from "react";

export interface ImenuClassroomItem {
  id: string;
  href: string;
  title: string;
}

export interface IMenuClassroomProps {
  listMenu: ImenuClassroomItem[];
}

export const MenuClassroom: FC<IMenuClassroomProps> = ({ listMenu }) => {
  return (
    <ul className="flex gap-10 mb-10 text-[15px] font-normal justify-center">
      {listMenu?.map((item) => {
        return (
          <li key={item.id}>
            <Link
              className="hover:white text-white hover:bg-transparent relative after:absolute after:bg-white 
                      after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500
                      cursor-pointer py-1 capitalize"
              href={item.href}
            >
              {item?.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
