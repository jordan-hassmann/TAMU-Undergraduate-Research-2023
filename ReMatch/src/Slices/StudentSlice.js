import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  student: {
    id: null, 
    firstname: '',
    lastname: '',
    headline: '',
    pitch: '',
    resumeID: '',
    skills: [],
    duration: [],
    minPay: 0
  }
}

export const studentSlice = createSlice({
  name: 'students', 
  initialState,
  reducers: {
    updateStudent: (state, action) => {
      state.student = {...action.payload}
    },
  }
})


export const { updateStudent } = studentSlice.actions
export default studentSlice.reducer