import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: {}
}

export const facultySlice = createSlice({
  name: 'faculty', 
  initialState,
  reducers: {
    addFaculty: (state, action) => {
      state.values = {...state.values, ...action.payload}
    },
  }
})


export const { addFaculty } = facultySlice.actions
export default facultySlice.reducer