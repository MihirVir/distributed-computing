import React from 'react'
import { FaSearch } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import {
  setSortOption,
  clearSortOption
} from "../../state/filter/filter_slice"
import "./resultbar.css"

const ResultBar = (props) => {
  const dispatch = useDispatch();
  const sort_by = useSelector((state) => state.filter.sort_by);
  const {searchResults} = props;
  
  const handleOptionSelected = (e) => {
    dispatch(setSortOption(e.target.value));
  }

  return (
    <div className="result-bar-container">
        <div className="search-information">
          <div className="search-container">
            <div className="source">
              <span style = {{fontSize: "1rem"}}>{searchResults[0].src.name}</span>
            </div>
            <span style={{fontSize: "1rem"}}>-</span>
            <div className="destination">
              <span style = {{fontSize: "1rem"}}>{searchResults[0].dest.name}</span>
            </div>
          </div>
          <div className="filter-container">
            <select onChange = {handleOptionSelected} className = "custom-select" id="options">
              <option value="">Sort by</option>
              <option value="ascending">Price: Low - High</option>
              <option value="descending">Price: High - Low</option>
              <option value="rating-descending">Rating: Best</option>
              <option value="rating-ascending">Rating: Worst</option>
            </select>
          </div>
        </div>
    </div>
  );
}

export default ResultBar