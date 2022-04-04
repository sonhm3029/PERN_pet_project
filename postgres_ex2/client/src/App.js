import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Authorization from "./components/Authorization";
import About from "./components/About";
import {
  Routes,
  Route,
  useNavigate,
  Outlet
} from "react-router-dom";
import {
  useState,
  useEffect
} from "react";
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@context/AuthContext";
import ProtectedRoute from "./components/Authorization";

toast.configure();


function App() {

  const [isAuth, setAuth] = useState(false);
  const navigate = useNavigate();
  const checkAuth = async() => {
    try {
      const res = await fetch("http://localhost:5001/auth/verify", {
        method: "POST",
        headers: { Authorization: localStorage.Token }
      });
      const parseRes = await res.json();
      console.log("Auth", isAuth);
      parseRes === true ? setAuth(true) : setAuth(false);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(()=> {
    checkAuth();
  },[])

  return (
    <AuthProvider value={setAuth}>
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route element={<Authorization isAuth={isAuth}/>}>
          <Route path="/dashboard" element={<Dashboard/>}>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="about" element={<About/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
    </AuthProvider>
  );
}


export default App;
