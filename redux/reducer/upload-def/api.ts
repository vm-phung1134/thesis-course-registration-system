import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import {
  IUploadReportObject,
  IUploadReportObjectInput,
} from "@/interface/upload";
import { IAuthObject } from "@/interface/auth";

const apiURL = `http://qthuy2k1.shop/api/final-file`;

// GET ALL UPLOAD REPORT
const getAllUploadReports = createAsyncThunk(
  "upload/getAllUploadReports",
  async () => {
    const response = await axios.get(`${apiURL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all uploads");
  }
);

// GET ONE UPLOAD REPORT
const getUploadReport = createAsyncThunk(
  "upload/getUploadReport",
  async (postData: IAuthObject) => {
    const response = await axios.get(`${apiURL}/auth/${postData.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.finalFile;
    }
    throw new Error("Failed to get one upload");
  }
);

// CREATE UPLOAD REPORT
const createUploadReport = createAsyncThunk(
  "upload/createUploadReport",
  async (postData: IUploadReportObjectInput) => {
    const formData = new FormData();
    formData.append("authorID", postData.authorID);
    formData.append("status", postData.status);
    if (postData.attachments) {
      for (let i = 0; i < postData.attachments.length; i++) {
        formData.append("attachments", postData.attachments[i]);
      }
    }

    const response = await axios.post(
      `http://qthuy2k1.shop/upload/final-file`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }

    throw new Error("Failed to create upload");
  }
);

// DELETE UPLOAD REPORT
const deleteUploadReport = createAsyncThunk(
  "upload/deleteUploadReport",
  async (id: string) => {
    const response = await axios.delete(
      `http://qthuy2k1.shop/api/attachment/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete upload");
  }
);

export {
  getAllUploadReports,
  getUploadReport,
  createUploadReport,
  deleteUploadReport,
};
