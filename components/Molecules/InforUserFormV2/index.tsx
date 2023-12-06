import {
  Button,
  FormField,
  SnipperRound,
  TitleFormField,
} from "@/components/Atoms";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";
import { updateAuth } from "@/redux/reducer/auth/api";
import { Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";

export interface IInforUserFormV2Props {
  switchingForm: number;
  setSwitchingForm: React.Dispatch<React.SetStateAction<number>>;
}

export const InforUserFormV2: FC<IInforUserFormV2Props> = ({
  setSwitchingForm,
  switchingForm,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useCurrentUserContext();
  const updateMutation = useMutationQueryAPI({
    action: updateAuth,
    queryKeyLog: ["get-one-auth"],
    // successMsg: "Your information has been updated!!!",
    // errorMsg: "Fail to update your information!!!",
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <Formik
      initialValues={currentUser}
      validate={(values) => {
        let errors: any = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const phoneNumberRegex = /^0\d{9,10}$/;
        // name
        if (!values.name) {
          errors.name = "! Name is required";
        } else if (values.name.length > 100) {
          errors.name = "! Name less than 100 characters";
        }
        // email
        if (!values.email) {
          errors.email = "! Email is required";
        } else if (!emailRegex.test(values.email)) {
          errors.email = "! Email invalid";
        } else if (values.email.length > 100) {
          errors.email = "! Email less than 100 characters";
        }
        // phone
        if (!values.phone) {
          errors.phone = "! Phone number is required";
        } else if (!phoneNumberRegex.test(values.phone)) {
          errors.phone = "! Phone number invalid";
        }
        // major
        if (!values.major) {
          errors.major = "! Major number is required";
        }
        return errors;
      }}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          updateMutation.mutate(values);
          setSwitchingForm(switchingForm + 1);
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <>
            {loading ? (
              <div className="h-[30rem]">
                <SnipperRound />
              </div>
            ) : (
              <div>
                <h3 className="text-xs font-medium mb-3">
                  Step {switchingForm} of 3
                </h3>
                <Form>
                  <TitleFormField
                    className="text-xl font-bold mb-5"
                    title="Update personal information"
                  />
                  <FormField
                    placeholder="Ex: Nguyen Van Anh"
                    type="text"
                    label="Full name"
                    className="rounded-xl bg-slate-100 border-none"
                    nameField="name"
                    value={values?.name}
                  />
                  <FormField
                    type="text"
                    placeholder="Ex: nvan@ctu.edu.vn"
                    label="Email address"
                    className="rounded-xl bg-slate-100 border-none"
                    nameField="email"
                    value={values?.email}
                  />
                  <div className="flex gap-5 w-full">
                    <FormField
                      placeholder="Ex: 0953252xxx"
                      type="text"
                      label="Phone number"
                      nameField="phone"
                      className="rounded-xl bg-slate-100 border-none"
                      value={values?.phone || ""}
                    />
                    <FormField
                      placeholder="Ex: IT colleage"
                      type="text"
                      label="School"
                      className="rounded-xl bg-slate-100 border-none"
                      nameField="class"
                      value={values?.class || ""}
                    />
                  </div>
                  <FormField
                    placeholder="Ex: Network computer"
                    type="text"
                    label="Major"
                    nameField="major"
                    className="rounded-xl bg-slate-100 border-none"
                    value={values?.major || ""}
                  />
                  <div className="flex justify-end items-center">
                    <Button
                      type="submit"
                      title="Next step"
                      className="hover:bg-[#165b31] btn rounded-lg font-normal normal-case w-28 bg-green-700 text-white px-5"
                    />
                  </div>
                </Form>
              </div>
            )}
          </>
        );
      }}
    </Formik>
  );
};
