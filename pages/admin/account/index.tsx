import { useState, useEffect } from "react";
import { AdminTemplate } from "@/components/Templates";
import { Breadcrumb, NormalAvatar, SnipperRound } from "@/components/Atoms";
import { ChangePassForm, InforUserForm } from "@/components/Molecules";
import classNames from "classnames";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { BREADCRUMB_ACCOUNT_ADMIN } from "./mock-data";
import { useCurrentUserContext } from "@/contexts/currentUserContext";

function AccountAdminPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [toggle, setToggle] = useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": toggle,
  });
  const { currentUser } = useCurrentUserContext();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <>
      <AdminTemplate title="Account profile | Thesis course registration system">
        {loading ? (
          <SnipperRound />
        ) : (
          <div>
            <Breadcrumb dataBreadcrumb={BREADCRUMB_ACCOUNT_ADMIN} />
            <div className="my-3 py-2 flex gap-2 items-center">
              <h4 className="text-xl capitalize text-green-700 font-medium ">
                Admin <span className="text-green-700"> Profile</span>
              </h4>
              <div className="flex-grow h-[0.5px] bg-green-700"></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <section>
                <div className="flex items-center justify-between border rounded-xl">
                  <div className="flex gap-3 items-center p-5">
                    <NormalAvatar
                      setSize="w-16"
                      photoSrc={currentUser.photoSrc}
                    />
                    <div>
                      <h3 className="text-lg font-medium capitalize">
                        {currentUser.name}
                      </h3>
                      <p>{currentUser.email}</p>
                      <p className="text-sm">{currentUser.major}</p>
                    </div>
                  </div>
                  <div className="mx-5">
                    <button
                      onClick={() => setToggle(!toggle)}
                      className="border bg-green-700 text-white flex gap-2 px-6 py-2 rounded-full text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      Edit
                    </button>
                  </div>
                </div>
                <div className="flex flex-col border rounded-xl p-5 mt-3 text-sm">
                  <h4 className="font-medium capitalize text-base">
                    Personal information
                  </h4>
                  <ul className="flex my-2">
                    <li className="flex-grow">
                      <p className="text-gray-500">First Name</p>
                      <p className="capitalize">Admin</p>
                    </li>
                    <li className="flex-grow">
                      <p className="text-gray-500">Last Name</p>
                      <p className="capitalize">System</p>
                    </li>
                  </ul>
                  <ul className="flex my-2">
                    <li className="flex-grow">
                      <p className="text-gray-500">Email</p>
                      <p>{currentUser.email}</p>
                    </li>
                    <div className="flex-grow">
                      <p className=" text-gray-500">Phone</p>
                      <p className="capitalize">
                        +84 {currentUser.phone || "09090909"}
                      </p>
                    </div>
                  </ul>
                </div>
              </section>
              <section>
                <div className="flex flex-col border rounded-xl p-5 h-28">
                  <h4 className="font-medium capitalize text-base">About me</h4>
                  <p className="text-gray-400 text-sm my-2">
                    Add introduced yourselft ...
                  </p>
                </div>
                <div className="flex flex-col border rounded-xl p-5 my-3 text-sm">
                  <h4 className="font-medium capitalize text-base">
                    specialist information
                  </h4>
                  <ul className="flex my-2">
                    <li className="flex-grow">
                      <p className="text-gray-500">Department</p>
                      <p className="capitalize">
                        {currentUser.class || "CNTT"}
                      </p>
                    </li>
                    <li className="flex-grow">
                      <p className="text-gray-500">
                        Professional qualifications
                      </p>
                      <p className="capitalize">
                        {currentUser.major || "Computer scientist"}
                      </p>
                    </li>
                  </ul>
                </div>
              </section>
            </div>
            <div className="my-5 w-full">
              <h4 className="font-medium text-green-700 mb-5">Change password</h4>
              <ChangePassForm />
            </div>
            <dialog id="modal_update_infor_instructor" className={modalClass}>
              <div className="w-5/12 bg-white p-5 h-fit shadow-2xl rounded-xl">
                <InforUserForm
                  values={currentUser}
                  setToggle={setToggle}
                  toggle={toggle}
                />
              </div>
            </dialog>
          </div>
        )}
      </AdminTemplate>
    </>
  );
}

export default AccountAdminPage;
