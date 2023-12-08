import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IAssessLecturerItem, token } from "./type";
import { IPointDefObject } from "@/interface/pointDef";
import { IAuthObject } from "@/interface/auth";

const apiURL =
  "https://thesis-course-registration-system-backend-vm-phung1134.vercel.app/api/point-def";

// GET ONE POINT DEF
const getOnePointDef = createAsyncThunk(
  "point/getOnePointDef",
  async (postData: IAuthObject) => {
    const response = await axios.get(`${apiURL}/${postData.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get one point");
  }
);

// GET ONE POINT DEF FOR LECTURER
const getOnePointDefForLecturer = createAsyncThunk(
  "point/getOnePointDefForLecturer",
  async (postData: IAssessLecturerItem) => {
    const response = await axios.get(
      `${apiURL}/student-point/${postData.studentId}&${postData.lecturerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get one point");
  }
);

// GET ALL POINT DEFS
const getAllPointDefs = createAsyncThunk(
  "point/getAllPointDefs",
  async (postData: IAuthObject) => {
    const response = await axios.get(
      `${apiURL}/student-point/${postData?.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all points");
  }
);

// CREATE POINT DEF
const createPointDef = createAsyncThunk(
  "point/createPointDef",
  async (postData: IPointDefObject) => {
    const response = await axios.post(`${apiURL}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to create point-def");
  }
);

// UPDATE POINT DEF
const updatePointDef = createAsyncThunk(
  "point/updatePointDef",
  async (postData: IPointDefObject) => {
    const response = await axios.put(`${apiURL}/${postData.id}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to update point-def");
  }
);

// DELETE POINT DEF
const deletePointDef = createAsyncThunk(
  "point/deletePointDef",
  async (postData: IPointDefObject) => {
    const response = await axios.delete(`${apiURL}/${postData.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
