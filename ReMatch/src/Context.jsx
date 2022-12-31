



// -=-=-=-=-=-=- !!! THIS FILE IS ONLY MEANT TO SERVE AS AN EXAMPLE OF HOW TO USE REACT CONTEXT API !!! -=-=-=-=-=-=- //


// React
import React, { useContext, useState } from 'react'

// Firebase
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from './firebase'

import { useAuthState } from 'react-firebase-hooks/auth'



/* COLLECTIONS */
const Messages      = collection(db, 'Messages')
const Students      = collection(db, 'Students')
const Faculty       = collection(db, 'Faculty')
const Applications  = collection(db, 'Applications')
const Projects      = collection(db, 'Projects')

/* CONTEXTS */
const MessagesContext     = React.createContext()
const StudentsContext     = React.createContext()
const FacultyContext      = React.createContext()
const ApplicationsContext = React.createContext()
const ProjectsContext     = React.createContext()


/* GET/SET FUNCTIONS */
export function useMessages() {
  return useContext(MessagesContext)
}
export function useStudents() {
  return useContext(StudentsContext)
}
export function useFaculty() {
  return useContext(FacultyContext)
}
export function useApplications() {
  return useContext(ApplicationsContext)
}
export function useProjects() {
  return useProjects(ProjectsContext)
}


export const FirestoreProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth)
  const [messages, setMessages] = useState(['test'])
  const [students, setStudents] = useState(['test'])
  const [faculty, setFaculty] = useState(['test'])
  const [applications, setApplications] = useState(['test'])
  const [projects, setProjects] = useState(['test'])

  
  return (
    <MessagesContext.Provider value={ messages }>
      <StudentsContext.Provider value={ students }>
        <FacultyContext.Provider value={ faculty }>
          <ApplicationsContext.Provider value={ applications }>
            <ProjectsContext.Provider value={ projects }>
              { children }
            </ProjectsContext.Provider>
          </ApplicationsContext.Provider>
        </FacultyContext.Provider>
      </StudentsContext.Provider>
    </MessagesContext.Provider>
  )
}



// function toggleTheme() {
//   setDarkTheme(prevTheme => {
//     return {
//       ...prevTheme, 
//       a: {
//         ...prevTheme.a, 
//         b: 'Jeff Smith'
//       }
//     }
//   })
// }
