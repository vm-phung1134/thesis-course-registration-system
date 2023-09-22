import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "../auth/type";
import { IMemberObject } from "@/interface/member";

// GET ALL REQUIREMENTS
const getAllRequirements = createAsyncThunk(
  "requirement/getAllRequirements",
  async () => {
    const response = await axios.get("http://localhost:5000/api/requirement", {
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

// CREATE NEW REQUIREMENT
const createRequirement = createAsyncThunk(
  "requirement/createRequirement",
  async (postData: IMemberObject) => {
    const response = await axios.post(
      "http://localhost:5000/api/requirement",
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
    throw new Error("Failed to create new requirement");
  }
);

// DELETE FROM LIST REQUIREMENTS
const deleteRequirement = createAsyncThunk(
  "requirement/deleteRequirement",
  async (postData: IMemberObject) => {
    const response = await axios.delete(
      `http://localhost:5000/api/requirement/${postData?.id}`,
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

export { getAllRequirements, createRequirement, deleteRequirement };
