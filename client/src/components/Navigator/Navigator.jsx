import React from 'react'
import "./navigator.css"
const Navigator = () => {
  return (
    <nav className = "navigator">
        <div className="site-logo">
            <h2>
                Booker
            </h2>
        </div>
        <ul className="links">
            <li>
                Signin
            </li>
            <li>
                Signup
            </li>
        </ul>
    </nav>
  )
}

export default Navigator