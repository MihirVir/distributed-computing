import React, {useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const AuthRegister = () => {
  const history = useNavigate();
  const [isText, setIsText] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const res = await axios.post("http://localhost/api/v1/user/register", {
            name: name,
            email: email,
            password: password
        })

        if (res.status === 201 || res.status === 200) {
            toast.success("Sent an email to your account click the link to activate it", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1900
            })
            setIsLoading(false)
            setTimeout(() => {
                history("/login")
            }, 2100)
        }
    } catch (err) {
        setIsLoading(false)
        console.log(err);
        toast.error("Error register the user or user already exists", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        })
    }
  }
  
  return (
    <>
        <div className="auth-card-comp">
            <ToastContainer />
            <h2>Register</h2>
            <form className = "register-auth-form" onSubmit={handleSubmit}>
                <input onChange = {(e) => setName(e.target.value)} className = "auth-text" type="text" value = {name} name="" id="" placeholder = "name"/>
                <input onChange = {(e) => setEmail(e.target.value)} className = "auth-text" type="email" value = {email} name="" id="" placeholder = "email" />
                <div className = "pass">
                    <input onChange = {(e) => setPassword(e.target.value)} value = {password} className = "auth-text" type= {isText ? "text" : "password"} name="" id="" placeholder='password'/>
                    <span onClick = {() => setIsText(!isText)} className = "eye-icon">
                        {isText ? <FaRegEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <button disabled = {isLoading} className = "register-btn">
                    {isLoading ? <LoadingSpinner /> : "REGISTER"}
                </button>
            </form>
        </div>
    </>
  )
}

export default AuthRegister