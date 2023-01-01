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
    clearStudent: state => {
      state.student = {...initialState}
    }
  }
})


export const { updateStudent, clearStudent } = studentSlice.actions
export default studentSlice.reducer