import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Breadcrumb, Spinner } from "@/components/Atoms";
import {
  NoSubscribeView,
  UnSubscribeView,
  WaitingView,
} from "@/components/Organisms";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { useClassroomStateContext } from "@/contexts/classroomState";
import { useSubscribeStateContext } from "@/contexts/subscribeState";
import { IMemberObject } from "@/interface/member";
import { STATE_AUTH_CLASSROOM } from "@/data";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { BREADCRUMB_MAINBOARD } from "@/components/Organisms/MainboardStatus/mock-data";

type MenuItem = {
  id: number;
  label: string;
};
const menuItems: MenuItem[] = [
  { id: 1, label: "Class Registration" },
  { id: 2, label: "Waiting" },
];

function MainboardPage() {
  const { currentUser } = useCurrentUserContext();
  const { subscribeState } = useSubscribeStateContext();
  const { authClassroomState } = useClassroomStateContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem>(menuItems[0]);
  const checkIsField = (state_1: string, state_2: string) => {
    if (subscribeState.status === state_1) {
      return true;
    } else if (subscribeState.status === state_2) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  const handleClick = (item: MenuItem) => {
    setSelectedItem(item);
  };
  const renderStudentView = () => {
    if (authClassroomState && authClassroomState?.classCourse !== "") {
      return <UnSubscribeView classroom={authClassroomState} />;
    } else {
      switch (selectedItem?.id) {
        case 1:
          return <NoSubscribeView />;
        case 2:
          return <WaitingView />;
        default:
          return null;
      }
    }
  };

  const renderMenuItems = () => {
    return (
      <ul className="flex gap-3 my-2 border-b text-[15px] cursor-pointer">
        {menuItems?.map((item) => (
          <li
            key={item.id}
            className={`px-3 py-2 tracking-wider ${
              selectedItem?.id === item?.id ? "border-green-700 border-b-2" : ""
            }`}
            onClick={() => handleClick(item)}
          >
            {item?.label}
          </li>
        ))}
      </ul>
    );
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <MainboardTemplate title="Mainboard Thesis | Thesis course registration system">
          {checkIsField(
            STATE_AUTH_CLASSROOM.WAITING,
            STATE_AUTH_CLASSROOM.NO_SUB
          ) && (
            <>
              <Breadcrumb dataBreadcrumb={BREADCRUMB_MAINBOARD} />
              <div className="py-2 my-3 flex gap-2 items-center">
                <h4 className="text-xl capitalize text-green-700 font-medium ">
                  Register{" "}
                  <span className="text-green-700"> for instructors</span>
                </h4>
                <div className="flex-grow h-[0.5px] bg-green-700"></div>
              </div>
            </>
          )}
          {currentUser?.role === ROLE_ASSIGNMENT.STUDENT &&
            checkIsField(
              STATE_AUTH_CLASSROOM.WAITING,
              STATE_AUTH_CLASSROOM.NO_SUB
            ) &&
            renderMenuItems()}

          {/* GET UI FOR LECTURER ROLE */}
          {currentUser?.role === ROLE_ASSIGNMENT.LECTURER && (
            <NoSubscribeView />
          )}
          {/* GET UI FOR STUDENT ROLE */}
          {currentUser?.role === ROLE_ASSIGNMENT.STUDENT && renderStudentView()}
        </MainboardTemplate>
      )}
    </>
  );
}

export default MainboardPage;
