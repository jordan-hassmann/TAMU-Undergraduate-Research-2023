import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: {},
  loaded: false,
}

export const facultySlice = createSlice({
  name: 'faculty', 
  initialState,
  reducers: {
    addFaculty: (state, action) => {
      state.values = {...state.values, ...action.payload}
      state.loaded = true
    },
    clearFaculty: state => {
      state.values = {}
      state.loaded = false
    }
  }
})


export const { addFaculty, clearFaculty } = facultySlice.actions
export default facultySlice.reducer