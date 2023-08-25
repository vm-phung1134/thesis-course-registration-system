import Head from "next/head";
import Image from "next/image";
import cn from "classnames";
import { useState } from "react";

function ManagementPage() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const modalClass = cn({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModal,
  });
  return (
    <>
      <Head>
        <title>Management Thesis | Thesis course registration system</title>
      </Head>
      <main>
        <div className="grid grid-cols-12 bg-base-100">
          {/* SIDE BAR */}
          <div className="col-span-2 border-r h-screen">
            <div className="w-full flex justify-center py-8">
              <div className="flex gap-3">
                <Image
                  src="https://img.icons8.com/?size=512&id=Fpssohz57mWe&format=png"
                  width="30"
                  height="30"
                  alt="Logo CTU"
                />
                <p className="text-[#018937] font-bold text-xl">TCR System</p>
              </div>
            </div>
            <ul className="menu gap-3">
              <li>
                <a className="rounded-none hover:bg-[#018937] hover:text-white">
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
                  <span className="mx-2 text-sm font-medium">Mainboard</span>
                </a>
              </li>
              <li onClick={() => setOpenModal(!openModal)}>
                <a
                  className="rounded-none hover:bg-[#018937] hover:text-white"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                    />
                  </svg>

                  <span className="mx-2 text-sm font-medium">
                    Course registration
                  </span>
                </a>
              </li>
              <li>
                <a
                  className="rounded-none hover:bg-[#018937] hover:text-white"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="mx-2 text-sm font-medium">Account</span>
                </a>
              </li>
              <div className="w-full h-[1px] bg-[#018937]"></div>
              <li>
                <details open>
                  <summary className="rounded-none hover:bg-[#018937] hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                      />
                    </svg>
                    <span className="mx-2 text-sm font-medium">
                      Assigned tasks
                    </span>
                  </summary>
                  <ul className="flex gap-2 flex-col mt-4">
                    <li>
                      <a className="rounded-none hover:bg-[#018937] hover:text-white">
                        Critical tasks
                      </a>
                    </li>
                    <li>
                      <a className="rounded-none hover:bg-[#018937] hover:text-white">
                        Completed tasks
                      </a>
                    </li>
                  </ul>
                </details>
              </li>
              <div className="w-full h-[1px] bg-[#018937]"></div>
              <li>
                <a
                  className="rounded-none hover:bg-[#018937] hover:text-white"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="mx-2 text-sm font-medium">Setting</span>
                </a>
              </li>
            </ul>
          </div>
          <dialog id="my_modal_1" className={modalClass}>
            <form method="dialog" className="bg-white p-7 shadow-lg">
              <h3 className="font-bold text-lg">TCR Message!!!</h3>
              <p className="py-4 text-sm">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action">
                <button
                  onClick={() => setOpenModal(!openModal)}
                  className="btn bg-transparent hover:bg-transparent border-none font-medium capitalize"
                >
                  Cancel
                </button>
                <button
                  className={`btn capitalize rounded-none hover:text-black bg-[#018937] text-white`}
                >
                  Accept
                </button>
              </div>
            </form>
          </dialog>
          {/* HEADER */}
          <div className="col-span-10">
            <div className="navbar p-5 border-b">
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
                      className="input h-10 tracking-tight font-normal text-sm focus:outline-none rounded-none flex-1"
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
                      <div className="flex flex-col text-sm font-normal items-end">
                        <p>Ariana.CMF@gmail.com</p>
                        <p className="text-green-800 text-[13px]">
                          Pov: Student
                        </p>
                      </div>
                      <div className="avatar online">
                        <div className="w-10 rounded-full">
                          <Image
                            src="https://images.pexels.com/photos/713312/pexels-photo-713312.jpeg?auto=compress&cs=tinysrgb&w=600"
                            width="100"
                            height="100"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu mt-5 p-2 shadow-lg bg-base-100 rounded-none w-56"
                    >
                      <li>
                        <a className="rounded-none">Item 1</a>
                      </li>
                      <li>
                        <a className="rounded-none">Item 2</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* CONTENT */}
            <div className="px-5">
              <div className="text-sm breadcrumbs mt-2">
                <ul>
                  <li>
                    <a>Home</a>
                  </li>
                  <li>
                    <a>Documents</a>
                  </li>
                  <li>Add Document</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-5 mt-5">
                <div className="w-80 shadow-xl">
                  <div className="bg-cover bg-[url('https://images.pexels.com/photos/301943/pexels-photo-301943.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load')]">
                    <div className="bg-black/60 p-5 text-gray-100">
                      <div className="flex justify-between">
                      <p className="text-[12px] flex gap-2">
                        <span>ID Class:</span>
                        <span className="font-semibold">#CT550DAP</span>
                      </p>
                      <button>...</button>
                    </div>
                    <div className="flex gap-2 flex-col">
                      <h3 className="text-xl font-bold capitalize">
                        Le Huynh Quoc Bao
                      </h3>
                      <p className="text-[12px] flex gap-2">
                        <span>Courses:</span>
                        <span className="font-semibold">08/2023_HK1</span>
                      </p>
                      <p className="text-[12px] flex gap-2">
                        <span>Students:</span>
                        <span className="font-semibold">5/15</span>
                      </p>
                    </div>  
                    </div>
                    
                  </div>
                  <div className="h-60 p-3 border relative">
                    <div className="absolute -top-8 right-3">
                      <div className="avatar">
                        <div className="w-16 rounded-full">
                          <Image
                            src="https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&cs=tinysrgb&w=600"
                            width="100"
                            height="100"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="h-full flex flex-col items-end justify-end">
                      <button className="px-4 py-3 bg-[#018739] text-white rounded-none text-xs">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ManagementPage;
