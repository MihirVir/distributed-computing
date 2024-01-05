import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./navigator.css"
const Navigator = (props) => {
    const history = useNavigate();
    const name = useSelector((state) => state.user.name)
    const {user} = props;
    const logout = async () => {
        try {
            const res = await axios.post("/api/v1/user/logout")
            toast.success("successfully logged out", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000
            })

            setTimeout(() => {
                history("/login")
            }, 2200)
        } catch (err) {
            console.log(err);
            toast.error("error logging in", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000
            })
        }
    }

    return (
        <>
            <ToastContainer />
            <nav className = "navigator">
                <div className="site-logo">
                    <h2>
                        Booker
                    </h2>
                </div>
                <ul className="links">
                    {user ? (
                        <>
                            <li>{name}</li>
                            <li>
                                <button onClick = {logout} className="logout-btn">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link className = "nav-links-li" to = {"/register"}>
                                    register
                                </Link>
                            </li>
                            <li>
                                <Link className = "nav-links-li" to = {"/login"}>
                                    login
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
  )
}

export default Navigator