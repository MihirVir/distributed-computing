import React from 'react'
import "./search.css"
const Search = () => {
  return (
    <div className = "airplane-container">
        <div className = "image-container">
            <img className = "plane-img" src="/airplane.png" alt="" />
        </div>
        <div className="search-bar-container">
            <form className = "search-form">
                <input className = "text-field" style ={{marginRight: "1.2%"}} type="text" placeholder='From'/>
                <input className = "text-field" type="text" placeholder='To'/>
                <button className='submit-btn'>Search</button>
            </form>
        </div>
    </div>
  )
}

export default Search