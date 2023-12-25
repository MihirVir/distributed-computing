import {useEffect} from 'react'
import "./secondsearch.css"
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    setSelected,
    setStart,
    setEnd,
    setFrom,
    setTo,
    setFromResults,
    setToResults,
    fetchData,
    clearFromResults,
    clearToResults,
    submitForm,
    setFromResultsActive, 
    setToResultsActive
  } from "../../state/search/search_slice";
import Loading from '../Loading/Loading';
const SecondSearch = () => {
    const history = useNavigate();
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
    const fromResultsActive = useSelector((state) => state.search.fromResultsActive);
    const toResultsActive = useSelector((state) => state.search.toResultsActive);
    const searchLoading = useSelector((state) => state.search.searchLoading);
    useEffect(() => {
        dispatch(fetchData());
    },[])

    useEffect(() => {
        findFromData()
    }, [from]);

    useEffect(() => {
        findToData();
    }, [to]);

    
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

    const handleClick = (val) => {
        dispatch(setSelected(val));
        val === "round" ? dispatch(setRound(true)) : dispatch(setRound(false));
    }

    const handleFromResultsClick = (item) => {
        dispatch(clearFromResults())
        dispatch(setFrom(item));
        dispatch(setFromResults(false));
    }

    const handleToResultsClick = (item) => {
        dispatch(clearToResults())
        dispatch(setTo(item));
        dispatch(setToResultsActive(false));
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const source = from;
            const destination = to;
            dispatch(submitForm({source, destination, history}))  

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {searchLoading && <Loading />}
            <div className = "second-search-container">
                <h1>Thousands of cheap flights. One simple search</h1>
                <div className = "search-options">
                    <p onClick={() => handleClick("one")}  className = {`option ${selected === "one" && "active"}`}>One Way</p>
                    <p onClick = {() => handleClick("round")} className = {`option ${selected === "round" && "active"}`}>Round Trip</p>
                </div>
                <div className="search-form-container">
                    <form onSubmit = {handleSubmit} className = "search-form">                
                        <div className = "search-text-field-container">
                            <label className = "search-text-label">From</label>
                            <input onChange = {(e) => {dispatch(setFrom(e.target.value)); dispatch(setFromResultsActive(true))}} value = {from} required type="text" className = "search-text" placeholder='current location'/>
                        </div>
                        {(fromResults.length > 0 && fromResultsActive) && (<div className="results-container">
                            {fromResults.map((item, idx) => {
                                return (
                                    <>
                                        <p onClick = {() => handleFromResultsClick(item)} key = {idx} className="results">{item}</p>
                                    </>
                                )
                        })}
                        </div>)}
                        
                        <div className="search-text-field-container no-border-radius">
                            <label className = "search-text-label">To</label>
                            <input onChange = {(e) => {dispatch(setTo(e.target.value)); dispatch(setToResultsActive(true))}} value = {to} required type="text" className = "search-text" placeholder='Destination'/>
                        </div>
                        {(toResults.length > 0 && toResultsActive) && (<div className="results-container left">
                            {toResults.map((item, idx) => {
                                return (
                                    <>
                                        <p onClick = {() => handleToResultsClick(item)} key = {idx} className = "results">{item}</p>
                                    </>
                                )
                            })}
                        </div>)}
                        
                        <div className = "search-text-field-container no-border-radius" >
                            <label className = "search-text-label">
                                Depart
                            </label>
                            <input required type="date" />
                        </div>  
                        {round && <div className = "search-text-field-container border-right-radius" >
                            <label className = "search-text-label">
                                Arrival
                            </label>
                            <input type="date" />
                        </div>}
                        <button className = "search-btn">Search</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SecondSearch