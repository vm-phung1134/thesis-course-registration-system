import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Spinner } from "@/components/Atoms";
import {
  NoSubscribeView,
  UnSubscribeView,
  WaitingView,
} from "@/components/Organisms";
import { useQuery } from "@tanstack/react-query";
import { checkStateSubscribe } from "@/redux/reducer/auth/api";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { useAppDispatch } from "@/redux/store";
import { IMemberObject } from "@/interface/member";
import { INITIATE_AUTH, INITIATE_COURSE } from "@/data";
import { deleteRequirement } from "@/redux/reducer/requirement/api";

function MainboardPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useCurrentUser();
  const dispatch = useAppDispatch();
  const { data } = useQuery<IMemberObject>({
    queryKey: ["subscribe-state", currentUser],
    queryFn: async () => {
      const action = await dispatch(checkStateSubscribe(currentUser));
      return action.payload;
    },
    initialData: {
      classroom: INITIATE_COURSE,
      member: INITIATE_AUTH,
    },
  });

  const handleUnScribeClass = (requirement: IMemberObject) => {
    dispatch(deleteRequirement(requirement));
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <MainboardTemplate title="Mainboard Thesis | Thesis course registration system">
          {data?.status === "NO_SUBSCRIBE" && <NoSubscribeView />}
          {data?.status === "WAITING" && (
            <WaitingView classroom={data?.classroom} />
          )}
          {data?.status === "UN_SUBSCRIBE" && (
            <UnSubscribeView classroom={data?.classroom} />
          )}
        </MainboardTemplate>
      )}
    </>
  );
}

export default MainboardPage;
