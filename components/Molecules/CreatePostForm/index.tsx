import {
  Button,
  FormField,
  SelectBox,
  SelectInForm,
  TitleFormField,
} from "@/components/Atoms";
import { useSubscribeStateContext } from "@/contexts/subscribeState";
import { INITIATE_CATEGORY, INITIATE_POST } from "@/data";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { useSelectStage } from "@/hooks/useSelectStage";
import { ICategoryObject } from "@/interface/category";
import { IOptionItem } from "@/interface/filter";
import { IPostObject } from "@/interface/post";
import { createPost } from "@/redux/reducer/post/api";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { FC, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const objectId = uuidv4();
export interface ICreatePostFormProps {
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
  toggleForm: boolean;
  setSelected: React.Dispatch<
    React.SetStateAction<IOptionItem | ICategoryObject>
  >;
  selected: IOptionItem | ICategoryObject;
  options: IOptionItem[] | ICategoryObject[];
}
export const CreatePostForm: FC<ICreatePostFormProps> = ({
  setToggleForm,
  toggleForm,
  selected,
  setSelected,
  options,
}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const initialValues: IPostObject = INITIATE_POST;
  const { currentUser } = useCurrentUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { subscribeState } = useSubscribeStateContext();
  // HANDLE SELECT STAGE REPORT
  const { selectedStage, setSelectedStage, reportStages } = useSelectStage();
  // HANDLE FILE
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };
  const addMutation = useMutation(
    (postData: IPostObject) => {
      return new Promise((resolve, reject) => {
        dispatch(createPost(postData))
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
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};
        if (!values.title) {
        }
        if (!values.description) {
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          addMutation.mutate({
            ...values,
            type: "post",
            uid: objectId,
            classroom: subscribeState.classroom,
            category: selectedStage,
            attachments: selectedFiles,
            lecturer: currentUser,
          });
          resetForm();
          setSelectedFiles([]);
          setSelectedStage(INITIATE_CATEGORY);
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <Form>
            <div className="flex justify-between items-center">
              <TitleFormField
                className="font-medium uppercase text-green-700 text-lg mb-5"
                title="Create new post"
              />
              <div className="w-40">
                <SelectBox
                  setSelected={setSelected}
                  selected={selected}
                  options={options}
                />
              </div>
            </div>
            <FormField
              placeholder="Ex: Report progress"
              type="text"
              label="Post title"
              nameField="title"
              value={values?.title}
            />
            <div className="w-full mb-2">
              <SelectInForm
                title="Choose stage"
                options={reportStages}
                selectedStage={selectedStage}
                setSelectedStage={setSelectedStage}
              />
            </div>
            <FormField
              type="text"
              label="Description"
              nameField="description"
              value={values?.description}
            />
            <div className="w-full h-fit border border-dashed py-5 mb-5 relative">
              <div className="flex gap-3 flex-col h-full w-full items-center justify-center">
                {selectedFiles.length > 0 ? (
                  <ul className="text-sm w-full flex flex-col gap-2 mb-10 font-medium px-2">
                    {selectedFiles.map((file) => (
                      <li
                        className="border flex gap-5 items-center px-5 py-1"
                        key={file.name}
                      >
                        <i className="fa-regular fa-file-word"></i>
                        <p className="truncate">{file.name}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p
                    className="text-sm flex gap-5 items-center font-thin cursor-pointer"
                    onClick={handleUploadClick}
                  >
                    <i className="fa-solid fa-upload"></i>
                    <span>Upload additional files</span>
                  </p>
                )}

                <input
                  type="file"
                  name="files"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  hidden
                />
                <div className="w-full absolute bottom-0 cursor-pointer">
                  {selectedFiles.length > 0 && (
                    <button
                      type="button"
                      className="text-sm font-thin border border-gray-400 w-full py-1 px-5"
                      onClick={handleUploadClick}
                    >
                      + Add another file
                    </button>
                  )}
                </div>
              </div>
            </div>
            <small className="text-gray-500">
              Noticed ! File size of your document should not exceed 10MB
            </small>
            <div className="flex justify-end items-center">
              <Button
                setToggle={setToggleForm}
                toggle={toggleForm}
                type="button"
                title="Cancel"
                className="bg-transparent border-none hover:border-none hover:bg-transparent"
              />
              <Button
                type="submit"
                title="Submit"
                className="hover:bg-[#165b31] bg-[#018937] text-white"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
