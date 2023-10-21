import { LogoApp } from "@/components/Molecules";
import { useLanguageContext } from "@/contexts/languageContext";
import Link from "next/link";
import { FC } from "react";

export interface ISidebarStudentViewProps {}

export const SidebarStudentView: FC<ISidebarStudentViewProps> = ({}) => {
  const { t } = useLanguageContext();
  return (
    <div className="sticky top-0 left-0 bottom-0">
      <div className="flex justify-center">
        <LogoApp
          width={30}
          height={30}
          className="text-green-700 font-bold text-xl justify-center"
        />
      </div>

      <ul className="menu gap-3">
        <li>
          <Link
            href="/mainboard"
            className="rounded-none hover:bg-green-700 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="mx-2 text-[15px] font-medium">
              {t.sideBarStudentItem1}
            </span>
          </Link>
        </li>
        <li>
          <details open>
            <summary className="rounded-none hover:bg-green-700 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>
              <span className="mx-2 text-[15px] font-medium">
                {t.sideBarStudentItem2}
              </span>
            </summary>
            <ul className="flex gap-2 flex-col ml-7 mt-4 text-[15px] font-medium">
              <li>
                <Link
                  href="/account/account-student"
                  className="rounded-none hover:bg-green-700 hover:text-white"
                >
                  {t.sideBarStudentItem3}
                </Link>
              </li>
              <li>
                <Link
                  href="/account/account-student"
                  className="rounded-none hover:bg-green-700 hover:text-white"
                >
                  {t.sideBarStudentItem4}
                </Link>
              </li>
            </ul>
          </details>
        </li>

        <div className="w-full h-[1px] bg-green-700"></div>
        <li>
          <Link
            className="rounded-none hover:bg-green-700 hover:text-white"
            href="/manage-classroom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
              />
            </svg>
            <span className="mx-2 text-[15px] font-medium">
              {t.sideBarStudentItem5}
            </span>
          </Link>
        </li>
        <li>
          <Link
            className="rounded-none hover:bg-green-700 hover:text-white"
            href="/enroll-student"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M5 13l4 4L19 7"
              />
            </svg>

            <span className="mx-2 text-[15px] font-medium">Enroll defense</span>
          </Link>
        </li>
        <li>
          <details open>
            <summary className="rounded-none hover:bg-green-700 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>
              <span className="mx-2 text-[15px] font-medium">
                {t.sideBarStudentItem6}
              </span>
            </summary>
            <ul className="flex gap-2 flex-col ml-7 mt-4 text-[15px] font-medium">
              <li>
                <Link
                  href="/tasks/critical-tasks"
                  className="rounded-none hover:bg-green-700 hover:text-white"
                >
                  {t.sideBarStudentItem7}
                </Link>
              </li>
              <li>
                <Link
                  href="/tasks/completed-tasks"
                  className="rounded-none hover:bg-green-700 hover:text-white"
                >
                  {t.sideBarStudentItem8}
                </Link>
              </li>
            </ul>
          </details>
        </li>
        <div className="w-full h-[1px] bg-green-700"></div>
        <li>
          <Link
            className="rounded-none hover:bg-green-700 hover:text-white"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="mx-2 text-[15px] font-medium">
              {t.sideBarStudentItem10}
            </span>
          </Link>
        </li>
        <li>
          <Link
            className="rounded-none hover:bg-green-700 hover:text-white"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              className="h-5 w-5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <polyline points="7 8 3 12 7 16"></polyline>
              <polyline points="17 8 21 12 17 16"></polyline>
              <line x1="14" y1="4" x2="10" y2="20"></line>
            </svg>
            <span className="mx-2 text-[15px] font-medium">
              {`Helps & support`}
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
