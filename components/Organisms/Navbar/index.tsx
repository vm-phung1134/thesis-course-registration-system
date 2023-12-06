/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
import { Avatar, Button, NormalAvatar } from "@/components/Atoms";
import DarkModeToggle from "@/components/Atoms/ToggleDarkMode";
import {
  CommentForm,
  FilterScheduledForm,
  PrivateCommentForm,
  SearchForm,
} from "@/components/Molecules";
import { ROLE_ASSIGNMENT, useAuthContext } from "@/contexts/authContext";
import { useLanguageContext } from "@/contexts/languageContext";
import { INITIATE_PRIVATE_COMMENT, TYPE_ACTION_NOTIFICATION } from "@/data";
import { useUserCookies } from "@/hooks/useCookies";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { INotification } from "@/interface/notification";
import {
  IPrivateComment,
  IPrivateCommentItem,
} from "@/interface/privateComment";
import {
  getAllPrivateCommentForLecturer,
  getAllPrivateComments,
} from "@/redux/reducer/private-comment/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FC, memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useClassroomStateContext } from "@/contexts/classroomState";

export interface INavbarProps {}
export const Navbar: FC<INavbarProps> = memo(() => {
  const { t } = useLanguageContext();
  const dispatch = useAppDispatch();
  const { logout } = useAuthContext();
  const { currentUser } = useCurrentUser();
  const { handleChangeLanguage, localeValue } = useLanguageContext();
  const { data: comments } = useQuery<IPrivateComment>({
    queryKey: ["private-comments", currentUser],
    queryFn: async () => {
      const action = await dispatch(getAllPrivateComments(currentUser));
      return action.payload || INITIATE_PRIVATE_COMMENT;
    },
    initialData: INITIATE_PRIVATE_COMMENT,
  });
  const { authClassroomState } = useClassroomStateContext();
  const { data: lecturerComments } = useQuery<IPrivateComment[]>({
    queryKey: ["private-lecturer-comments", currentUser],
    queryFn: async () => {
      const action = await dispatch(
        getAllPrivateCommentForLecturer(currentUser)
      );
      return action.payload || [];
    },
    initialData: [],
  });
  const [selectedItem, setSelectedItem] = useState<IPrivateComment | null>(
    null
  );
  const handleClick = (item: IPrivateComment) => {
    setSelectedItem(item);
  };
  return (
    <div className="navbar shadow-sm border-b rounded-br-[3rem] dark:border-gray-500 p-5 top-0 sticky dark:bg-[#141E37] dark:text-[#dedede] bg-white z-10">
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
                className={`${localeValue === "en" && "text-green-700 dark:text-green-500"} px-3`}
                onClick={() => handleChangeLanguage("en")}
              >
                English
              </button>
              <span className="border-r border-gray-300"></span>
              <button
                className={`${localeValue === "vi" && "text-green-700 dark:text-green-500"} px-3`}
                onClick={() => handleChangeLanguage("vi")}
              >
                Vietnam
              </button>
            </div>
            <button className="btn btn-ghost btn-circle">
              <div className="indicator text-lg p-1 dark:bg-gray-200 dark:rounded-full">
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
            {/* Drawer message */}
            <div className="drawer drawer-end">
              <input
                id="my-drawer-message"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                <label
                  htmlFor="my-drawer-message"
                  className="drawer-button btn btn-primary btn-ghost btn-circle"
                >
                  <div className="indicator text-lg p-1 dark:bg-gray-200 dark:rounded-full">
                    <Image
                      width={18}
                      height={18}
                      alt="icon-message"
                      src={
                        "https://cdn-icons-png.flaticon.com/128/134/134808.png"
                      }
                    />
                    <span className="badge h-[0.5rem] rounded-full border-none text-[10px] px-[4px] bg-red-500 indicator-item"></span>
                  </div>
                </label>
              </div>
              {currentUser.role === ROLE_ASSIGNMENT.STUDENT && (
                <div className="drawer-side z-10">
                  <label
                    htmlFor="my-drawer-message"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <div className="menu p-4 w-[28rem] relative h-screen bg-base-100 text-base-content">
                    <h4 className="font-bold text-2xl text-green-700 mb-1">
                      Private chat
                    </h4>
                    <div className="flex gap-3 justify-between border-b p-2">
                      <div className="flex gap-3">
                        <NormalAvatar
                          setSize="w-10"
                          photoSrc={authClassroomState?.lecturer.photoSrc || ""}
                        />
                        <div>
                          <h4 className="font-medium capitalize">
                            {authClassroomState?.lecturer.name}
                          </h4>
                          <p className="text-xs">Active 36m ago</p>
                        </div>
                      </div>
                      <div className="h-6">
                        <Image
                          width={20}
                          height={10}
                          alt="icon-message"
                          src={
                            "https://cdn-icons-png.flaticon.com/128/929/929539.png"
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-5 overflow-y-scroll">
                      {comments.comments.map((cmt) => {
                        return (
                          <div key={cmt.id}>
                            {cmt.user.id ===
                              authClassroomState?.lecturer.id && (
                              <div className="chat chat-start">
                                <div className="chat-image avatar">
                                  <NormalAvatar
                                    setSize="w-8"
                                    photoSrc={cmt.user.photoSrc}
                                  />
                                </div>
                                <div className="chat-bubble bg-green-700 text-white">
                                  {cmt.content}
                                </div>
                                <time className="text-[10px] opacity-70">
                                  12:45
                                </time>
                              </div>
                            )}
                            {cmt.user.id === currentUser.id && (
                              <div className="chat chat-end">
                                <div className="chat-image avatar">
                                  <NormalAvatar
                                    setSize="w-8"
                                    photoSrc={cmt.user.photoSrc}
                                  />
                                </div>
                                <div className="chat-bubble">{cmt.content}</div>
                                <time className="opacity-50 text-[10px]">
                                  12:45
                                </time>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-auto fixed bottom-3 left-2 right-2">
                      <PrivateCommentForm />
                    </div>
                  </div>
                </div>
              )}
              {!authClassroomState && (
                <div className="drawer-side z-10">
                  <label
                    htmlFor="my-drawer-message"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <div className="menu p-4 w-[28rem] relative h-screen bg-base-100 text-base-content">
                    <h4 className="font-bold text-2xl text-green-700 mb-1">
                      Private chat
                    </h4>
                    <div className="h-96 flex gap-5 flex-col justify-center items-center p-5">
                      <Image
                        src="https://cdn-icons-gif.flaticon.com/8121/8121267.gif"
                        width="50"
                        height="50"
                        className="-hue-rotate-[38deg] saturate-[.85]"
                        alt=""
                      />
                      <p className="font-medium text-center text-lg">
                        Ops! You must instructor accepted into classroom to use
                        this featurer
                      </p>
                      <Button
                        className="bg-green-700 text-white"
                        title="Go to mainboard"
                      />
                    </div>
                  </div>
                </div>
              )}
              {/* THÔNG BÁO CỦA GIẢNG VIÊN */}
              {currentUser.role === ROLE_ASSIGNMENT.LECTURER && (
                <div className="drawer-side z-10">
                  <label
                    htmlFor="my-drawer-message"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <div className="menu p-4 w-[28rem] relative h-screen bg-base-100 text-base-content">
                    <div className="mb-5">
                      <h4 className="font-bold text-2xl text-green-700">
                        Classroom Chats
                      </h4>
                      <span className="text-sm text-black font-thin">{`( You have received a new notification )`}</span>
                    </div>
                    <FilterScheduledForm holderText="Search message" />
                    {lecturerComments?.map((comment, index) => {
                      return (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1, delay: index * 0.5 }}
                          onClick={() => handleClick(comment)}
                          key={comment?.id}
                          className="mt-5 px-5 py-2 rounded-xl shadow-md cursor-pointer hover:bg-slate-50 transform duration-300 ease-linear"
                        >
                          <div className="flex gap-3">
                            <NormalAvatar
                              photoSrc={comment?.user?.photoSrc}
                              setSize="w-10"
                            />
                            <div className="flex flex-col">
                              <div className="flex gap-3 items-center">
                                <p className="font-medium">
                                  {comment?.user?.name}
                                </p>
                                <time className="text-[10px] opacity-50">
                                  12:45
                                </time>
                              </div>
                              <p>New message</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
              {/* DETAIL MESSAGE OF STUDENT FOR LECTURER */}
              {currentUser.role === ROLE_ASSIGNMENT.LECTURER &&
                selectedItem && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="drawer-side z-10"
                  >
                    <label
                      htmlFor="my-drawer-message"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <div className="menu p-4 w-[28rem] relative h-screen bg-base-100 text-base-content">
                      <div
                        onClick={() => setSelectedItem(null)}
                        className="flex gap-3 mb-2 cursor-pointer text-green-700"
                      >
                        <Image
                          width={20}
                          height={10}
                          alt="icon-message"
                          src={
                            "https://cdn-icons-png.flaticon.com/128/2732/2732652.png"
                          }
                        />
                        Back to chats
                      </div>
                      <div className="flex gap-3 justify-between border-b p-2">
                        <div className="flex gap-3">
                          <NormalAvatar
                            setSize="w-10"
                            photoSrc={selectedItem?.user?.photoSrc}
                          />
                          <div>
                            <h4 className="font-medium">
                              {selectedItem?.user?.name}
                            </h4>
                            <p className="text-xs">Active 36m ago</p>
                          </div>
                        </div>
                        <div className="h-6">
                          <Image
                            width={20}
                            height={10}
                            alt="icon-message"
                            src={
                              "https://cdn-icons-png.flaticon.com/128/929/929539.png"
                            }
                          />
                        </div>
                      </div>
                      <div className="mt-5 overflow-y-scroll">
                        {selectedItem.comments.map((cmt) => {
                          return (
                            <div key={cmt.id} className="overflow-y-scroll">
                              {selectedItem.user.id === cmt.user.id && (
                                <div className="chat chat-start">
                                  <div className="chat-image avatar">
                                    <NormalAvatar
                                      setSize="w-8"
                                      photoSrc={cmt?.user?.photoSrc}
                                    />
                                  </div>
                                  <div className="chat-bubble chat-bubble-success">
                                    {cmt.content}
                                  </div>
                                  <time className="text-[10px] opacity-80">
                                    12:45
                                  </time>
                                </div>
                              )}
                              {cmt.user.id === currentUser.id && (
                                <div className="chat chat-end">
                                  <div className="chat-image avatar">
                                    <NormalAvatar
                                      setSize="w-8"
                                      photoSrc={cmt?.user?.photoSrc}
                                    />
                                  </div>
                                  <div className="chat-bubble">
                                    {cmt.content}
                                  </div>
                                  <time className="opacity-80 text-[10px]">
                                    12:45
                                  </time>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-auto fixed bottom-3 left-2 right-2">
                        <PrivateCommentForm user={selectedItem.user} />
                      </div>
                    </div>
                  </motion.div>
                )}
            </div>
            {/* Drawer notification */}
            <div className="drawer drawer-end">
              <input
                id="my-drawer-notification"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                <label
                  htmlFor="my-drawer-notification"
                  className="drawer-button btn btn-primary btn-ghost btn-circle"
                >
                  <div className="indicator text-lg p-1 dark:bg-gray-200 dark:rounded-full">
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
                  htmlFor="my-drawer-notification"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <div className="menu p-4 w-96 h-screen bg-base-100 text-base-content">
                  <h4 className="font-bold text-2xl mb-5 text-green-700">
                    Your Notifications
                  </h4>
                  {/* {allNotifications.length > 0 ? (
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
                    <p className="text-gray-300 py-5">{`Sorry, You don't have any notifications`}</p>
                  )} */}
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
                {currentUser?.name}
              </p>
              <p className="text-green-800 text-sm capitalize dark:text-green-500">
                Pov: {currentUser?.role}
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
            className="dropdown-content z-[1] menu mt-5 p-2 shadow-lg bg-base-100 dark:bg-[#141E37] dark:text-[#dedede] rounded-none w-56"
          >
            <li>
              <a className="rounded-none dark:bg-[#1f1f1f] dark:text-white dark:hover:bg-green-600">
                {t.navBarItem1}
              </a>
            </li>
            <li>
              <div className="rounded-none flex justify-between dark:bg-[#141E37] dark:text-[#dedede] dark:hover:bg-green-600">
                <a href="">{t.navBarItem2}</a>
                <DarkModeToggle />
              </div>
            </li>
            <li>
              <a className="rounded-none dark:bg-[#141E37] dark:text-[#dedede] dark:hover:bg-green-600">
                {t.navBarItem3}
              </a>
            </li>
            <li onClick={logout}>
              <a className="rounded-none dark:bg-[#141E37] dark:text-[#dedede] dark:hover:bg-green-600">
                {t.navBarItem4}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});

// const NotificationItem = ({ notify }: { notify: INotification }) => {
//   let action: string;
//   switch (notify.type) {
//     case TYPE_ACTION_NOTIFICATION.SHARE_POST:
//       action = "Has been share your post";
//       break;
//     case TYPE_ACTION_NOTIFICATION.COMMENT_POST:
//       action = "Has been comment your post recently";
//       break;
//     case TYPE_ACTION_NOTIFICATION.LIKE_POST:
//       action = "Has been just like your post";
//       break;
//     case TYPE_ACTION_NOTIFICATION.WELLCOME:
//       action = "Wellcome you to my website";
//       break;
//     case TYPE_ACTION_NOTIFICATION.FOLLOWING:
//       action = "Has been following you";
//       break;
//     case TYPE_ACTION_NOTIFICATION.ADD_POST:
//       action = "Has been added new post";
//       break;
//     default:
//       action = "Say hi to your";
//       break;
//   }
//   return (
//     <div className="flex justify-between border-b pb-2">
//       <div className="flex gap-3 items-center">
//         <div className="avatar h-10">
//           <div className="w-10 rounded-full">
//             <img src={notify?.senderUser.photoSrc} alt="Avatar" />
//           </div>
//         </div>
//         <div className="flex flex-col">
//           <small>22, August 2023</small>
//           <p className="text-[13px]">
//             <span className="font-medium">{notify.senderUser.name}</span>{" "}
//             {action}
//           </p>
//           <small>Just now</small>
//         </div>
//       </div>
//       <div>
//         <button className="btn bg-transparent border-none">...</button>
//       </div>
//     </div>
//   );
// };
