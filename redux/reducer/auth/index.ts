import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./type";
import { INITIATE_AUTH, INITIATE_COURSE } from "@/data";
import {
  checkStateSubscribe,
  getAllAuths,
  getOneAuth,
  loginAuth,
  updateAuth,
} from "./api";

const initialState: AuthState = {
  auths: [],
  auth: INITIATE_AUTH,
  isLoading: false,
  isSuccess: false,
  error: null,
  stateAuth: {
    classroom: INITIATE_COURSE,
    member: INITIATE_AUTH,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ONE AUTH
    builder.addCase(getOneAuth.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getOneAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.auth = action.payload;
    });
    builder.addCase(getOneAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET ALL AUTHORS
    builder.addCase(getAllAuths.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllAuths.fulfilled, (state, action) => {
      state.isLoading = false;
      state.auths = action.payload;
    });
    builder.addCase(getAllAuths.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // LOGIN AUTH
    builder.addCase(loginAuth.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(loginAuth.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(loginAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // UPDATE AUTH
    builder.addCase(updateAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.auth = action.payload;
    });
    builder.addCase(updateAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    //CHECK STATE SUBCRIBE
    builder.addCase(checkStateSubscribe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkStateSubscribe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.stateAuth = action.payload;
    });
    builder.addCase(checkStateSubscribe.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default authSlice.reducer;
