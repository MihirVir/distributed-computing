import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
const LoginComponent = () => {
  const history = useNavigate();
  const [isText, setIsText] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost/api/v1/user/login", {
            email: email,
            password: password
        })
        if (res.status === 200 || res.status === 201) {
            history("/")
        }
    }catch(err) {
        console.log(err);
    }
  }
  return (
   <>
        <div className="auth-card-comp">
            <h2>Login</h2>
            <form className = "register-auth-form" onSubmit={handleSubmit}>
                <input onChange = {(e) => setEmail(e.target.value)} className = "auth-text" type="email" value = {email} name="" id="" placeholder = "email" />
                <div className = "pass">
                    <input onChange = {(e) => setPassword(e.target.value)} value = {password} className = "auth-text" type= {isText ? "text" : "password"} name="" id="" placeholder='password'/>
                    <span onClick = {() => setIsText(!isText)} className = "eye-icon">
                        {isText ? <FaRegEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <button className = "register-btn">Login</button>
            </form>
        </div>
   </> 
  )
}

export default LoginComponent