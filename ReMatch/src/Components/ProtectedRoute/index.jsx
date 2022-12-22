import { Navigate } from 'react-router-dom';



const ProtectedRoute = ({
    user,
    redirectPath = '/login',
    children,
}) => {

    return !user
    ? <Navigate to={redirectPath} replace />
    : children

};



export { ProtectedRoute };
