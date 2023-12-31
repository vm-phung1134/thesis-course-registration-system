import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UndateParams, token } from "./type";
import { IAuthObject } from "@/interface/auth";
import { IUnavailableDate } from "@/interface/unavaiableDate";
import { apiURL } from "@/data";

// GET ALL INVALID DATE OF INSTRUCTOR
const getAllUnavaiableDates = createAsyncThunk(
  "unavailable-date/getAllUnavaiableDates",
  async (postData: IAuthObject) => {
    const response = await axios.get(
      `${apiURL}/unavailable-date/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all unavailable-dates");
  }
);

// GET ALL INVALID DATE
const getAllUnavaiableDate = createAsyncThunk(
  "unavailable-date/getAllUnavaiableDate",
  async () => {
    const response = await axios.get(`${apiURL}/unavailable-date`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all unavailable-dates");
  }
);

const createUnavaiableDate = createAsyncThunk(
  "unavailable-date/createUnavaiableDate",
  async (postData: IUnavailableDate) => {
    const response = await axios.post(`${apiURL}/unavailable-date/`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to create unavailable-date");
  }
);

const deleteUnavaiableDate = createAsyncThunk(
  "unavailable-date/deleteUnavaiableDate",
  async (postData: UndateParams) => {
    const response = await axios.delete(
      `${apiURL}/unavailable-date/${postData.idAuth}&${postData.idUndate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete unavailable-date");
  }
);

export {
  getAllUnavaiableDates,
  createUnavaiableDate,
  deleteUnavaiableDate,
  getAllUnavaiableDate,
};
