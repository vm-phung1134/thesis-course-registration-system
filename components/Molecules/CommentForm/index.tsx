import { FC } from "react";
import { Field, Form, Formik } from "formik";
import { ICommentObject } from "@/interface/comment";
import { IPostObject } from "@/interface/post";
import { IExerciseObject } from "@/interface/exercise";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/redux/reducer/comment/api";
import { useAppDispatch } from "@/redux/store";
import { INITIATE_COMMENT, TYPE_ACTION_NOTIFICATION } from "@/data";
import { IAuthObject } from "@/interface/auth";
import { useSocket } from "@/contexts/useSocketContext";

export interface ICommentFormProps {
  task: IPostObject | IExerciseObject;
}

export const CommentForm: FC<ICommentFormProps> = ({ task }) => {
  const initialValues = INITIATE_COMMENT;
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();
  const addMutation = useMutation(
    (postData: ICommentObject) => {
      return new Promise((resolve, reject) => {
        dispatch(createComment(postData))
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
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );
  const handleNotification = (receiver: IAuthObject, type: string) => {
    if (socket) {
      socket?.emit("sendNotification", {
        senderUser: currentUser,
        receiverAuthor: { ...receiver, socketId: socket.id },
        type,
      });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          addMutation.mutate({
            ...values,
            postId: task.id || "",
            user: currentUser,
          });
          handleNotification(currentUser, TYPE_ACTION_NOTIFICATION.COMMENT_POST);
          resetForm();
        }, 400);
      }}
    >
      <Form>
        <div className="relative">
          <Field
            className="input text-sm rounded-full w-full border-gray-300  focus:outline-none"
            type="text"
            id="content"
            placeholder="Enter your comment ..."
            name="content"
          />
          <button
            type="submit"
            className="absolute text-black w-28 text-[13px] rounded-full font-medium normal-case btn right-0 top-0 bottom-0"
          >
            Send
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </Form>
    </Formik>
  );
};
