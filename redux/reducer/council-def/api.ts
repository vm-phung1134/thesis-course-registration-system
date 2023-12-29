import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IAuthObject } from "@/interface/auth";
import { apiURL } from "@/data";

// GET ONE COUNCIL DEF
const getOneCouncilDef = createAsyncThunk(
  "council/getOneCouncilDef",
  async (user: IAuthObject) => {
    const response = await axios.get(`${apiURL}/council-def/${user.id}`, {
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

// GET ALL COUNCIL DEFS
const getAllCouncilDefs = createAsyncThunk(
  "council/getAllCouncilDefs",
  async () => {
    const response = await axios.get(`${apiURL}/council-def`, {
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
    const response = await axios.post(`${apiURL}/council-def`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
      `${apiURL}/council-def/${postData.id}`,
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
      `${apiURL}/council-def/${postData.id}`,
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

// DELETE ALL COUNCIL DEF
const deleteAllCouncilDef = createAsyncThunk(
  "council/deleteAllCouncilDef",
  async () => {
    const response = await axios.delete(`${apiURL}/council-def/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete all council defense");
  }
);

export {
  getAllCouncilDefs,
  getOneCouncilDef,
  updateCouncilDef,
  createCouncilDef,
  deleteCouncilDef,
  deleteAllCouncilDef,
};
