import { Navigate } from 'react-router-dom';


const PageNotFound = () => {
  return (
    <Navigate to='/404' replace />
  )
}

export default PageNotFound