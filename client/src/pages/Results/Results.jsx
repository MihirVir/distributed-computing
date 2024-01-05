import React, {useState, useEffect} from 'react';
import Navigator from '../../components/Navigator/Navigator';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ResultBar from '../../components/ResultBar/ResultBar';
import CardResult from '../../components/CardResult/CardResult';
import {
  setData
} from "../../state/user/user_slice";
import "./results.css";

const Results = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(false);
  const searchResults = useSelector((state) => state.search.searchResults);
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost/api/v1/user/current-user")

      dispatch(setData(res.data));

      setUser(true);
    }catch(err) {
      console.log(err);
    }
  }  
  useEffect(() => {
    fetchUser();
  }, []) 
  return (
    <>
        <header className = "results-header">
            <Navigator user = {user}/>
        </header>
        <main className = "results-main">
          <div className= "result-main-wrapper" >
            <ResultBar searchResults = {searchResults}/>
            <CardResult searchResults = {searchResults}/>
          </div>
        </main>
    </>
  )
}

export default Results