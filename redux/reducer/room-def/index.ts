import { createSlice } from "@reduxjs/toolkit";
import { INITIATE_ROOM_DEF } from "@/data";
import {
  createRoomDef,
  deleteRoomDef,
  getAllRoomDefs,
  getOneRoomDef,
  updateRoomDef,
} from "./api";
import { RoomDefState } from "./type";

const initialState: RoomDefState = {
  rooms: [],
  room: INITIATE_ROOM_DEF,
  isLoading: false,
  error: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ONE STUDENT DEF
    builder.addCase(getOneRoomDef.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getOneRoomDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.room = action.payload;
    });
    builder.addCase(getOneRoomDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET ALL STUDENT DEF
    builder.addCase(getAllRoomDefs.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllRoomDefs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.rooms = action.payload;
    });
    builder.addCase(getAllRoomDefs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // CREATE STUDENT DEF
    builder.addCase(createRoomDef.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createRoomDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.room = action.payload;
    });
    builder.addCase(createRoomDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // UPDATE STUDENT DEF
    builder.addCase(updateRoomDef.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateRoomDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.room = action.payload;
    });
    builder.addCase(updateRoomDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // DELETE STUDENT DEF
    builder.addCase(deleteRoomDef.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteRoomDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.room = action.payload;
    });
    builder.addCase(deleteRoomDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default roomSlice.reducer;
