import { createAsyncThunk } from "@reduxjs/toolkit";
import { token } from "./type";
import axios from "axios";
import { ITopicObject } from "@/interface/topic";
import { apiURL } from "@/data";

// CREATE NEW TOPIC
const createTopic = createAsyncThunk(
  "topic/createTopic",
  async (postData: ITopicObject) => {
    const response = await axios.post(`${apiURL}/topic`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to create topic");
  }
);

// GET ALL TOPICS
const getAllTopics = createAsyncThunk("topic/getAllTopics", async () => {
  const response = await axios.get(`${apiURL}/topic`, {
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
const getTopic = createAsyncThunk("topic/getTopic", async (id: string) => {
  const response = await axios.get(`${apiURL}/topic/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to get one topic");
});

// UPDATE TOPIC
const updateTopic = createAsyncThunk(
  "topic/updateTopic",
  async (postData: ITopicObject) => {
    const response = await axios.put(
      `${apiURL}/topic/${postData.id}`,
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
    throw new Error("Failed to update topic");
  }
);

export { getTopic, getAllTopics, updateTopic, createTopic };
