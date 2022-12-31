import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: []
}

export const chatsSlice = createSlice({
  name: 'chats', 
  initialState,
  reducers: {
    addChats: (state, action) => {
      state.values = [...state.values, ...action.payload]
    },
  }
})


export const { addChats } = chatsSlice.actions
export default chatsSlice.reducer