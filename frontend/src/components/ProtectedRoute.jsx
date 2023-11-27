// Ken Jiang - 23012932X | Anson Yuen - 23012962X
import { Navigate } from "react-router-dom";
import { getLoggedInUser, isAdmin } from "../js/utils"
import { useState } from "react";

const ProtectedRoute = ({admin, children}) => {
    const [adminStatus,] = useState(isAdmin());

    if (!getLoggedInUser()) {
        return <Navigate to="/login" replace/>
    }
    if (admin && !adminStatus) {
        return <Navigate to="/flights" replace/>
    }
    return children;
}

export default ProtectedRoute