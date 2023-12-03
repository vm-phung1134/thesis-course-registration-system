import { Button, CountInput, FormField } from "@/components/Atoms";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { useLanguageContext } from "@/contexts/languageContext";
import { INITIATE_TOPIC } from "@/data";
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";
import { ITopicObject } from "@/interface/topic";
import { createTopic, updateTopic } from "@/redux/reducer/topic/api";
import { Form, Formik } from "formik";
import { FC } from "react";

export interface IRegistrationTopicFormProps {
  topic: ITopicObject;
}

export const RegistrationTopicForm: FC<IRegistrationTopicFormProps> = ({
  topic,
}) => {
  const { t } = useLanguageContext();
  const { currentUser } = useCurrentUserContext();
  const updateMutation = useMutationQueryAPI({
    action: updateTopic,
    queryKeyLog: ["register-topic"],
    successMsg: "Update topic successfully!",
    errorMsg: "Fail to update topic!",
  });
  const addMutation = useMutationQueryAPI({
    action: createTopic,
    queryKeyLog: ["register-topic"],
    successMsg: "Update topic successfully!",
    errorMsg: "Fail to update topic!",
  });
  return (
    <Formik
      initialValues={topic || INITIATE_TOPIC}
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
          !topic.id
            ? addMutation.mutate({
                title: values.title,
                typeTopic: values.typeTopic,
                studentID: currentUser.id,
                memberQuantity: values.memberQuantity,
                memberEmail: values.memberEmail,
                description: values.description,
              })
            : updateMutation.mutate({
                id: values.id,
                title: values.title,
                typeTopic: values.typeTopic,
                studentID: currentUser.id,
                memberQuantity: values.memberQuantity,
                memberEmail: values.memberEmail,
                description: values.description,
              });
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
            <Form>
              <h4 className="text-xl font-bold mb-5">{t.acc_register_item1}</h4>
              <FormField
                placeholder="Ex: Build a website..."
                type="text"
                className="rounded-xl bg-slate-100 border-none"
                label={t.acc_register_item2}
                nameField="title"
                value={values?.title}
              />
              <div className="flex justify-between w-full gap-3">
                <FormField
                  placeholder="Ex: Website, Mobile, AI..."
                  type="text"
                  label={t.acc_register_item3}
                  className="rounded-xl bg-slate-100 border-none"
                  nameField="typeTopic"
                  value={values?.typeTopic}
                />
                <div>
                  <CountInput
                    valueNumber={values.memberQuantity}
                    className="h-12"
                    onChange={handleChangeQuantityMember}
                    label={t.acc_register_item4}
                    limit={5}
                  />
                </div>
              </div>
              {values.memberQuantity > 0 && (
                <FormField
                  placeholder="Ex: nameb1910xxx@student.ctu.edu.vn"
                  type="text"
                  label={t.acc_register_item5}
                  className="rounded-xl bg-slate-100 border-none"
                  nameField="memberEmail"
                  value={values?.memberEmail}
                />
              )}

              <FormField
                type="text"
                label={t.acc_register_item6}
                className="rounded-xl bg-slate-100 border-none"
                nameField="description"
                value={values?.description}
              />
              <div className="flex justify-end items-center">
                <Button
                  type="button"
                  title="Cancel"
                  className="bg-transparent border-none hover:border-none hover:bg-transparent"
                />
                <Button
                  type="submit"
                  title="Confirm"
                  className="hover:bg-[#165b31] rounded-xl bg-green-700 text-white px-8"
                />
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};
