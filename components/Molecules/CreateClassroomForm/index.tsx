import {
  Button,
  CheckBoxField,
  FormField,
  SelectMulti,
  SnipperRound,
  TitleFormField,
} from "@/components/Atoms";
import { Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { INITIATE_COURSE } from "@/data";
import { SELECT_MULTI_TOPIC_KEY } from "@/components/Atoms/SelectMulti/mock-data";
import { ITopicKeyObject } from "@/interface/course";

export interface ICreateClassroomFormProps {
  switchingForm: number;
  setSwitchingForm: React.Dispatch<React.SetStateAction<number>>;
}

export const CreateClassroomForm: FC<ICreateClassroomFormProps> = ({
  setSwitchingForm,
  switchingForm,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<ITopicKeyObject[]>([
    SELECT_MULTI_TOPIC_KEY[0],
    SELECT_MULTI_TOPIC_KEY[1],
  ]);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    const timeOutLoading = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeOutLoading);
  }, []);
  return (
    <Formik
      initialValues={INITIATE_COURSE}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log({ topicTags: selected, ...INITIATE_COURSE });
          setSubmitting(false);
        }, 400);

        //router.push("/manage-classroom");
      }}
    >
      <>
        {loading ? (
          <SnipperRound />
        ) : (
          <>
            {" "}
            <h3 className="text-xs mb-3">Step {switchingForm} of 2</h3>
            <Form>
              <TitleFormField
                className="text-base uppercase text-green-700 font-medium mb-5"
                title="Create your classroom"
              />
              <FormField
                placeholder="Ex: Le Huynh Quoc Bao"
                type="text"
                label="Name class"
                nameField="name"
              />
              <div className="flex gap-3">
                <FormField
                  type="number"
                  label="Quantity members"
                  nameField="quantity"
                />
                <FormField
                  placeholder="Ex: jhkldop"
                  type="text"
                  label="Code classroom"
                  nameField="codeCourse"
                />
              </div>
              <div className="mb-4">
                <SelectMulti
                  setSelected={setSelected}
                  selected={selected}
                  options={SELECT_MULTI_TOPIC_KEY}
                />
              </div>
              <CheckBoxField
                title="I accept the Terms and Conditions"
                nameField="checkedTerm"
              />
              <CheckBoxField
                title="I accept the Private policy"
                nameField="checkedPolicy"
              />
              <div className="flex justify-end items-center">
                {switchingForm > 1 && (
                  <button
                    onClick={() => setSwitchingForm(switchingForm - 1)}
                    type="button"
                    className="bg-transparent btn rounded-none normal-case font-normal border-none hover:border-none hover:bg-transparent"
                  >
                    Back
                  </button>
                )}
                <Button
                  type="submit"
                  title="Next step"
                  className="hover:bg-[#165b31] normal-case w-28 bg-[#018937] text-white px-5"
                />
              </div>
            </Form>
          </>
        )}
      </>
    </Formik>
  );
};
