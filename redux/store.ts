import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import logger from "redux-logger";
import { useSelector } from "react-redux";
// Import reducers
import authSlice from "./reducer/auth";
import classroomSlice from "./reducer/classroom";
import memberSlice from "./reducer/member";
import requirementSlice from "./reducer/requirement";
import topicSlice from "./reducer/topic";
import reportStageSlice from "./reducer/report-stage";
import postSlice from "./reducer/post";
import exerciseSlice from "./reducer/exercise";
import commentSlice from "./reducer/comment";

const rootReducer = combineReducers({
  authReducer: authSlice,
  classroomReducer: classroomSlice,
  memberReducer: memberSlice,
  requirementReducer: requirementSlice,
  topicReducer: topicSlice,
  reportStageReducer: reportStageSlice,
  postReducer: postSlice,
  exerciseReducer: exerciseSlice,
  commentReducer: commentSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
