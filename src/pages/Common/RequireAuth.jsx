import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const location = useLocation();
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    const role = localStorage.getItem('role')
    return (
        isAuthenticated
            ? <Outlet />
            : <Navigate to="/auth/login" state={{ from: location }}/>
    );
}

export default RequireAuth;