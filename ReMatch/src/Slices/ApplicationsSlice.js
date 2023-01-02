import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  values: [],
  loaded: false,
}

export const applicationsSlice = createSlice({
  name: 'applications', 
  initialState,
  reducers: {
    addApplications: (state, action) => {
      state.values = [...state.values, ...action.payload]
      state.loaded = true
    },
    clearApplications: state => {
      state.values = []
      state.loaded = false
    },
    removeApplications: (state, action) => {
      state.values = [...state.values].filter(item => !action.payload.find(app => app.id === item.id))
    }
  }
})


export const { addApplications, clearApplications, removeApplications } = applicationsSlice.actions
export default applicationsSlice.reducer