import { Avatar } from "@/components/Atoms";
import DarkModeToggle from "@/components/Atoms/ToggleDarkMode";
import { useAuthContext } from "@/contexts/authContext";
import { useLanguageContext } from "@/contexts/languageContext";
import Image from "next/image";
import { FC } from "react";

export interface IHeaderProps {}

export const Header: FC<IHeaderProps> = () => {
  const { user, logout } = useAuthContext();
  const { handleChangeLanguage, localeValue } = useLanguageContext();
  return (
    <div className="navbar border-b dark:border-gray-500 p-5">
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
              className="input dark:bg-black h-10 text-[15px] focus:outline-none rounded-none flex-1"
            />
          </div>
        </form>
        <div className="flex gap-10">
          <div className="flex items-center">
            {/* CHANGE LANGUAGE */}
            <div className="font-medium text-xs mr-5 flex">
              <Image
                src="https://www.honorofkings.com/img/language_icon.png"
                width="17"
                height="15"
                alt="icon-language"
              />
              <button
                className={`${localeValue === "en" && "text-green-600 "} px-3`}
                onClick={() => handleChangeLanguage("en")}
              >
                English
              </button>
              <span className="border-r border-gray-300"></span>
              <button
                className={`${localeValue === "vi" && "text-green-600 "} px-3`}
                onClick={() => handleChangeLanguage("vi")}
              >
                Vietnam
              </button>
            </div>

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
                <p className="text-green-800 text-sm capitalize">
                  Pov: {user?.role || "Student"}
                </p>
              </div>
              <Avatar
                online={true}
                widthStr="w-10"
                srcImg={user?.photoSrc || ""}
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu mt-5 p-2 shadow-lg bg-base-100 dark:bg-black rounded-none w-56"
            >
              <li>
                <a className="rounded-none dark:bg-[#1f1f1f] dark:text-white dark:hover:bg-green-600">
                  Profile
                </a>
              </li>
              <li>
                <div className="rounded-none flex justify-between dark:bg-[#000000] dark:text-white dark:hover:bg-green-600">
                  <a href="">Dark mode</a>
                  <DarkModeToggle />
                </div>
              </li>
              <li>
                <a className="rounded-none dark:bg-[#000000] dark:text-white dark:hover:bg-green-600">
                  Setting
                </a>
              </li>
              <li onClick={logout}>
                <a className="rounded-none dark:bg-[#000000] dark:text-white dark:hover:bg-green-600">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
