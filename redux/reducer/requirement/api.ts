import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "../auth/type";
import { IMemberObject } from "@/interface/member";
import { IAuthObject } from "@/interface/auth";
import { apiURL } from "@/data";

// GET ALL REQUIREMENTS
const getAllRequirements = createAsyncThunk(
  "requirement/getAllRequirements",
  async () => {
    const response = await axios.get(`${apiURL}/requirement`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all requirements");
  }
);

// GET ALL MEMBER BY CLASSROOM ID
const getAllRequirementClassroom = createAsyncThunk(
  "requirement/getAllRequirementClassroom",
  async (user: IAuthObject) => {
    const response = await axios.get(`${apiURL}/requirement/class/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all members in classroom");
  }
);

// CREATE NEW REQUIREMENT
const createRequirement = createAsyncThunk(
  "requirement/createRequirement",
  async (postData: Omit<IMemberObject, "id">, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiURL}/requirement`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      }
      throw new Error("Failed to create new requirement");
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// DELETE FROM LIST REQUIREMENTS
const deleteRequirement = createAsyncThunk(
  "requirement/deleteRequirement",
  async (postData: IMemberObject) => {
    const response = await axios.delete(
      `${apiURL}/requirement/${postData?.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete blog post");
  }
);

export {
  getAllRequirements,
  createRequirement,
  getAllRequirementClassroom,
  deleteRequirement,
};
