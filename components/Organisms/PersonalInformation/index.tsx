import { Button, FormField, TitleFormField } from "@/components/Atoms";
import { InforUserForm } from "@/components/Molecules";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { FC, useState } from "react";

export interface IPersonalInformationProps {}

export const PersonalInformation: FC<IPersonalInformationProps> = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": toggle,
  });
  return (
    <Formik
      initialValues={{
        name: "",
        class: "",
        email: "",
        phone: "",
        major: "",
        avt: "",
      }}
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
        <div className="p-5">
          <h4 className="text-base font-medium w-[90%] bg-green-600 text-white uppercase p-3">
            Information personal
          </h4>
          <ul className="py-5 w-[90%] flex flex-col gap-3 px-3">
            <li className="flex justify-between">
              <span className="text-gray-600">Full name:</span>
              <span className="capitalize">vo minh phung</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Class:</span>
              <span className="uppercase">DIV9V7A7</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span>phungb1910282@student.ctu.edu.vn</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span>0945738212</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Major:</span>
              <span className="capitalize">Information technology</span>
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
