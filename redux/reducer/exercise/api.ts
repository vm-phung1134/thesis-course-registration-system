import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IExerciseObject } from "@/interface/exercise";

// GET ALL EXERCISES
const getAllExercises = createAsyncThunk(
  "exercise/getAllExercises",
  async () => {
    const response = await axios.get(``, {
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
    const response = await axios.get(``, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const response = await axios.post(``, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const response = await axios.put(``, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const response = await axios.delete(``, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete exercise");
  }
);

export {
  getAllExercises,
  getExercise,
  createExercise,
  updateExercise,
  deleteExercise,
};
