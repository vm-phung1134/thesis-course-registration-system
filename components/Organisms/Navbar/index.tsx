/* eslint-disable @next/next/no-img-element */
import { Avatar } from "@/components/Atoms";
import DarkModeToggle from "@/components/Atoms/ToggleDarkMode";
import { SearchForm } from "@/components/Molecules";
import { useAuthContext } from "@/contexts/authContext";
import { useLanguageContext } from "@/contexts/languageContext";
import { useSocket } from "@/contexts/useSocketContext";
import { TYPE_ACTION_NOTIFICATION } from "@/data";
import { useUserCookies } from "@/hooks/useCookies";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { INotification } from "@/interface/notification";
import Image from "next/image";
import { FC, useEffect } from "react";

export interface INavbarProps {}

export const Navbar: FC<INavbarProps> = () => {
  const { logout, checkUserLoginState } = useAuthContext();
  const { currentUser } = useCurrentUser();
  const [user,] = useUserCookies()
  const { allNotifications } = useSocket();
  const { handleChangeLanguage, localeValue } = useLanguageContext();
  useEffect(() => {
    checkUserLoginState();
  }, [checkUserLoginState]);
  return (
    <div className="navbar shadow-sm border-b rounded-br-[3rem] dark:border-gray-500 p-5 top-0 sticky dark:bg-black bg-white z-10">
      <div className="justify-between w-full">
        <SearchForm />
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
                className={`${localeValue === "en" && "text-green-700 "} px-3`}
                onClick={() => handleChangeLanguage("en")}
              >
                English
              </button>
              <span className="border-r border-gray-300"></span>
              <button
                className={`${localeValue === "vi" && "text-green-700 "} px-3`}
                onClick={() => handleChangeLanguage("vi")}
              >
                Vietnam
              </button>
            </div>

            <button className="btn btn-ghost btn-circle">
              <div className="indicator text-lg p-1">
                <Image
                  width={18}
                  height={18}
                  alt="icon-archire"
                  src={
                    "https://cdn-icons-png.flaticon.com/128/2541/2541979.png"
                  }
                />
              </div>
            </button>
            <button className="btn btn-ghost btn-circle">
              <div className="indicator text-lg p-1">
                <Image
                  width={18}
                  height={18}
                  alt="icon-message"
                  src={"https://cdn-icons-png.flaticon.com/128/134/134808.png"}
                />
                <span className="badge h-[0.5rem] rounded-full border-none text-[10px] px-[4px] bg-red-500 indicator-item"></span>
              </div>
            </button>
            {/* Drawer message */}
            <div className="drawer drawer-end">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                <label
                  htmlFor="my-drawer-4"
                  className="drawer-button btn btn-primary btn-ghost btn-circle"
                >
                  <div className="indicator text-lg p-1">
                    <Image
                      width={18}
                      height={18}
                      alt="icon-bell"
                      src={
                        "https://cdn-icons-png.flaticon.com/128/1157/1157051.png"
                      }
                    />
                    <span className="badge h-[0.5rem] rounded-full border-none text-[10px] px-[4px] bg-red-500 indicator-item"></span>
                  </div>
                </label>
              </div>
              <div className="drawer-side z-10">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <div className="menu p-4 w-96 h-screen bg-base-100 text-base-content">
                  <h4 className="font-bold text-2xl mb-5 text-green-700">
                    Your Notifications
                  </h4>
                  {allNotifications.length > 0 ? (
                    <div>
                      {allNotifications.map((notify, index) => {
                        return (
                          index < 5 && (
                            <NotificationItem
                              key={notify.receiverAuthor.id}
                              notify={notify}
                            />
                          )
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-300 py-5">{`Sorry, You don't have any message`}</p>
                  )}
                  <div className="flex justify-end mt-5">
                    <button className="btn border-none normal-case bg-transparent btn-xs hover:bg-transparent">
                      See all
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="flex gap-3 items-center cursor-pointer">
            <div className="flex flex-col text-[15px] font-normal items-end">
              <p className="font-medium text-sm capitalize">
                {currentUser?.name || "Username B190000"}
              </p>
              <p className="text-green-800 text-sm capitalize">
                Pov: {currentUser?.role || "Student"}
              </p>
            </div>
            <div className="w-11 h-10 flex-shrink-0 mr-2 sm:mr-3">
              <div className="avatar object-center">
                <div className="rounded-full">
                  <img
                    width={100}
                    height={100}
                    alt=""
                    src={currentUser?.photoSrc}
                  />
                </div>
              </div>
            </div>
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
  );
};

const NotificationItem = ({ notify }: { notify: INotification }) => {
  let action: string;
  switch (notify.type) {
    case TYPE_ACTION_NOTIFICATION.SHARE_POST:
      action = "Has been share your post";
      break;
    case TYPE_ACTION_NOTIFICATION.COMMENT_POST:
      action = "Has been comment your post recently";
      break;
    case TYPE_ACTION_NOTIFICATION.LIKE_POST:
      action = "Has been just like your post";
      break;
    case TYPE_ACTION_NOTIFICATION.WELLCOME:
      action = "Wellcome you to my website";
      break;
    case TYPE_ACTION_NOTIFICATION.FOLLOWING:
      action = "Has been following you";
      break;
    case TYPE_ACTION_NOTIFICATION.ADD_POST:
      action = "Has been added new post";
      break;
    default:
      action = "Say hi to your";
      break;
  }
  return (
    <div className="flex justify-between border-b pb-2">
      <div className="flex gap-3 items-center">
        <div className="avatar h-10">
          <div className="w-10 rounded-full">
            <img src={notify?.senderUser.photoSrc} alt="Avatar" />
          </div>
        </div>
        <div className="flex flex-col">
          <small>22, August 2023</small>
          <p className="text-[13px]">
            <span className="font-medium">{notify.senderUser.name}</span>{" "}
            {action}
          </p>
          <small>Just now</small>
        </div>
      </div>
      <div>
        <button className="btn bg-transparent border-none">...</button>
      </div>
    </div>
  );
};
