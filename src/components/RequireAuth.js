import { useAuth } from '../context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({children}) => {
    const {isLoggedIn, sessionId} = useAuth();
    const location = useLocation();
    if(!isLoggedIn && !sessionId) {
       return <Navigate to="login" state={{path: location}} />
    }
    return children
}

export default RequireAuth
