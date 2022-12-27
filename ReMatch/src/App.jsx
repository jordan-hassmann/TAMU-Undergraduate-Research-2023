import { Route, Routes, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

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

import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

// Styles
import './App.scss'


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









const ContentWrapper = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}


function App() {
  const navigate = useNavigate()
  const [user, loading, error] = useAuthState(auth)
  
  useEffect(() => {
    if (loading) navigate('/loading')
    if (!loading && user) navigate('/')
    if (!loading && !user) navigate('/login')
    if (error) console.error(error)
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
            <ContentWrapper />
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
