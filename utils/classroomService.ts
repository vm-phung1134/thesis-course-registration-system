export const handleChooseClassroom = (authClassroomState: any) => {
  if (authClassroomState?.classroom) {
    return authClassroomState?.classroom;
  } else {
    return authClassroomState;
  }
};
export const checkClassroomState = (authClassroomState: any) => {
  if (authClassroomState?.classroom?.status || authClassroomState?.status) {
    return true;
  }
};

export const getStatusCurrentUser = (authClassroomState: any) => {
  if (authClassroomState?.classroom?.status) {
    return authClassroomState?.classroom?.status;
  } else {
    return authClassroomState?.status;
  }
};
