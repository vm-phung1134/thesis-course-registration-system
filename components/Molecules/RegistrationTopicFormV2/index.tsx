import {
  Button,
  CountInput,
  FormField,
  SnipperRound,
} from "@/components/Atoms";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { INITIATE_TOPIC } from "@/data";
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";
import { ITopicObject } from "@/interface/topic";
import { getTopic, updateTopic } from "@/redux/reducer/topic/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";

export interface IRegistrationTopicFormV2Props {
  switchingForm: number;
  setSwitchingForm: React.Dispatch<React.SetStateAction<number>>;
}

export const RegistrationTopicFormV2: FC<IRegistrationTopicFormV2Props> = ({
  setSwitchingForm,
  switchingForm,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useCurrentUserContext();
  const dispatch = useAppDispatch();
  const { data: topic } = useQuery<ITopicObject>({
    queryKey: ["get-one-topic", currentUser],
    queryFn: async () => {
      const action = await dispatch(getTopic(currentUser));
      return action.payload || INITIATE_TOPIC;
    },
    initialData: INITIATE_TOPIC,
  });
  const updateMutation = useMutationQueryAPI({
    action: updateTopic,
    queryKeyLog: ["register-topic"],
    // successMsg: "Update topic successfully!",
    // errorMsg: "Fail to update topic!",
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <Formik
      initialValues={topic}
      enableReinitialize
      validate={(values) => {
        let errors: any = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        // Title
        if (!values.title) {
          errors.title = "! Title topic is required";
        } else if (values.title.length > 100) {
          errors.title = "! Title less than 100 characters";
        }
        // Type topic
        if (!values.typeTopic) {
          errors.typeTopic = "! Type topic is required";
        } else if (values.typeTopic.length > 20) {
          errors.typeTopic = "! Type topic less than 50 characters";
        }
        // Email member
        if (!emailRegex.test(values.memberEmail)) {
          errors.email = "! Email invalid";
        }
        // Discription
        if (!values.description) {
          errors.description = "! Discription is required";
        } else if (values.description.length > 500) {
          errors.description = "! Discription less than 500 characters";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          updateMutation.mutate({
            id: values.id,
            title: values.title,
            typeTopic: values.typeTopic,
            studentID: currentUser.id,
            memberQuantity: values.memberQuantity,
            memberEmail: values.memberEmail,
            description: values.description,
          });
          setSwitchingForm(switchingForm + 1);
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => {
        const { values, setFieldValue } = formik;
        const handleChangeQuantityMember = (newValue: number) => {
          setFieldValue("memberQuantiy", newValue);
        };
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
                  <h4 className="text-xl font-bold mb-5">
                    Registration of research topics
                  </h4>
                  <FormField
                    placeholder="Ex: Build a website..."
                    type="text"
                    className="rounded-xl bg-slate-100 border-none"
                    label="Name of research topic"
                    nameField="title"
                    value={values?.title}
                  />
                  <div className="flex justify-between w-full gap-3">
                    <FormField
                      placeholder="Ex: Website, Mobile, AI..."
                      type="text"
                      label="Type of topic"
                      className="rounded-xl bg-slate-100 border-none"
                      nameField="typeTopic"
                      value={values?.typeTopic}
                    />
                    <div>
                      <CountInput
                        valueNumber={values.memberQuantity}
                        className="h-12"
                        onChange={handleChangeQuantityMember}
                        label="QL. Member"
                        limit={5}
                      />
                    </div>
                  </div>
                  {values.memberQuantity > 0 && (
                    <FormField
                      placeholder="Ex: nameb1910xxx@student.ctu.edu.vn"
                      type="text"
                      label="Email member"
                      className="rounded-xl bg-slate-100 border-none"
                      nameField="memberEmail"
                      value={values?.memberEmail}
                    />
                  )}

                  <FormField
                    type="text"
                    label="Description"
                    className="rounded-xl bg-slate-100 border-none"
                    nameField="description"
                    value={values?.description}
                  />
                  <div className="flex justify-end items-center">
                    <button
                      onClick={() => setSwitchingForm(switchingForm - 1)}
                      type="button"
                      className="bg-transparent btn rounded-none normal-case font-normal border-none hover:border-none hover:bg-transparent"
                    >
                      Back
                    </button>
                    <Button
                      type="submit"
                      title="Next step"
                      className="hover:bg-[#165b31] rounded-xl bg-green-700 text-white px-8"
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
