import { useContext } from "react";
import { toast } from "react-toastify";

import {AuthProvider} from "@src/Context/AuthContext";
import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {

    const setAuth = useContext(AuthProvider);

    const handleLogout = () => {
        try {
            localStorage.removeItem("Token");
            setAuth(false);
            toast.success("Logout success!");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <div className="mb-4">
                <nav>
                    <NavLink className="p-3" to="/dashboard">Dashboard</NavLink>
                    <NavLink className="p-3" to="/my-work">My work</NavLink>
                    <NavLink className="p-3" to="/about">About</NavLink>
                    <NavLink className="p-3" to="/contact">Contact</NavLink>
                </nav>
            </div>
            <Outlet/>
            <button
                className="btn btn-primary"
                onClick={handleLogout}
            >LOGOUT</button>
        </div>
    )
}