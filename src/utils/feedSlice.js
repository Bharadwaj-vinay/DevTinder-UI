import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: 'feed',
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: () => null,
    removeUser: (state, action) => {
      const data = state.data.filter(user => user._id !== action.payload);

      return {...state, data};
  }
  }
});

export default feedSlice.reducer; // exporting the reducer of this slice
export const { addFeed, removeFeed, removeUser } = feedSlice.actions; // exporting the actions of this slice