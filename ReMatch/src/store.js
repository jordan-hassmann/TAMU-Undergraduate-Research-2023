

import { configureStore } from '@reduxjs/toolkit'

import messagesReducer from './Slices/MessagesSlice'
import chatsReducer from './Slices/ChatsSlice'
import studentReducer from './Slices/StudentSlice'
import facultyReducer from './Slices/FacultySlice'
import applicationsReducer from './Slices/ApplicationsSlice'
import projectsReducer from './Slices/ProjectsSlice'


export default configureStore({
  reducer: {
    messages: messagesReducer,
    chats: chatsReducer,
    student: studentReducer,
    faculty: facultyReducer,
    applications: applicationsReducer,
    projects: projectsReducer,
  }
})