import {
  Button,
  FormField,
  SelectMulti,
  SnipperRound,
  TitleFormField,
} from "@/components/Atoms";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import { useRouter } from "next/router";
import { SELECT_MULTI_TOPIC_KEY } from "@/components/Atoms/SelectMulti/mock-data";
import { IClassroomObject, ITopicKeyObject } from "@/interface/classroom";
import { createClassroom } from "@/redux/reducer/classroom/api";
import { useAppDispatch } from "@/redux/store";
import { useMutation } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";

export interface ICreateClassroomFormProps {
  switchingForm: number;
  setSwitchingForm: React.Dispatch<React.SetStateAction<number>>;
}

export const CreateClassroomForm: FC<ICreateClassroomFormProps> = ({
  setSwitchingForm,
  switchingForm,
}) => {
  const router = useRouter();
  const [selected, setSelected] = useState<ITopicKeyObject[]>([
    SELECT_MULTI_TOPIC_KEY[0],
    SELECT_MULTI_TOPIC_KEY[1],
  ]);
  const { currentUser } = useCurrentUser();
  const dispatch = useAppDispatch();
  const addMutation = useMutation(
    (postData: IClassroomObject) => {
      return new Promise((resolve, reject) => {
        dispatch(createClassroom(postData))
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
        console.log("Create new classroom success");
      },
    }
  );
  const initialValues: IClassroomObject = {
    title: "",
    lecturer: currentUser,
    codeCourse: "",
    quantity: 0,
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        let errors: any = {};
        if (!values.title) {
          errors.title = "! Title classroom is required";
        } else if (values.title.length > 30) {
          errors.title = "! Title less than 30 characters";
        }
        if (!values.codeCourse) {
          errors.codeCourse = "! Code is required";
        } else if (values.codeCourse.length > 30) {
          errors.codeCourse = "! CodeCourse less than 30 characters";
        }
        if (!values.quantity) {
          errors.quantity = "! Quantity is required";
        } else if (values.quantity > 30) {
          errors.quantity = "! Quantity less than 15 members";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          await addMutation.mutate({ topicTags: selected, ...values });
          setSubmitting(false);
          console.log({ topicTags: selected, ...values });
          router.push("/manage-classroom");
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <>
            {addMutation.isLoading ? (
              <SnipperRound />
            ) : (
              <div>
                <h3 className="text-xs mb-3">Step {switchingForm} of 2</h3>
                <Form>
                  <TitleFormField
                    className="text-base uppercase text-green-700 font-medium mb-5"
                    title="Create your classroom"
                  />
                  <FormField
                    placeholder="Ex: Le Huynh Quoc Bao"
                    type="text"
                    label="Title class"
                    nameField="title"
                    value={values.title}
                  />
                  <div className="flex gap-3">
                    <FormField
                      type="number"
                      label="Quantity members"
                      nameField="quantity"
                      value={values.quantity}
                    />
                    <FormField
                      placeholder="Ex: jhkldop"
                      type="text"
                      label="Code classroom"
                      nameField="codeCourse"
                      value={values.codeCourse}
                    />
                  </div>
                  <div className="mb-4">
                    <SelectMulti
                      setSelected={setSelected}
                      selected={selected}
                      options={SELECT_MULTI_TOPIC_KEY}
                    />
                  </div>
                  {/* <CheckBoxField
                    title="I accept the Terms and Conditions"
                    nameField="checkedTerm"
                  />
                  <CheckBoxField
                    title="I accept the Private policy"
                    nameField="checkedPolicy"
                  /> */}
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
                      className="hover:bg-[#165b31] normal-case w-28 bg-green-700 text-white px-5"
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
