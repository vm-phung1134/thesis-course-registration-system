import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Breadcrumb, Button, Spinner } from "@/components/Atoms";
import {
  NoSubscribeView,
  UnSubscribeView,
  WaitingView,
} from "@/components/Organisms";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { BREADCRUMB_MAINBOARD } from "@/components/Organisms/MainboardStatus/mock-data";
import { useClassroomStateContext } from "@/contexts/classroomState";
import { useSubscribeStateContext } from "@/contexts/subscribeState";
import { IMemberObject } from "@/interface/member";
import { STATE_AUTH_CLASSROOM } from "@/data";

function MainboardPage() {
  type MenuItem = {
    id: number;
    label: string;
  };
  const menuItems: MenuItem[] = [
    { id: 1, label: "Class Registration" },
    { id: 2, label: "Waiting" },
  ];
  const [selectedItem, setSelectedItem] = useState<MenuItem>(menuItems[0]);
  const handleClick = (item: MenuItem) => {
    setSelectedItem(item);
  };
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useCurrentUser();
  const { subscribeState } = useSubscribeStateContext();
  const { authClassroomState } = useClassroomStateContext();
  const checkIsField = (state_1: string, state_2: string) => {
    if (Array.isArray(subscribeState)) {
      return subscribeState.some(
        (obj: IMemberObject) => obj.status === state_1
      );
    } else if (!Array.isArray(subscribeState)) {
      if (subscribeState.status === state_2) {
        return true;
      }
      return false;
    }
    return false;
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <MainboardTemplate title="Mainboard Thesis | Thesis course registration system">
          <Breadcrumb dataBreadcrumb={BREADCRUMB_MAINBOARD} />
          {currentUser?.role === ROLE_ASSIGNMENT.STUDENT &&
            checkIsField(
              STATE_AUTH_CLASSROOM.WAITING,
              STATE_AUTH_CLASSROOM.NO_SUB
            ) && (
              <ul className="flex gap-3 my-2 border-b text-[15px] cursor-pointer">
                {menuItems?.map((item) => (
                  <li
                    key={item.id}
                    className={`px-3 py-2 tracking-wider ${
                      selectedItem?.id === item?.id
                        ? "border-green-700 border-b-2"
                        : ""
                    }`}
                    onClick={() => handleClick(item)}
                  >
                    {item?.label}
                  </li>
                ))}
              </ul>
            )}
          {/* GET UI FOR LECTURER ROLE */}
          {(currentUser?.role === ROLE_ASSIGNMENT.LECTURER ||
            currentUser?.role === ROLE_ASSIGNMENT.GUEST) && <NoSubscribeView />}
          {/* GET UI FOR STUDENT ROLE */}
          {currentUser?.role === ROLE_ASSIGNMENT.STUDENT && (
            <>
              {authClassroomState?.classCourse !== "" ? (
                <UnSubscribeView classroom={authClassroomState} />
              ) : (
                <>
                  {selectedItem?.id === 1 && <NoSubscribeView />}

                  {selectedItem?.id === 2 && <WaitingView />}
                </>
              )}
            </>
          )}
        </MainboardTemplate>
      )}
    </>
  );
}

export default MainboardPage;
