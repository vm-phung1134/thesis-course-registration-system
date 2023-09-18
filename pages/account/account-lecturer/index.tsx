import { useState } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Breadcrumb, Spinner } from "@/components/Atoms";
import { PersonalInformation } from "@/components/Organisms";
import { BREADCRUMB_ACCOUNT_LECTURER } from "./mock-data";

function AccountLecturerPage() {
  const [loading, setLoading] = useState<boolean>(false);
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 0);
  // }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <MainboardTemplate title="Account & Registration topics | Thesis course registration system">
          <Breadcrumb dataBreadcrumb={BREADCRUMB_ACCOUNT_LECTURER} />
          <div className="my-5">
            <div className="grid grid-cols-2">
              <PersonalInformation />
              <div className="py-5 cursor-pointer">
                <h4 className="uppercase font-medium text-green-700 text-lg mb-5">
                  Manage Courses
                </h4>
                <div className="flex flex-col gap-3">
                  <CardCourseV2 />
                  <CardCourseV2 />
                  <CardCourseV2 />
                </div>
              </div>
            </div>
          </div>
        </MainboardTemplate>
      )}
    </>
  );
}

const CardCourseV2 = () => {
  return (
    <div className="p-5 border text-sm flex justify-between">
      <div className="flex gap-5">
        <p>CT550</p>
        <div>
          <p className="uppercase">Thesis graduation</p>
        </div>
      </div>
      <div className="flex gap-5">
        <p>Update</p>
        <p className="text-red-600">Delete</p>
      </div>
    </div>
  );
};

export default AccountLecturerPage;
