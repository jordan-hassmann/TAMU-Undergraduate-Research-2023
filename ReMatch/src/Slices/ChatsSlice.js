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
    removeChats: (state, action) => {
      state.values = [...state.values].filter(item => !action.payload.find(chat => chat.id === item.id))
    },
    clearChats: state => {
      state.values = []
      state.loaded = false
    }
  }
})



export const { addChats, clearChats, removeChats } = chatsSlice.actions
export default chatsSlice.reducer