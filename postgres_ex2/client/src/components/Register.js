import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";  
import {AuthProvider} from "@context/AuthContext";


export default function Register() {
    const [body, setBody] = useState({
        email:"",
        password:"",
        username:"",
    });
    const navigate = useNavigate();
    
    const setAuth = useContext(AuthProvider);
    const handleChangeInput = (event) => {
        setBody(body => ({
            ...body,
            [event.target.name]: event.target.value,
        }))
    }

    const onFinish = async(event) => {
        event.preventDefault();
        try {
            const response =
                await fetch(
                    "http://localhost:5001/auth/register",
                    {
                        method:"POST",
                        headers: {
                            "Content-type":"application/json"
                        },
                        body: JSON.stringify(body)
                    }
                );
                const {jwtToken} = await response.json();
            if(jwtToken) {
                localStorage.setItem("Token",jwtToken);
                setAuth(true);
                toast.success("Register Successfully!");
                navigate("/dashboard")
            }
            else {
                toast.error("Failed to Register!")
            }
        } catch (error) {
            console.error(error?.message);
        }
    }

    return (
        <div className="container">
        <h1 className="mt-4" style={{
            textAlign:"center"
        }}>
            REGISTER
        </h1>
        <form className="mt-4 mb-3" onSubmit={onFinish}>
            <div className="form-group">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control" 
                    placeholder="Enter email" 
                    name="email"
                    onChange={handleChangeInput}
                    value={body?.email}
                />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control" 
                    placeholder="Enter username" 
                    name="username"
                    onChange={handleChangeInput}
                    value={body?.username}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Password" 
                    name="password"
                    onChange={handleChangeInput}
                    value={body?.password}
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <Link to="/login">Login</Link>
        </div>
    )
}