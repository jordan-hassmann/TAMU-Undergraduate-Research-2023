import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: [],
  loaded: false,
}

export const messagesSlice = createSlice({
  name: 'messages', 
  initialState,
  reducers: {
    addMessages: (state, action) => {
      state.values = [...state.values, ...action.payload]
      state.loaded = true
    },
    clearMessages: state => {
      state.values = []
      state.loaded = false
    }
  }
})


export const { addMessages, clearMessages } = messagesSlice.actions
export default messagesSlice.reducer