import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IClassroomObject, IClassroomObjectInput } from "@/interface/classroom";
import { IAuthObject } from "@/interface/auth";

const apiURL = `http://qthuy2k1.shop/api/class`;

// GET ALL CLASSROOM
const getAllClassrooms = createAsyncThunk(
  "member/getAllClassrooms",
  async () => {
    const response = await axios.get(`${apiURL}?limit=100`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.classrooms;
    }
    throw new Error("Failed to get all members");
  }
);

// GET ONE CLASSROOM
const getClassroom = createAsyncThunk(
  "classroom/getClassroom",
  async (postData: IAuthObject) => {
    const response = await axios.get(`${apiURL}/auth/${postData.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.classroom;
    }
    throw new Error("Failed to get one classroom");
  }
);

// GET ALL EXERCISES IN CLASSROOM
const getAllExerciseInClass = createAsyncThunk(
  "classroom/getAllExerciseInClass",
  async (postData: IClassroomObject) => {
    const response = await axios.get(`${apiURL}/${postData.id}/exercise`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.exercises;
    }
    throw new Error("Failed to get all exercises");
  }
);

// GET ALL EXERCISES IN CLASSROOM
const getAllPostInClass = createAsyncThunk(
  "classroom/getAllPostInClass",
  async (postData: IClassroomObject) => {
    const response = await axios.get(`${apiURL}/${postData.id}/post`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.posts;
    }
    throw new Error("Failed to get all posts");
  }
);

// CREATE CLASSROOM
const createClassroom = createAsyncThunk(
  "classroom/createClassroom",
  async (postData: Omit<IClassroomObjectInput, "id">) => {
    const response = await axios.post(
      `${apiURL}`,
      { classroom: postData },
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
  async (postData: IClassroomObjectInput) => {
    const response = await axios.put(
      `${apiURL}/${postData.id}`,
      { classroom: postData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.classroom;
    }
    throw new Error("Failed to update auth");
  }
);

const deleteClassroom = createAsyncThunk(
  "classroom/deleteClassroom",
  async (postData: IClassroomObject) => {
    const response = await axios.delete(`${apiURL}/${postData.id}`, {
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
  getAllExerciseInClass,
  getAllPostInClass,
};
