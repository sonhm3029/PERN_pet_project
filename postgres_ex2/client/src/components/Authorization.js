import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";

export default function Authorization({isAuth}) {
    console.log("isAuth",isAuth);
    return (
        isAuth?(<Outlet/>):(<Navigate to="/login"/>)
    )
}

// export default function ProtectedRoute({isAuth, children}) {
//     if(isAuth) {
//         return children;
//     }
//     else {
//         return <Navigate to="/login"/>;
//     }
// }