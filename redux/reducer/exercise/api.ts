import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IExerciseObject, IExerciseObjectInput } from "@/interface/exercise";

const apiURL = `http://qthuy2k1.shop/api/exercise`;

// GET ALL EXERCISES
const getAllExercises = createAsyncThunk(
  "exercise/getAllExercises",
  async () => {
    const response = await axios.get(`${apiURL}`, {
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

// GET ONE EXERCISE
const getExercise = createAsyncThunk(
  "exercise/getExercise",
  async (postData: IExerciseObject) => {
    const response = await axios.get(`${apiURL}/${postData.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.exercise;
    }
    throw new Error("Failed to get one exercise");
  }
);

// CREATE EXERCISE
const createExercise = createAsyncThunk(
  "exercise/createExercise",
  async (postData: IExerciseObjectInput) => {
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("categoryID", postData.categoryID);
    formData.append("classroomID", postData.classroomID);
    formData.append("authorID", postData.authorID);
    formData.append("description", postData.description);
    formData.append("deadline", postData.deadline);

    if (postData.attachments) {
      for (let i = 0; i < postData.attachments.length; i++) {
        formData.append("attachments", postData.attachments[i]);
      }
    }
    const response = await axios.post(
      `http://qthuy2k1.shop/upload/exercise`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 201) {
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
      `${apiURL}/${postData.id}`,
      { exercise: postData },
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
    const response = await axios.delete(`${apiURL}/${postData.id}`, {
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

// GET ALL EXERCISE FOLLOW REPORT STAGE
const getAllExerciseInReportStage = createAsyncThunk(
  "exercise/getAllExerciseInReportStage",
  async (postData: any) => {
    const response = await axios.get(
      `${apiURL}/stage/${postData.classroomId}&${postData.categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.exerciseInStage;
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
};
