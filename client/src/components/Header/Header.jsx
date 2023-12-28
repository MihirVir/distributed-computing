import React from 'react'
import { useSelector } from 'react-redux';
import "./header.css"

const Header = (props) => {
    const name = useSelector((state) => state.user.name)
    const email = useSelector((state) => state.user.email)
    const {user} = props;
    return (
        <>
            <nav className = "nav">
                <div className = "logo">
                    BOOKER
                </div>
                <ul className = "nav-links">
                    {user ? (
                        <>
                            <li>{name}</li> 
                        </>
                    ) : (
                        <>
                            <li>Register</li>
                            <li>Login</li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
}

export default Header