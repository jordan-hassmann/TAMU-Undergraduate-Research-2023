import { Route, Routes, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


// Pages
import LoginPage from './Pages/LoginPage'
import LoadingPage from './Pages/LoadingPage'
import Navbar from './Components/Navbar'
import HomePage from './Pages/HomePage'
import PageNotFound from './Components/PageNotFound'
import Error404 from './Pages/404'
import ApplicationsPage from './Pages/ApplicationsPage'
import MessagingPage from './Pages/MessagingPage'
import ProfilePage from './Pages/ProfilePage'
import { ProtectedRoute } from './Components/ProtectedRoute'

import { auth, db } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

// Styles
import './App.scss'

// Firebase
import { onSnapshot, collection, doc, query, where, getDocs, getDoc, orderBy } from 'firebase/firestore'
import { addMessages } from './Slices/MessagesSlice'
import { addChats } from './Slices/ChatsSlice'
import { updateStudent } from './Slices/StudentSlice'
import { addApplications } from './Slices/ApplicationsSlice'
import { addFaculty } from './Slices/FacultySlice'
import { addProjects } from './Slices/ProjectsSlice'


// Iconography
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faHippo, 
  faCircleUser, 
  faMagnifyingGlass, 
  faEllipsisVertical,
  faPaperPlane,
  faPaperclip,
  faChevronRight,
  faMessage,
  faFileSignature,
  faStar, 
  faThumbsUp,
  faXmark,
  faPlus,
  faCheck,
  faChevronUp, 
  faTrash, 
  faPlusMinus, 
  faDiagramProject,
  faArrowTurnUp,
  faPenToSquare,
  faChevronDown,
  faCircleCheck,
  faCircle,
  faCircleXmark,
  faSliders,
  faDollarSign,
  faArrowUpFromBracket,
  faQuestionCircle,
  faCloudDownload,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons'
library.add(
  faHippo, 
  faCircleUser, 
  faMagnifyingGlass, 
  faEllipsisVertical,
  faPaperPlane,
  faPaperclip,
  faChevronRight,
  faMessage,
  faFileSignature,
  faStar, 
  faThumbsUp,
  faXmark,
  faPlus,
  faCheck,
  faChevronUp, 
  faTrash, 
  faPlusMinus,
  faDiagramProject,
  faArrowTurnUp,
  faPenToSquare,
  faChevronDown,
  faCircleCheck,
  faCircle,
  faCircleXmark,
  faSliders,
  faDollarSign,
  faArrowUpFromBracket,
  faQuestionCircle,
  faCloudDownload,
  faLayerGroup,
)








const separate = changes => {
  const docs = { added: [], updated: [], removed: [] }
  changes.forEach(change => docs[change.type].push({ id: change.doc.id, ...change.doc.data() }))
  return docs 
}


const ContentWrapper = ({ user }) => {
  const dispatch = useDispatch()
  const messagesLoaded      = useSelector(state => state.messages.values.length > 0)
  const chatsLoaded         = useSelector(state => state.chats.values.length > 0)
  const applicationsLoaded  = useSelector(state => state.applications.values.length > 0)
  const projectsLoaded      = useSelector(state => state.projects.values.length > 0)
  const studentLoaded       = useSelector(state => state.student.student.id)


  useEffect(() => {
    const unsubFunctions = []
    
    async function init(user) {


      // Get all faculty
      const facultySnapshot = await getDocs(collection(db, 'Faculty'))
      const faculty = {}
      facultySnapshot.forEach(doc => faculty[doc.id] = { ...doc.data(), id: doc.id })
      dispatch(addFaculty(faculty))

      // Get logged in student
      const student = await getDoc(doc(db, 'Students', user.uid))
      const studentName = student.data().firstname + ' ' + student.data().lastname
      dispatch(updateStudent({ ...student.data(), id: student.id }))


      // Listen to message updates for current student
      const messagesQuery = query(collection(db, 'Messages'), where('studentID', '==', user.uid), orderBy('timestamp', 'asc'))
      const unsubMessages = onSnapshot(messagesQuery, snapshot => {  

        const docs = snapshot.docChanges().map(change => ({ 
          ...change.doc.data(), 
          id: change.doc.id, 
          sender: user.uid === change.doc.data().senderID ? studentName : faculty[change.doc.data().senderID],
          timestamp: change.doc.data().timestamp.seconds 
        }))
        dispatch(addMessages(docs))

      })


      // Listen to chat updates for current student
      const chatsQuery = query(collection(db, 'Chats'), where('studentID', '==', user.uid))
      const unsubChats = onSnapshot(chatsQuery, snapshot => {

        const docs = snapshot.docChanges().map(change => ({ 
          ...change.doc.data(), 
          id: change.doc.id, 
        }))
        dispatch(addChats(docs))

      })


      // Listen to projects for current student 
      const applicationsQuery = query(collection(db, 'Applications'), where('studentID', '==', user.uid))
      const unsubApplications = onSnapshot(applicationsQuery, snapshot => {

        const docs = snapshot.docChanges().map(change => ({ 
          ...change.doc.data(), 
          id: change.doc.id, 
        }))
        dispatch(addApplications(docs))

      })


      // Listen to projects for current student 
      const unsubProjects = onSnapshot(collection(db, 'Projects'), snapshot => {

        const docs = snapshot.docChanges().map(change => ({ 
          ...change.doc.data(), 
          id: change.doc.id, 
          timestamp: change.doc.data().timestamp.seconds 
        }))
        dispatch(addProjects(docs))

      })


      // Add the unsubscribe functions 
      unsubFunctions.push(unsubMessages, unsubChats, unsubApplications, unsubProjects)
    }


    init(user)


    return () => {
      unsubFunctions.forEach(unsub => unsub())
    }
  }, [])


  return (
    <>
      {/* { messagesLoaded && chatsLoaded && applicationsLoaded && projectsLoaded && studentLoaded && <Navbar />} */}
      <Navbar />
      <Outlet />
    </>
  )
}


function App() {
  const navigate = useNavigate()
  const [user, loading, error] = useAuthState(auth)
  
  
  useEffect(() => {
    if (error) console.error(error)
    if (loading) navigate('/loading')
    if (!loading && user) navigate('/')
    if (!loading && !user) navigate('/login')
  }, [user, loading])
  

  return (
    <>
      <Routes>

        {/* -=-=- Login -=-=- */}
        <Route path='/login' element={ <LoginPage /> } />
        <Route path='/loading' element={ <LoadingPage /> } />


        {/* -=-=- Primary Routes -=-=- */}
        <Route element={ 
          <ProtectedRoute user={ user }>
            <ContentWrapper user={ user } />
          </ProtectedRoute>
        }>
          <Route index element={ 
            <ProtectedRoute user={ user }>
              <HomePage />
            </ProtectedRoute>
          } />

          <Route path='/messaging' element={
            <ProtectedRoute user={ user }>
              <MessagingPage />
            </ProtectedRoute>
          } />

          <Route path='/applications' element={
            <ProtectedRoute user={ user }>
              <ApplicationsPage />
            </ProtectedRoute>
          } />

          <Route path='/profile' element={
            <ProtectedRoute user={ user }>
              <ProfilePage />
            </ProtectedRoute>
          } />

          


          {/* -=-=- Default Route -=-=- */}
          <Route path='/404' element={ <Error404 /> } />
          <Route path='*' element={ <PageNotFound /> } />
        </Route>

      </Routes>
    </>
  )
  
}

export default App
