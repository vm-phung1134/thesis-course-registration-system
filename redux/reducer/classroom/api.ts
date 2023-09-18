import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IClassroomObject } from "@/interface/classroom";

// GET ALL CLASSROOM
const getAllClassrooms = createAsyncThunk(
  "classroom/getAllClassroom",
  async () => {
    const response = await axios.get("", {
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
  async (classroomId: string) => {
    const response = await axios.get(``, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get one classroom");
  }
);

// CREATE CLASSROOM
const createClassroom = createAsyncThunk(
  "classroom/createClassroom",
  async (postData: IClassroomObject) => {
    const response = await axios.post("", postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to create blog post");
  }
);

export { getAllClassrooms, getClassroom, createClassroom };
