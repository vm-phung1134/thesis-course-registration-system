import { Avatar, Button } from "@/components/Atoms";
import { InforUserForm } from "@/components/Molecules";
import { INITIATE_AUTH } from "@/data";
import { useUserCookies } from "@/hooks/useCookies";
import { IAuthObject } from "@/interface/auth";
import { getAuth } from "@/redux/reducer/auth/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { Formik } from "formik";
import { FC, useState } from "react";

export interface IPersonalInformationProps {}

export const PersonalInformation: FC<IPersonalInformationProps> = () => {
  const dispatch = useAppDispatch();
  const [toggle, setToggle] = useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": toggle,
  });
  const [userCookies] = useUserCookies();
  const { data, isLoading } = useQuery<IAuthObject>({
    queryKey: ["auth", userCookies],
    queryFn: async () => {
      const action = await dispatch(getAuth(userCookies));
      return action.payload;
    },
    initialData: INITIATE_AUTH,
  });
  const initialValues: IAuthObject = data;
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validate={(values) => {
        let errors: any = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        // Email
        if (!values.email) {
          errors.email = "! Email is required";
        } else if (!emailRegex.test(values.email)) {
          errors.email = "! Email invalid";
        }
        // Full Name
        if (!values.name) {
          errors.name = "! Full name is required";
        } else if (values.name.length > 50) {
          errors.name = "! Full name less than 50 characters";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <>
            <div className="p-5 w-[90%] text-sm">
              <h4 className="font-medium bg-green-600 text-white uppercase p-3">
                Information personal
              </h4>
              <div className="flex flex-col items-center gap-2 justify-center mt-3">
                <Avatar widthStr="w-14" srcImg={initialValues.photoSrc || ""} />
                <p className="text-xs italic text-gray-500">
                  Upload your photo
                </p>
              </div>
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
                <InforUserForm
                  values={values}
                  setToggleForm={setToggle}
                  toggleForm={toggle}
                />
              </div>
            </dialog>
          </>
        );
      }}
    </Formik>
  );
};
