import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IUploadReportObject } from "@/interface/upload";
import { IAuthObject } from "@/interface/auth";
import { apiURL } from "@/data";

// GET ALL UPLOAD REPORT
const getAllUploadReports = createAsyncThunk(
  "upload/getAllUploadReports",
  async () => {
    const response = await axios.get(`${apiURL}/upload-report`, {
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
  async (id: string) => {
    const response = await axios.get(`${apiURL}/upload-report/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get one upload");
  }
);

// CREATE UPLOAD REPORT
const createUploadReport = createAsyncThunk(
  "upload/createUploadReport",
  async (postData: IUploadReportObject) => {
    const formData = new FormData();
    formData.append("uid", postData.uid);
    formData.append("student", JSON.stringify(postData.student));
    formData.append("status", postData.status);
    if (postData.attachments) {
      for (let i = 0; i < postData.attachments.length; i++) {
        formData.append("attachment", postData.attachments[i]);
      }
    }

    const response = await axios.post(`${apiURL}/upload-report/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      return response.data;
    }

    throw new Error("Failed to create upload");
  }
);

// UPDATE UPLOAD REPORT
const updateUploadReport = createAsyncThunk(
  "upload/updateUploadReport",
  async (postData: IUploadReportObject) => {
    const response = await axios.put(
      `${apiURL}/upload-report/${postData.id}`,
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
    throw new Error("Failed to update upload");
  }
);

// DELETE UPLOAD REPORT
const deleteUploadReport = createAsyncThunk(
  "upload/deleteUploadReport",
  async (postData: IUploadReportObject) => {
    const response = await axios.delete(
      `${apiURL}/upload-report/${postData.id}`,
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
  updateUploadReport,
  deleteUploadReport,
};
