import React, {useEffect, useState} from 'react'
import "./search.css"

const countries = {
  data: [
    "INDIA",
    "IRELAND",
    "UNITED KINGDOM",
    "AMERICA",
    "FINLAND",
    "CHINA",
    "THAILAND",
    "RUSSIA",
    "SINGAPORE",
    "DENMARK",
    "NORWAY",
    "SPAIN",
    "ITALY",
    "SWEDEN",
    "CANADA",
    "MEXICO",
    "AUSTRALIA",
    "NEW ZEALAND"
  ]
}

const Search = () => {
  const [selected, setSelected] = useState("one");
  const [round, setRound] = useState(false);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromResults, setFromResults] = useState([]);
  const [toResults, setToResults] = useState([]);


  const handleChange = (e) => {
    setSelected(e.target.value);
    e.target.value === "round" ? setRound(true) : setRound(false)
  }

  useEffect(() => { 
    findFromData()
  }, [from])

  useEffect(() => {
    findToData()
  }, [to])

  const findFromData = () => {
    if (from.trim() !== '' && fromResults.length === 0) {
      const from_res = countries.data.filter(item =>
        item.toLowerCase().includes(from.toLowerCase())
      );
      setFromResults(from_res);
    } else {
      setFromResults([]); 
    }
  };
  const findToData = () => {
    if (to.trim() !== '' && toResults.length === 0) {
      const to_res = countries.data.filter(item =>
        item.toLowerCase().includes(to.toLowerCase())
      );
      setToResults(to_res);
    } else {
      setToResults([]); 
    }
  }

  const handleFromClick = (item) => {
    setFrom(item)
    setFromResults([])
  }

  const handleToClick = (item) => {
    setTo(item)
    setToResults([])
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
                  <div>
                    <input onChange = {(e) => setFrom(e.target.value)} value = {from} className = "text-field" style ={{marginRight: "1.2%"}} type="text" placeholder='From'/>
                    {fromResults.length > 0 && <div className = "search-results">
                      {fromResults.length > 0 && fromResults.slice(0,7).map((item,idx) => {
                        return (
                          <>
                            <p onClick = {() => handleFromClick(item)} className = "result" style = {{cursor: "pointer", padding: "5px"}}>{item}</p>
                          </>
                        )
                      })}
                    </div>}
                  </div>
                  <div>
                    <input onChange = {(e) => setTo(e.target.value)}  value = {to} className = "text-field" type="text" placeholder='To'/>
                    {toResults.length > 0 && <div className = "search-results">
                      {toResults.length > 0 && toResults.slice(0,7).map((item,idx) => {
                        return (
                          <>
                            <p onClick = {() => handleToClick(item)} className = "result" style = {{cursor: "pointer", padding: "5px"}}>{item}</p>
                          </>
                        )
                      })}
                    </div>}
                  </div>
                </div>

                <div className="calendar-container">
                  <div className = "labeller">
                    Departure Date
                  </div>
                  <input className = "date" type="date" />
                  
                  {round === true && (
                    <>
                      <div className='labeller'>
                        Arrival Date
                      </div>
                      <div>
                        <input className = "date" type="date" />
                      </div>
                    </>
                  )}                
                </div>

                <button className='submit-btn'>Search</button>
            </form>
        </div>
    </div>
  )
}

export default Search