import React, { useRef, useState } from "react";
import { Form, Formik } from "formik";
import { Button } from "@/components/Atoms";

export const UploadFileForm: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  return (
    <Formik
      initialValues={{ files: [] }}
      validate={(values) => {
        let errors: any = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // Handle api
          console.log(selectedFiles);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ setFieldValue }) => (
        <Form>
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
                  <span>Choose your files</span>
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
                    className="text-sm font-thin border border-gray-400 w-full py-1 px-5"
                    onClick={handleUploadClick}
                  >
                    + Add another file
                  </button>
                )}
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="rounded-none hover:bg-green-600 w-full my-5 bg-green-700 text-white"
            title="Submit your report"
          />
        </Form>
      )}
    </Formik>
  );
};
