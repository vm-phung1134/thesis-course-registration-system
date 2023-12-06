import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Breadcrumb, NormalAvatar, SnipperRound } from "@/components/Atoms";
import { BREADCRUMB_ACCOUNT_STUDENT } from "./mock-data";
import { InforUserForm, RegistrationTopicForm } from "@/components/Molecules";
import { INITIATE_TOPIC } from "@/data";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { getTopic } from "@/redux/reducer/topic/api";
import { ITopicObject } from "@/interface/topic";
import classNames from "classnames";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { motion } from "framer-motion";
import { useLanguageContext } from "@/contexts/languageContext";

function AccountStudentPage() {
  const { t } = useLanguageContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [toggle, setToggle] = useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": toggle,
  });
  const { currentUser } = useCurrentUserContext();
  function splitFullName(fullName: string): [string, string, string] {
    const nameParts = fullName.split(" ");
    const lastName = nameParts[0];
    const middleName = nameParts.slice(1, -1).join(" ");
    const firstName = nameParts[nameParts.length - 1];
    return [lastName, middleName, firstName];
  }
  const [lastName, middleName, firstName] = splitFullName(currentUser?.name);
  const dispatch = useAppDispatch();
  const { data: topic } = useQuery<ITopicObject>({
    queryKey: ["get-one-topic", currentUser],
    queryFn: async () => {
      const action = await dispatch(getTopic(currentUser));
      return action.payload || INITIATE_TOPIC;
    },
    initialData: INITIATE_TOPIC,
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <>
      <MainboardTemplate title="Account & Registration topics | Thesis course registration system">
        {loading ? (
          <SnipperRound />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Breadcrumb dataBreadcrumb={BREADCRUMB_ACCOUNT_STUDENT} />
            <div className="my-3 py-2 flex gap-2 items-center">
              <h4 className="text-xl capitalize text-green-700 font-medium dark:text-green-500">
                {t.acc_register_title_page}
              </h4>
              <div className="flex-grow h-[0.5px] bg-green-700"></div>
            </div>
            <div className="my-5">
              <div className="grid grid-cols-2 gap-10">
                <section className="shadow-lg p-5 rounded-xl border">
                  <RegistrationTopicForm topic={topic} />
                </section>
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
                        className="border bg-green-700 text-white flex gap-2 px-6 py-2 rounded-full text-sm dark:border-none"
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
                      {t.acc_profile_item1}
                    </h4>
                    <ul className="grid grid-cols-2">
                      <li className="flex flex-col mt-4">
                        <p className="text-gray-500">{t.acc_profile_item2}</p>
                        <p className="capitalize">
                          {lastName + " " + middleName}
                        </p>
                      </li>
                      <li className="flex flex-col mt-4">
                        <p className="text-gray-500">{t.acc_profile_item3}</p>
                        <p className="capitalize">{firstName}</p>
                      </li>
                    </ul>
                    <ul className="grid grid-cols-2">
                      <li className="flex flex-col mt-4">
                        <p className="text-gray-500">{t.acc_profile_item4}</p>
                        <p>{currentUser.email}</p>
                      </li>
                      <div className="flex flex-col mt-4">
                        <p className=" text-gray-500">{t.acc_profile_item5}</p>
                        <p className="capitalize">+84 {currentUser.phone}</p>
                      </div>
                    </ul>
                    <ul className="grid grid-cols-2">
                      <li className="flex flex-col mt-4">
                        <p className="text-gray-500">{t.acc_profile_item6}</p>
                        <p>{currentUser.class}</p>
                      </li>
                      <div className="flex flex-col mt-4">
                        <p className=" text-gray-500">{t.acc_profile_item7}</p>
                        <p className="capitalize">{currentUser.major}</p>
                      </div>
                    </ul>
                  </div>
                </section>
              </div>
            </div>
            <dialog id="modal_update_info_student" className={modalClass}>
              <div className="w-5/12 bg-white p-5 h-fit shadow-2xl rounded-xl">
                <InforUserForm
                  values={currentUser}
                  setToggle={setToggle}
                  toggle={toggle}
                />
              </div>
            </dialog>
          </motion.div>
        )}
      </MainboardTemplate>
    </>
  );
}

export default AccountStudentPage;
