import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "../auth/type";
import { IMemberObject, IMemberObjectInput } from "@/interface/member";
import { IAuthObject } from "@/interface/auth";
import { IClassroomObjectInput } from "@/interface/classroom";

const apiURL = `http://qthuy2k1.shop/api/requirement`;

// GET ALL REQUIREMENTS
const getAllRequirements = createAsyncThunk(
  "requirement/getAllRequirements",
  async (id: string) => {
    const response = await axios.get(`${apiURL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.waitingLists;
    }
    throw new Error("Failed to get all requirements");
  }
);

// GET ALL REQUIREMENT OF LECTURER BY CLASSROOM ID
const getAllRequirementClassroom = createAsyncThunk(
  "requirement/getAllRequirementClassroom",
  async (id: string) => {
    const response = await axios.get(`${apiURL}/class/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.waitingLists;
    }
    throw new Error("Failed to get all requirements in classroom");
  }
);

// CREATE NEW REQUIREMENT
const createRequirement = createAsyncThunk(
  "requirement/createRequirement",
  async (postData: IMemberObjectInput, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiURL}`,
        { waitingList: postData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    const response = await axios.delete(`${apiURL}/${postData?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete requirement");
  }
);

export {
  getAllRequirements,
  createRequirement,
  getAllRequirementClassroom,
  deleteRequirement,
};
