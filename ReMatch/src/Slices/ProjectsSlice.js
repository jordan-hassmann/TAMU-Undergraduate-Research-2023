import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: [],
  loaded: false,
}

export const projectsSlice = createSlice({
  name: 'projects', 
  initialState,
  reducers: {
    addProjects: (state, action) => {
      state.values = [...state.values, ...action.payload]
      state.loaded = true
    },
    clearProjects: state => {
      state.values = []
      state.loaded = false
    }
  }
})


export const { addProjects, clearProjects } = projectsSlice.actions
export default projectsSlice.reducer