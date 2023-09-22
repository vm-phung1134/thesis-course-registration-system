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

function MainboardPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useCurrentUser();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useQuery<string>({
    queryKey: ["blog-detail"],
    queryFn: async () => {
      const action = await dispatch(checkStateSubscribe(user));
      return action.payload.status;
    },
  });

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
          {data === "NO_SUBSCRIBE" && <NoSubscribeView />}
          {data === "WAITING" && <WaitingView />}
          {data === "UN_SUBSCRIBE" && <UnSubscribeView />}
        </MainboardTemplate>
      )}
    </>
  );
}

export default MainboardPage;
