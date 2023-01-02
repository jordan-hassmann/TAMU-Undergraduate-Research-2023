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
  },
  loaded: false,
}

export const studentSlice = createSlice({
  name: 'students', 
  initialState,
  reducers: {
    updateStudent: (state, action) => {
      state.student = {...action.payload}
      state.loaded = true
    },
    clearStudent: state => {
      state.student = {
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
      state.loaded = false
    }
  }
})


export const { updateStudent, clearStudent } = studentSlice.actions
export default studentSlice.reducer