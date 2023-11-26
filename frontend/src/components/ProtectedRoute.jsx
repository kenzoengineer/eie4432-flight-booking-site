import { Navigate } from "react-router-dom";
import { getLoggedInUser, isAdmin } from "../js/utils"
import { useEffect, useState } from "react";

const ProtectedRoute = ({admin, children}) => {
    const [adminStatus, setAdminStatus] = useState(false);
    useEffect(() => {
        const fetchAdminStatus = async () => {
            setAdminStatus(isAdmin());
        }
        fetchAdminStatus();
    }, []);
    if (!getLoggedInUser()) {
        return <Navigate to="/login" replace/>
    }
    if (admin && !adminStatus) {
        return <Navigate to="/flights" replace/>
    }
    return children;
}

export default ProtectedRoute