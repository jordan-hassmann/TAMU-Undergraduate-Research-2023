import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: [],
  loaded: false,
}

export const chatsSlice = createSlice({
  name: 'chats', 
  initialState,
  reducers: {
    addChats: (state, action) => {
      state.values = [...state.values, ...action.payload]
      state.loaded = true
    },
    clearChats: state => {
      state.values = []
      state.loaded = false
    }
  }
})



export const { addChats, clearChats } = chatsSlice.actions
export default chatsSlice.reducer