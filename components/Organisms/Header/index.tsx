import { Avatar } from "@/components/Atoms";
import { useAuthContext } from "@/contexts/authContext";
import { FC } from "react";

export interface IHeaderProps {}

export const Header: FC<IHeaderProps> = () => {
  const { user, logout } = useAuthContext();
  return (
    <div className="navbar border-b p-5">
      <div className="justify-between w-full">
        <form action="">
          <div className="flex border w-96 px-3 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-5 flex-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              placeholder="Search for anything..."
              type="text"
              className="input h-10 text-[15px] focus:outline-none rounded-none flex-1"
            />
          </div>
        </form>
        <div className="flex gap-10">
          <div className="flex">
            <button className="btn btn-ghost btn-circle">
              <div className="indicator text-lg p-1">
                <i className="fa-regular fa-bookmark"></i>
              </div>
            </button>
            <button className="btn btn-ghost btn-circle">
              <div className="indicator text-lg p-1">
                <i className="fa-regular fa-comment"></i>
                <span className="badge h-[0.6rem] text-[10px] px-[4px] bg-red-500 indicator-item"></span>
              </div>
            </button>
            <button className="btn btn-ghost btn-circle">
              <div className="indicator text-lg p-1">
                <i className="fa-regular fa-bell"></i>
                <span className="badge h-[0.6rem] text-[10px] px-[4px] bg-red-500 indicator-item"></span>
              </div>
            </button>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="flex gap-3 items-center cursor-pointer"
            >
              <div className="flex flex-col text-[15px] font-normal items-end">
                <p>{user?.email || "example@ctu.edu.vn"}</p>
                <p className="text-green-800 text-sm">Pov: Lecturer</p>
              </div>
              <Avatar
                online={true}
                widthStr="w-10"
                srcImg={user?.photoSrc || ""}
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu mt-5 p-2 shadow-lg bg-base-100 rounded-none w-56"
            >
              <li>
                <a className="rounded-none">Profile</a>
              </li>
              <li>
                <a className="rounded-none">Theme</a>
              </li>
              <li>
                <a className="rounded-none">Setting</a>
              </li>
              <li onClick={logout}>
                <a className="rounded-none">Sign out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
