import { Button, FormField, TitleFormField } from "@/components/Atoms";
import { INITIATE_TOPIC } from "@/data";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { ITopicObject } from "@/interface/topic";
import { createTopic } from "@/redux/reducer/topic/api";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { FC } from "react";

export interface IRegistrationTopicFormProps {
  topic: ITopicObject;
}

export const RegistrationTopicForm: FC<IRegistrationTopicFormProps> = ({
  topic,
}) => {
  const { currentUser } = useCurrentUser();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const createMutation = useMutation(
    (postData: ITopicObject) => {
      return new Promise((resolve, reject) => {
        dispatch(createTopic(postData))
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
        queryClient.invalidateQueries(["topic"]);
      },
    }
  );

  return (
    <Formik
      initialValues={topic ?? INITIATE_TOPIC}
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
        // Member quantity
        if (!values.memberQuantiy) {
          errors.memberQuantiy = "! Quantity is required";
        } else if (values.memberQuantiy > 3) {
          errors.memberQuantiy = "! Quantity not exceed than 3 members";
        }
        // Type topic
        if (!values.typeTopic) {
          errors.typeTopic = "! Type topic is required";
        } else if (values.typeTopic.length > 20) {
          errors.typeTopic = "! Type topic less than 50 characters";
        }
        // Email member
        if (!values.memberEmail) {
          errors.memberEmail = "! Email member is required";
        } else if (!emailRegex.test(values.memberEmail)) {
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
          createMutation.mutate({ ...values, student: currentUser });
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <Form>
            <TitleFormField
              className="text-base uppercase text-green-700 font-medium mb-5"
              title="Registration of research topics"
            />
            <FormField
              placeholder="Ex: Build a website..."
              type="text"
              label="Name of research topic"
              nameField="title"
              value={values?.title}
            />
            <div className="flex justify-between w-full gap-3">
              <FormField
                placeholder="Ex: Website, Mobile, AI..."
                type="text"
                label="Type of topic"
                nameField="typeTopic"
                value={values?.typeTopic}
              />
              <FormField
                placeholder="Ex: 2"
                type="number"
                label="Number of team member"
                nameField="memberQuantiy"
                value={values?.memberQuantiy}
              />
            </div>
            <FormField
              placeholder="Ex: nameb1910xxx@student.ctu.edu.vn"
              type="text"
              label="Email member"
              nameField="memberEmail"
              value={values?.memberEmail}
            />
            <FormField
              type="text"
              label="Description"
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
                className="hover:bg-[#165b31] bg-green-700 text-white px-5"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
