import { Avatar, Button, NormalAvatar } from "@/components/Atoms";
import { InforUserForm } from "@/components/Molecules";
import { INITIATE_AUTH } from "@/data";
import { useUserCookies } from "@/hooks/useCookies";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { IAuthObject } from "@/interface/auth";
import { updateAuth } from "@/redux/reducer/auth/api";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { Formik } from "formik";
import { FC, useState } from "react";

export interface IPersonalInformationProps {}

export const PersonalInformation: FC<IPersonalInformationProps> = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [toggle, setToggle] = useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": toggle,
  });
  const { currentUser, user } = useCurrentUser();

  const updateMutation = useMutation(
    (postData: IAuthObject) => {
      return new Promise((resolve, reject) => {
        dispatch(updateAuth(postData))
          .unwrap()
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["auth", user]);
      },
    }
  );

  const initialValues: IAuthObject = currentUser;
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
          updateMutation.mutate(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <>
            <div className="p-5 w-[90%] text-sm">
              <h4 className="text-sm bg-green-700 text-white uppercase p-3">
                Information personal
              </h4>
              <div className="flex flex-col items-center gap-2 justify-center mt-3">
                <NormalAvatar photoSrc={initialValues.photoSrc} setSize="w-14" />
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
                    <span className="capitalize">{initialValues?.major}</span>
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
                    className="bg-green-700 text-white text-sm hover:bg-green-700"
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
