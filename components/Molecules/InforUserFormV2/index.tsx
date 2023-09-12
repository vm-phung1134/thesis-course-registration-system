import { FormField, SnipperRound, TitleFormField } from "@/components/Atoms";
import { INITIATE_AUTH } from "@/data";
import { Form, Formik } from "formik";
import { FC, useState, useEffect } from "react";

export interface IInforUserFormV2Props {
  switchingForm: number;
  setSwitchingForm: React.Dispatch<React.SetStateAction<number>>;
}

export const InforUserFormV2: FC<IInforUserFormV2Props> = ({
  setSwitchingForm,
  switchingForm,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const timeOutLoading = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeOutLoading);
  }, []);
  return (
    <Formik
      initialValues={INITIATE_AUTH}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values);
          setSwitchingForm(switchingForm + 1);
          setSubmitting(false);
          setLoading(true);
        }, 400);
      }}
    >
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          <h3 className="text-xs mb-3">Step {switchingForm} of 2</h3>
          <Form>
            <TitleFormField
              className="text-base uppercase text-green-700 font-medium mb-5"
              title="Update personal information"
            />
            <FormField
              placeholder="Ex: Nguyen Van Anh"
              type="text"
              label="Full name"
              nameField="name"
            />
            <FormField
              type="text"
              placeholder="Ex: nvan@ctu.edu.vn"
              label="Email address"
              nameField="email"
            />
            <div className="flex gap-5 w-full">
              <FormField
                placeholder="Ex: 0953252xxx"
                type="text"
                label="Phone number"
                nameField="phone"
              />
              <FormField
                placeholder="Ex: IT colleage"
                type="text"
                label="School"
                nameField="School"
              />
            </div>
            <FormField
              placeholder="Ex: Network computer"
              type="text"
              label="Major"
              nameField="major"
            />
            <div className="flex justify-end items-center">
              <button
                type="submit"
                className="hover:bg-[#165b31] btn rounded-none font-normal normal-case w-28 bg-[#018937] text-white px-5"
              >
                Next step
              </button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};
