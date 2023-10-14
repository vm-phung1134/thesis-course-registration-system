import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IAuthObject } from "@/interface/auth";

// GET ONE COUNCIL DEF
const getOneCouncilDef = createAsyncThunk(
  "council/getOneCouncilDef",
  async (postData: IAuthObject) => {
    const response = await axios.get(
      `http://localhost:5000/api/council-def/${postData.id}`,
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
const getAllCouncilDefs = createAsyncThunk(
  "council/getAllCouncilDefs",
  async () => {
    const response = await axios.get(`http://localhost:5000/api/council-def`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all auths");
  }
);

// CREATE COUNCIL DEF
const createCouncilDef = createAsyncThunk(
  "council/createCouncilDef",
  async (postData: IAuthObject) => {
    const response = await axios.post(
      "http://localhost:5000/api/council-def",
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
    throw new Error("Failed to create council-def");
  }
);

// UPDATE COUNCIL DEF
const updateCouncilDef = createAsyncThunk(
  "council/updateCouncilDef",
  async (postData: IAuthObject) => {
    const response = await axios.put(
      `http://localhost:5000/api/council-def/${postData.id}`,
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
    throw new Error("Failed to update council-def");
  }
);

// DELETE COUNCIL DEF
const deleteCouncilDef = createAsyncThunk(
  "council/deleteCouncilDef",
  async (postData: IAuthObject) => {
    const response = await axios.delete(
      `http://localhost:5000/api/council-def/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete council defense");
  }
);

export {
  getAllCouncilDefs,
  getOneCouncilDef,
  updateCouncilDef,
  createCouncilDef,
  deleteCouncilDef,
};
