import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IRoomDefObject } from "@/interface/room";
import { apiURL } from "@/data";

// GET ONE ROOM DEF
const getOneRoomDef = createAsyncThunk(
  "room/getOneRoomDef",
  async (postData: IRoomDefObject) => {
    const response = await axios.get(`${apiURL}/room-def/${postData.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get one auth");
  }
);

// GET ALL ROOM DEFS
const getAllRoomDefs = createAsyncThunk("room/getAllRoomDefs", async () => {
  const response = await axios.get(`${apiURL}/room-def`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to get all auths");
});

// CREATE ROOM DEF
const createRoomDef = createAsyncThunk(
  "room/createRoomDef",
  async (postData: Omit<IRoomDefObject, "id">) => {
    const response = await axios.post(`${apiURL}/room-def`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to create room-def");
  }
);

// UPDATE ROOM DEF
const updateRoomDef = createAsyncThunk(
  "room/updateRoomDef",
  async (postData: IRoomDefObject) => {
    const response = await axios.put(
      `${apiURL}/room-def/${postData.id}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to update room-def");
  }
);

// DELETE ROOM DEF
const deleteRoomDef = createAsyncThunk(
  "room/deleteRoomDef",
  async (postData: IRoomDefObject) => {
    const response = await axios.delete(`${apiURL}/room-def/${postData.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete room defense");
  }
);

export {
  getAllRoomDefs,
  getOneRoomDef,
  updateRoomDef,
  createRoomDef,
  deleteRoomDef,
};
