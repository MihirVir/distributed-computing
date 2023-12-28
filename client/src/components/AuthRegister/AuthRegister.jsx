import React, {useState} from 'react'
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import "./index.css"

const AuthRegister = () => {
  const [isText, setIsText] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    try {
        /**
         * handle submit logic
         */
    } catch (err) {
        console.log(err);
    }
  }
  console.log(name + " " + email + " " + password);
  return (
    <>
        <div className="auth-card-comp">
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
                <button className = "register-btn">REGISTER</button>
            </form>
        </div>
    </>
  )
}

export default AuthRegister