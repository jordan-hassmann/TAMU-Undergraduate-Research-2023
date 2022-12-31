import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: []
}

export const messagesSlice = createSlice({
  name: 'messages', 
  initialState,
  reducers: {
    addMessages: (state, action) => {
      state.values = [...state.values, ...action.payload]
    },
  }
})


export const { addMessages } = messagesSlice.actions
export default messagesSlice.reducer