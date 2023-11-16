import { FC } from "react";
import { Field, Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux/store";
import { INITIATE_PRIVATE_COMMENT_ITEM } from "@/data";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { createPrivateComment } from "@/redux/reducer/private-comment/api";
import { IPrivateComment } from "@/interface/privateComment";
import { v4 as uuidv4 } from "uuid";
import { useClassroomStateContext } from "@/contexts/classroomState";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";

export interface IPrivateCommentFormProps {
  userId?: string;
}

export const PrivateCommentForm: FC<IPrivateCommentFormProps> = ({
  userId,
}) => {
  const initialValues = INITIATE_PRIVATE_COMMENT_ITEM;
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { authClassroomState } = useClassroomStateContext();
  const { currentUser } = useCurrentUserContext();
  const addMutation = useMutation(
    (postData: IPrivateComment) => {
      return new Promise((resolve, reject) => {
        console.log(postData);
        dispatch(createPrivateComment(postData))
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
        queryClient.invalidateQueries(["private-comments"]);
        queryClient.invalidateQueries(["private-lecturer-comments"]);
      },
    }
  );
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          const objectId = uuidv4();
          {
            currentUser.role === ROLE_ASSIGNMENT.STUDENT &&
              addMutation.mutate({
                userId: currentUser.id,
                lecturerId: authClassroomState?.lecturer.id || "",
                comments: [
                  {
                    id: objectId,
                    user: currentUser,
                    content: values.content,
                  },
                ],
              });
          }
          {
            currentUser.role === ROLE_ASSIGNMENT.LECTURER &&
              addMutation.mutate({
                userId: userId || "",
                lecturerId: currentUser.id,
                comments: [
                  {
                    id: objectId,
                    user: currentUser,
                    content: values.content,
                  },
                ],
              });
          }

          resetForm();
        }, 400);
      }}
    >
      <Form>
        {addMutation.isLoading && (
          <p className="text-xs font-medium mb-1 text-green-700 flex items-center gap-2">
            <span>Sending</span>
            <span className="loading loading-dots loading-xs"></span>
          </p>
        )}
        <div className="relative">
          <Field
            className="input text-sm border-none bg-slate-200 rounded-l-full w-[82%] focus:outline-none"
            type="text"
            id="content"
            placeholder="Enter your comment ..."
            name="content"
          />
          <button
            type="submit"
            className="absolute text-green-700 w-20 bg-slate-200 border-none text-base rounded-r-full font-medium normal-case btn right-0 top-0 bottom-0"
          >
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </Form>
    </Formik>
  );
};
