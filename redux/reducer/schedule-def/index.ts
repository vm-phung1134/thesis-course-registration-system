import { createSlice } from "@reduxjs/toolkit";
import { ScheduledDefState } from "./type";
import { createScheduleDef, getScheduleDef} from "./api";

const initialState: ScheduledDefState = {
  thesis: {
    thesis: []
  },
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ONE STUDENT DEF
    builder.addCase(createScheduleDef.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createScheduleDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.thesis = action.payload;
    });
    builder.addCase(createScheduleDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET ALL STUDENT DEF
    builder.addCase(getScheduleDef.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getScheduleDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.thesis = action.payload;
    });
    builder.addCase(getScheduleDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default authSlice.reducer;
