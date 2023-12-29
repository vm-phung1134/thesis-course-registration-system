import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IClassroomObject } from "@/interface/classroom";
import { apiURL } from "@/data";

// GET LIST CLASSROOMS
const getAllClassrooms = createAsyncThunk(
  "classroom/getAllClassrooms",
  async () => {
    const response = await axios.get(`${apiURL}/classroom`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all classrooms");
  }
);

// GET ONE DETAIL CLASSROOM
const getClassroom = createAsyncThunk(
  "classroom/getClassroom",
  async (classroomId: string) => {
    const response = await axios.get(`${apiURL}/classroom/${classroomId}`, {
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
  async (classroom: Omit<IClassroomObject, "id">) => {
    const response = await axios.post(`${apiURL}/classroom`, classroom, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
      `${apiURL}/classroom/${postData.id}`,
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
    const response = await axios.delete(`${apiURL}/classroom/${postData.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
