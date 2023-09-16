import { createAsyncThunk } from "@reduxjs/toolkit";
import { token } from "./type";
import axios from "axios";
import { ITopicObject } from "@/interface/topic";

// GET ALL TOPICS
const getAllTopics = createAsyncThunk("topic/getAllTopics", async () => {
  const response = await axios.get("", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to get all Topics");
});

// GET ONE TOPIC
const getTopic = createAsyncThunk(
  "topic/getTopic",
  async (postData: ITopicObject) => {
    const response = await axios.get("", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get one topic");
  }
);

// UPDATE TOPIC
const updateTopic = createAsyncThunk(
  "topic/updateTopic",
  async (postData: ITopicObject) => {
    const response = await axios.put(``, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to update topic");
  }
);

export { getTopic, getAllTopics, updateTopic };
