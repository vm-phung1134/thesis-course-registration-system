import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IExerciseObject } from "@/interface/exercise";
import { IClassroomObject } from "@/interface/classroom";

// GET ALL EXERCISES
const getAllExercises = createAsyncThunk(
  "exercise/getAllExercises",
  async () => {
    const response = await axios.get(`http://localhost:5000/api/exercise`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all exercises");
  }
);

// GET ONE EXERCISE
const getExercise = createAsyncThunk(
  "exercise/getExercise",
  async (postData: IExerciseObject) => {
    const response = await axios.get(
      `http://localhost:5000/api/exercise/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get one exercise");
  }
);

// CREATE EXERCISE
const createExercise = createAsyncThunk(
  "exercise/createExercise",
  async (postData: IExerciseObject) => {
    const response = await axios.post(
      `http://localhost:5000/api/exercise`,
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
    throw new Error("Failed to create exercise");
  }
);

// UPDATE EXERCISE
const updateExercise = createAsyncThunk(
  "exercise/updateExercise",
  async (postData: IExerciseObject) => {
    const response = await axios.put(
      `http://localhost:5000/api/exercise/${postData.id}`,
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
    throw new Error("Failed to update exercise");
  }
);

// DELETE EXERCISE
const deleteExercise = createAsyncThunk(
  "exercise/deleteExercise",
  async (postData: IExerciseObject) => {
    const response = await axios.delete(
      `http://localhost:5000/api/exercise/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete exercise");
  }
);

// GET ALL EXERCISE FOLLOW CLASS
const getAllExerciseInClass = createAsyncThunk(
  "exercise/getAllExerciseInClass",
  async (postData: IClassroomObject) => {
    const response = await axios.get(
      `http://localhost:5000/api/exercise/class/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all exercises");
  }
);

// GET ALL EXERCISE FOLLOW REPORT STAGE
const getAllExerciseInReportStage = createAsyncThunk(
  "exercise/getAllExerciseInReportStage",
  async (postData: IExerciseObject) => {
    const response = await axios.get(
      `http://localhost:5000/api/exercise/${postData.classroom.id}&${postData.category.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all exercises");
  }
);
export {
  getAllExercises,
  getExercise,
  createExercise,
  updateExercise,
  deleteExercise,
  getAllExerciseInReportStage,
  getAllExerciseInClass,
};
