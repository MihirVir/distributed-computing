import React from 'react'
import "./header.css"

const Header = () => {
    return (
        <>
            <nav className = "nav">
                <div className = "logo">
                    BOOKER
                </div>
                <ul className = "nav-links">
                    <li>Signup</li>
                    <li>Signin</li>
                </ul>
            </nav>
        </>
    );
}

export default Header