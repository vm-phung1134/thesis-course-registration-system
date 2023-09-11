import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Breadcrumb, Spinner } from "@/components/Atoms";
import { RegistrationTopicForm } from "@/components/Molecules";
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
              <div className="py-5">
                <h4 className="uppercase font-medium text-green-700 text-lg">Manage Courses</h4>
              </div>
              <PersonalInformation />
            </div>
          </div>
        </MainboardTemplate>
      )}
    </>
  );
}

export default AccountLecturerPage;
