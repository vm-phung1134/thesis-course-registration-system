import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IClassroomObject } from "@/interface/classroom";
import { IAuthObject } from "@/interface/auth";

// GET ALL CLASSROOM
const getAllClassrooms = createAsyncThunk(
  "classroom/getAllClassroom",
  async () => {
    const response = await axios.get("http://localhost:5000/api/classroom", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all classroom");
  }
);

// GET ONE CLASSROOM
const getClassroom = createAsyncThunk(
  "classroom/getClassroom",
  async (postData: IAuthObject) => {
    const response = await axios.get(
      `http://localhost:5000/api/classroom/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get one classroom");
  }
);

// CREATE CLASSROOM
const createClassroom = createAsyncThunk(
  "classroom/createClassroom",
  async (postData: Omit<IClassroomObject, "id">) => {
    const response = await axios.post(
      "http://localhost:5000/api/classroom",
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
    throw new Error("Failed to create classroom");
  }
);

// UPDATE CLASSROOM
const updateClassroom = createAsyncThunk(
  "classroom/updateClassroom",
  async (postData: IClassroomObject) => {
    const response = await axios.put(
      `http://localhost:5000/api/classroom/${postData.id}`,
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
    throw new Error("Failed to update auth");
  }
);

const deleteClassroom = createAsyncThunk(
  "classroom/deleteClassroom",
  async (postData: IClassroomObject) => {
    const response = await axios.delete(
      `http://localhost:5000/api/classroom/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete classroom");
  }
);

export {
  getAllClassrooms,
  getClassroom,
  createClassroom,
  updateClassroom,
  deleteClassroom,
};
