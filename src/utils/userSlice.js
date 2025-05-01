import {createSlice} from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser: (state, action) => {
        return action.payload;
    },
    removeUser: (state, action) => {
        return null;
    },
},
});

export default userSlice.reducer; // exporting the reducer of this slice

export const {addUser, removeUser} = userSlice.actions; // exporting the actions of this slice
// addUser and removeUser are the actions that we can use to update the state of this slice