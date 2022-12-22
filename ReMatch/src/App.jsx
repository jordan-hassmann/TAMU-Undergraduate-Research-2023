import { Route, Routes, Navigate, Outlet } from 'react-router-dom'

// Pages
import LoginPage from './Pages/LoginPage'
import LoadingPage from './Pages/LoadingPage'
import Navbar from './Components/Navbar'
import HomePage from './Pages/HomePage'
import PageNotFound from './Components/PageNotFound'
import Error404 from './Pages/404'
import ApplicationsPage from './Pages/ApplicationsPage'
import { ProtectedRoute } from './Components/ProtectedRoute'

// Styles
import './App.scss'


// Iconography
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHippo } from '@fortawesome/free-solid-svg-icons'
library.add(faHippo)




const ContentWrapper = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}


function App() {

  let user = true

  return (
    <>
      <Routes>

        {/* -=-=- Login -=-=- */}
        <Route path='/login' element={ <LoginPage /> } />



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

          <Route path='/applications' element={
            <ProtectedRoute user={ user }>
              <ApplicationsPage />
            </ProtectedRoute>
          } />

          <Route path='/loading' element={ <LoadingPage /> } />



          {/* -=-=- Default Route -=-=- */}
          <Route path='/404' element={ <Error404 /> } />
          <Route path='*' element={ <PageNotFound /> } />
        </Route>

      </Routes>
    </>
  )
  
}

export default App
