import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: []
}

export const applicationsSlice = createSlice({
  name: 'applications', 
  initialState,
  reducers: {
    addApplications: (state, action) => {
      state.values = [...state.values, ...action.payload]
    },
    clearApplications: state => {
      state.values = []
    }
  }
})


export const { addApplications, clearApplications } = applicationsSlice.actions
export default applicationsSlice.reducer