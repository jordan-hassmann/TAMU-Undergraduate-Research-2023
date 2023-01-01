import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: []
}

export const projectsSlice = createSlice({
  name: 'projects', 
  initialState,
  reducers: {
    addProjects: (state, action) => {
      state.values = [...state.values, ...action.payload]
    },
    clearProjects: state => {
      state.values = []
    }
  }
})


export const { addProjects, clearProjects } = projectsSlice.actions
export default projectsSlice.reducer