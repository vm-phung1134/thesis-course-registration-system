import React, { FC, useEffect, useRef, useState } from "react";
import { Form, Formik } from "formik";
import { Button } from "@/components/Atoms";
import { INITIATE_SUBMIT } from "@/data";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { IUploadReportObject } from "@/interface/upload";
import {
  createUploadReport,
  deleteUploadReport,
} from "@/redux/reducer/upload-def/api";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import classNames from "classnames";
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";
import { ModalConfirm } from "..";

interface IUploadFinalFileFormProps {
  uploadReport?: IUploadReportObject;
}

export const UploadFinalFileForm: FC<IUploadFinalFileFormProps> = ({
  uploadReport,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { currentUser } = useCurrentUserContext();
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
  const [openDelFile, setOpenDelFile] = useState<boolean>(false);
  const modalClassDelFile = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openDelFile,
  });
  const addMutation = useMutationQueryAPI({
    action: createUploadReport,
    queryKeyLog: ["get-one-upload"],
    successMsg: "Upload final file successfully!",
    errorMsg: "Fail to upload final file!",
  });
  const deleteMutation = useMutationQueryAPI({
    action: deleteUploadReport,
    queryKeyLog: ["get-one-upload"],
    successMsg: "Unsend Final File successfully!",
    errorMsg: "Fail to unsend Final File!",
  });
  const handleDelFinalFile = () => {
    deleteMutation.mutate(uploadReport?.id);
  };
  return (
    <Formik
      initialValues={INITIATE_SUBMIT}
      validate={(values) => {
        let errors: any = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        let objectId = uuidv4();
        setTimeout(() => {
          addMutation.mutate({
            student: currentUser,
            attachments: selectedFiles,
            uid: objectId,
            status: "submitted",
          });
        }, 400);
      }}
    >
      {({ setFieldValue }) => (
        <>
          <Form>
            <div className="w-full border-gray-400 h-fit border rounded-xl border-dashed py-5 mb-5 relative">
              <div className="flex gap-3 flex-col h-full w-full items-center justify-center px-5">
                {uploadReport?.status ? (
                  // GET FILE HAS BEEN SUBMITED
                  <div className="w-full">
                    <ul className="text-sm w-full flex flex-col gap-2 mb-10 font-medium px-2">
                      {uploadReport?.attachments?.map((file) => (
                        <div
                          key={file.id}
                          className="flex gap-3 text-blue-700 font-medium rounded-md items-center px-3 py-2 bg-slate-200 shadow-md"
                        >
                          <Image
                            width={20}
                            height={20}
                            src={
                              "https://cdn-icons-png.flaticon.com/128/4725/4725970.png"
                            }
                            alt="icon-file-pdf"
                          />
                          <a
                            className="text-[13px] truncate"
                            target="_blank"
                            href={file.src}
                          >
                            {file.name}
                          </a>
                        </div>
                      ))}
                    </ul>
                  </div>
                ) : // UPLOAD FORM
                selectedFiles.length > 0 ? (
                  <ul className="text-sm w-full flex flex-col gap-2 mb-5 font-medium px-2">
                    {selectedFiles.map((file) => (
                      <li
                        className="flex gap-3 text-blue-700 font-medium rounded-md items-center px-3 py-2 bg-slate-200 shadow-md"
                        key={file.name}
                      >
                        <Image
                          width={20}
                          height={20}
                          src={
                            "https://cdn-icons-png.flaticon.com/128/4725/4725970.png"
                          }
                          alt="icon-file-pdf"
                        />
                        <p className="truncate">{file.name}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p
                    className="text-sm flex gap-5 items-center font-thin cursor-pointer"
                    onClick={handleUploadClick}
                  >
                    <Image
                      width={40}
                      height={40}
                      src={
                        "https://cdn-icons-png.flaticon.com/128/179/179378.png"
                      }
                      alt="upload-file-icon"
                    />
                    <span className="font-medium text-gray-500">
                      Upload your files
                    </span>
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
                <div className="w-full flex justify-end cursor-pointer">
                  {selectedFiles.length > 0 && (
                    <button
                      className="text-sm px-5 py-2 rounded-lg flex gap-3 "
                      onClick={handleUploadClick}
                    >
                      <Image
                        width={20}
                        height={20}
                        src={
                          "https://cdn-icons-png.flaticon.com/128/4903/4903802.png"
                        }
                        alt=""
                      />
                      <p className="font-medium tracking-wider">Add new file</p>
                    </button>
                  )}
                </div>
              </div>
            </div>
            {uploadReport?.status ? (
              <Button
                type="button"
                className="rounded-lg hover:bg-green-600 w-full bg-green-700 text-white"
                title="Cancel"
              />
            ) : (
              <Button
                type="submit"
                className="rounded-lg hover:bg-green-600 w-fitfull bg-green-700 text-white"
                title="Submit to council"
              />
            )}
          </Form>
          <ModalConfirm
            modalClass={modalClassDelFile}
            setOpenModal={setOpenDelFile}
            openModal={openDelFile}
            action={handleDelFinalFile}
            typeButton="subscribe"
            underMessage="No Message"
            title="Message!!!"
            message="Are you sure to unsend the final file to the council?"
          />
        </>
      )}
    </Formik>
  );
};
