import { createSlice } from "@reduxjs/toolkit";
import { TopicState } from "./type";
import { createTopic, getAllTopics, getTopic, updateTopic } from "./api";
import { INITIATE_TOPIC } from "@/data";

const initialState: TopicState = {
  topics: [],
  isLoading: false,
  topic: INITIATE_TOPIC,
  error: null,
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CREATE NEW TOPIC
    builder.addCase(createTopic.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createTopic.fulfilled, (state, action) => {
      state.isLoading = false;
      state.topic = action.payload;
    });
    builder.addCase(createTopic.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
    // GET ONE TOPIC
    builder.addCase(getTopic.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getTopic.fulfilled, (state, action) => {
      state.isLoading = false;
      state.topic = action.payload;
    });
    builder.addCase(getTopic.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
    // GET ALL TOPICS
    builder.addCase(getAllTopics.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllTopics.fulfilled, (state, action) => {
      state.isLoading = false;
      state.topics = action.payload;
    });
    builder.addCase(getAllTopics.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
    // UPDATE TOPIC
    builder.addCase(updateTopic.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateTopic.fulfilled, (state, action) => {
      state.isLoading = false;
      state.topic = action.payload;
    });
    builder.addCase(updateTopic.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default topicSlice.reducer;
