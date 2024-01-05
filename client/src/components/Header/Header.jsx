import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import "./header.css"

const Header = (props) => {
    const history = useNavigate();
    const name = useSelector((state) => state.user.name)
    const email = useSelector((state) => state.user.email)
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
            <ToastContainer/>
            <nav className = "nav">
                <div className = "logo">
                    BOOKER
                </div>
                <ul className = "nav-links">
                    {user ? (
                        <>
                            <li>{name}</li> 
                            <li>
                                <button onClick = {logout} className = "logout-btn">Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link className = "nav-links-li" to={"/register"}>
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link className = "nav-links-li" to = {"/login"}>
                                    Login
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
}

export default Header