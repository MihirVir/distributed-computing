import React, {useState} from 'react'
import "./search.css"
const Search = () => {
  const [selected, setSelected] = useState("one");

  const handleChange = (e) => {
    console.log(e.target.value);
    setSelected(e.target.value);
  }

  return (
    <div className = "airplane-container">
        <div className = "image-container">
            <img className = "plane-img" src="/airplane.png" alt="" />
        </div>
        <div className="search-bar-container">
            <form className = "search-form">
                <div className = "radio">
                    <label style = {{marginRight: "1rem"}}>
                      <input style = {{marginRight: '.5rem'}} type="radio" value="one" checked ={selected === "one"} onChange={handleChange}/>
                      One way
                    </label>
                    <label>
                      <input style = {{marginRight: ".5rem"}} type="radio" value="round" checked = {selected === "round"} onChange = {handleChange}/>
                      Round Trip
                    </label>
                </div>

                <div className = "input-fields">
                  <input className = "text-field" style ={{marginRight: "1.2%"}} type="text" placeholder='From'/>
                  <input className = "text-field" type="text" placeholder='To'/>
                </div>

                <button className='submit-btn'>Search</button>
            </form>
        </div>
    </div>
  )
}

export default Search