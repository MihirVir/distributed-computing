import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
const LoginComponent = () => {
  const history = useNavigate();
  const [isText, setIsText] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const res = await axios.post("http://localhost/api/v1/user/login", {
            email: email,
            password: password
        })
        if (res.status === 200 || res.status === 201) {
            toast.success("successfully logged in", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000
            })
            setTimeout(() => {
                history("/")
            }, 2100)
        }
        setIsLoading(false);
    }catch(err) {
        console.log(err);
        toast.error("account is not active or account doesnt exist", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        })
        setIsLoading(false);
    }
  }
  return (
   <>
        <div className="auth-card-comp">
            <ToastContainer />
            <h2>Login</h2>
            <form className = "register-auth-form" onSubmit={handleSubmit}>
                <input onChange = {(e) => setEmail(e.target.value)} className = "auth-text" type="email" value = {email} name="" id="" placeholder = "email" />
                <div className = "pass">
                    <input onChange = {(e) => setPassword(e.target.value)} value = {password} className = "auth-text" type= {isText ? "text" : "password"} name="" id="" placeholder='password'/>
                    <span onClick = {() => setIsText(!isText)} className = "eye-icon">
                        {isText ? <FaRegEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <button disabled = {isLoading} className = "register-btn">
                    {isLoading ? <LoadingSpinner /> : "Login"}
                </button>
            </form>
        </div>
   </> 
  )
}

export default LoginComponent