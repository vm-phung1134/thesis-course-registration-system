import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Breadcrumb, SnipperRound, Spinner } from "@/components/Atoms";
import { BREADCRUMB_ACCOUNT_STUDENT } from "./mock-data";
import { RegistrationTopicForm } from "@/components/Molecules";
import { PersonalInformation } from "@/components/Organisms";
import { INITIATE_TOPIC } from "@/data";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { getTopic } from "@/redux/reducer/topic/api";
import { ITopicObject } from "@/interface/topic";

function AccountStudentPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useCurrentUser();
  const dispatch = useAppDispatch();
  const { data } = useQuery<ITopicObject>({
    queryKey: ["topic", currentUser],
    queryFn: async () => {
      const action = await dispatch(getTopic(currentUser));
      return action.payload;
    },
    initialData: INITIATE_TOPIC,
  });
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }, []);
  return (
    <>
      <MainboardTemplate title="Account & Registration topics | Thesis course registration system">
        {loading && data ? (
          <SnipperRound />
        ) : (
          <div>
            <Breadcrumb dataBreadcrumb={BREADCRUMB_ACCOUNT_STUDENT} />
            <div className="my-5">
              <div className="grid grid-cols-2 gap-10">
                <div className="shadow-xl p-5">
                  <RegistrationTopicForm topic={data} />
                </div>
                <PersonalInformation />
              </div>
            </div>
          </div>
        )}
      </MainboardTemplate>
    </>
  );
}

export default AccountStudentPage;
