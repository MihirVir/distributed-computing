import React, {useEffect, useState} from 'react'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import {
  setSelected,
  setStart,
  setEnd,
  setFrom,
  setTo,
  setFromResults,
  setToResults,
  setResults,
  fetchData,
  clearFromResults,
  clearToResults
} from "../../state/search/search_slice";
import "./search.css"

const Search = () => {
  const dispatch = useDispatch();

  const selected = useSelector((state) => state.search.selected);
  const start = useSelector((state) => state.search.start);
  const round = useSelector((state) => state.search.round);
  const end = useSelector((state) => state.search.end);
  const from = useSelector((state) => state.search.from);
  const to = useSelector((state) => state.search.to);
  const fromResults = useSelector((state) => state.search.fromResults);
  const toResults = useSelector((state) => state.search.toResults);
  const results = useSelector((state) => state.search.results);
  
  const handleChange = (e) => {
    dispatch(setSelected(e.target.value));
    e.target.value === "round" ? dispatch(setRound(true)) : dispatch(setRound(false));
  }

  useEffect(() => {
    dispatch(fetchData());
  }, [])

  useEffect(() => { 
    findFromData()
  }, [from])

  useEffect(() => {
    findToData()
  }, [to])

  const findFromData = () => {
    if (from.trim() !== '' && fromResults.length === 0) {
      const from_res = results.src.filter(item =>
        item.toLowerCase().includes(from.toLowerCase())
      );
      dispatch(setFromResults(from_res));
    } else {
      dispatch(setFromResults([])); 
    }
  };
  const findToData = () => {
    if (to.trim() !== '' && toResults.length === 0) {
      const to_res = results.dest.filter(item =>
        item.toLowerCase().includes(to.toLowerCase())
      );
      dispatch(setToResults(to_res));
    } else {
      dispatch(setToResults([])); 
    }
  }


  const handleFromClick = (item) => {
    dispatch(setFrom(item))
    dispatch(clearFromResults())
  }

  const handleToClick = (item) => {
    dispatch(setTo(item))
    dispatch(clearToResults())
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
                    <input onChange = {(e) => dispatch(setFrom(e.target.value))} value = {from} className = "text-field" style ={{marginRight: "1.2%"}} type="text" placeholder='From'/>
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
                    <input onChange = {(e) => dispatch(setTo(e.target.value))}  value = {to} className = "text-field" type="text" placeholder='To'/>
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
                  <input onChange = {(e) => dispatch(setStart(e.target.value))} value = {start} className = "date" type="date" />
                  
                  {round === true && (
                    <>
                      <div className='labeller'>
                        Arrival Date
                      </div>
                      <div>
                      </div>
                        <input onChange = {(e) => dispatch(setEnd(e.target.value))} value = {end} className = "date" type="date" />
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