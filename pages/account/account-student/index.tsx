import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Breadcrumb, Spinner } from "@/components/Atoms";
import { BREADCRUMB_ACCOUNT_STUDENT } from "./mock-data";
import { RegistrationTopicForm } from "@/components/Molecules";
import { PersonalInformation } from "@/components/Organisms";

function AccountStudentPage() {
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
          <Breadcrumb dataBreadcrumb={BREADCRUMB_ACCOUNT_STUDENT} />
          <div className="my-5">
            <div className="grid grid-cols-2 gap-10">
              <div className="shadow-xl p-5">
                <RegistrationTopicForm />
              </div>
              <PersonalInformation />
            </div>
          </div>
        </MainboardTemplate>
      )}
    </>
  );
}

export default AccountStudentPage;
