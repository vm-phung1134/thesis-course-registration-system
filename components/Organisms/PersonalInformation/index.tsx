import { Button, FormField, TitleFormField } from "@/components/Atoms";
import { InforUserForm } from "@/components/Molecules";
import { useAuthContext } from "@/contexts/authContext";
import { INITIATE_AUTH } from "@/data";
import { IAuthObject } from "@/interface/auth";
import classNames from "classnames";
import { Formik } from "formik";
import { FC, useState } from "react";

export interface IPersonalInformationProps {}

export const PersonalInformation: FC<IPersonalInformationProps> = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": toggle,
  });
  const { user } = useAuthContext();
  const initialValues: IAuthObject = user || INITIATE_AUTH;
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <>
        <div className="p-5 w-[90%]">
          <h4 className="text-base font-medium bg-green-600 text-white uppercase p-3">
            Information personal
          </h4>
          <ul className="py-5 flex flex-col gap-3 px-3">
            <li className="flex justify-between">
              <span className="text-gray-600">Full name:</span>
              <span className="capitalize">{initialValues?.name}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Class:</span>
              {initialValues?.class ? (
                <span className="uppercase">{initialValues?.class}</span>
              ) : (
                <span className="text-xs font-thin italic text-gray-400">
                  Please fill out your information
                </span>
              )}
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span>{initialValues?.email}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              {initialValues?.phone ? (
                <span className="uppercase">{initialValues?.phone}</span>
              ) : (
                <span className="text-xs font-thin italic text-gray-400">
                  Please fill out your information
                </span>
              )}
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Major:</span>
              {initialValues?.major ? (
                <span className="uppercase">{initialValues?.major}</span>
              ) : (
                <span className="text-xs font-thin italic text-gray-400">
                  Please fill out your information
                </span>
              )}
            </li>
            <div className="flex justify-end mt-5">
              <Button
                toggle={toggle}
                setToggle={setToggle}
                className="bg-green-600 text-white text-sm hover:bg-green-800"
                title="Update personal information"
              />
            </div>
          </ul>
        </div>
        <dialog id="my_modal_4" className={modalClass}>
          <div className="w-5/12 bg-white p-5 h-fit shadow-2xl">
            <InforUserForm setToggleForm={setToggle} toggleForm={toggle} />
          </div>
        </dialog>
      </>
    </Formik>
  );
};
