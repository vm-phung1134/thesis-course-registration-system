import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IAssessLecturerItem, token } from "./type";
import { IPointDefObject } from "@/interface/pointDef";

// GET ONE COUNCIL DEF
const getOnePointDef = createAsyncThunk(
  "point/getOnePointDef",
  async (postData: IPointDefObject) => {
    const response = await axios.get(
      `http://localhost:5000/api/point-def/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get one auth");
  }
);

// GET ONE COUNCIL DEF FOR LECTURER
const getOnePointDefForLecturer = createAsyncThunk(
  "point/getOnePointDefForLecturer",
  async (postData: IAssessLecturerItem) => {
    const response = await axios.get(
      `http://localhost:5000/api/point-def/student-point/${postData.studentId}&${postData.lecturerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get one auth");
  }
);

// GET ALL COUNCIL DEFS
const getAllPointDefs = createAsyncThunk("point/getAllPointDefs", async () => {
  const response = await axios.get(`http://localhost:5000/api/point-def`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to get all auths");
});

// CREATE COUNCIL DEF
const createPointDef = createAsyncThunk(
  "point/createPointDef",
  async (postData: IPointDefObject) => {
    const response = await axios.post(
      "http://localhost:5000/api/point-def",
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
    throw new Error("Failed to create point-def");
  }
);

// UPDATE COUNCIL DEF
const updatePointDef = createAsyncThunk(
  "point/updatePointDef",
  async (postData: IPointDefObject) => {
    const response = await axios.put(
      `http://localhost:5000/api/point-def/${postData.id}`,
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
    throw new Error("Failed to update point-def");
  }
);

// DELETE COUNCIL DEF
const deletePointDef = createAsyncThunk(
  "point/deletePointDef",
  async (postData: IPointDefObject) => {
    const response = await axios.delete(
      `http://localhost:5000/api/point-def/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete point defense");
  }
);

export {
  getAllPointDefs,
  getOnePointDef,
  updatePointDef,
  createPointDef,
  deletePointDef,
  getOnePointDefForLecturer,
};
