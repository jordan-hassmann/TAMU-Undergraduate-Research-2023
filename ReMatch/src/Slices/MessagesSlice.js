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
    clearMessages: state => {
      state.values = []
    }
  }
})


export const { addMessages, clearMessages } = messagesSlice.actions
export default messagesSlice.reducer