import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IAssessLecturerItem, token } from "./type";
import { IPointDefObject } from "@/interface/pointDef";
import { IAuthObject } from "@/interface/auth";
import { apiURL } from "@/data";

// GET ONE COUNCIL DEF
const getOnePointDef = createAsyncThunk(
  "point/getOnePointDef",
  async (user: IAuthObject) => {
    const response = await axios.get(`${apiURL}/point-def/${user.id}`, {
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

// GET ONE COUNCIL DEF FOR LECTURER
const getOnePointDefForLecturer = createAsyncThunk(
  "point/getOnePointDefForLecturer",
  async (point: IAssessLecturerItem) => {
    const response = await axios.get(
      `${apiURL}/point-def/student-point/${point.studentId}&${point.lecturerId}`,
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
const getAllPointDefs = createAsyncThunk(
  "point/getAllPointDefs",
  async (user: IAuthObject) => {
    const response = await axios.get(
      `${apiURL}/point-def/student-point/${user?.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all auths");
  }
);

// CREATE COUNCIL DEF
const createPointDef = createAsyncThunk(
  "point/createPointDef",
  async (point: IPointDefObject) => {
    const response = await axios.post("${apiURL}/point-def", point, {
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

// UPDATE COUNCIL DEF
const updatePointDef = createAsyncThunk(
  "point/updatePointDef",
  async (point: IPointDefObject) => {
    const response = await axios.put(`${apiURL}/point-def/${point.id}`, point, {
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

// DELETE COUNCIL DEF
const deletePointDef = createAsyncThunk(
  "point/deletePointDef",
  async (point: IPointDefObject) => {
    const response = await axios.delete(`${apiURL}/point-def/${point.id}`, {
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
