import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: 'feed',
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: () => null,
  }
});

export default feedSlice.reducer; // exporting the reducer of this slice
export const { addFeed, removeFeed } = feedSlice.actions; // exporting the actions of this slice