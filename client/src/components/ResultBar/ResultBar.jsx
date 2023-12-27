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
  const { searchResults } = props;
//   const searchResults = [
//   {
//     dest: {
//       id: 'CHN',
//       name: 'China'
//     },
//     flights: [
//       {
//         airline: 'lol1',
//         flight_no: 'lol1'
//       },
//       {
//         airline: 'lol2',
//         flight_no: 'lol2'
//       },
//     ],
//     layover: {
//       id: 'IRL',
//       name: 'Ireland'
//     },
//     price: 700,
//     src: {
//       id: 'IND',
//       name: 'India'
//     },
//     type: 'layover'
//   }, {
//     dest: {
//       id: 'CHN',
//       name: 'China'
//     },
//     flights: [
//       {
//         airline: 'lol1',
//         flight_no: 'lol1'
//       },
//       {
//         airline: 'lol2',
//         flight_no: 'lol2'
//       },
//     ],
//     layover: {
//       id: 'IRL',
//       name: 'Ireland'
//     },
//     price: 700,
//     src: {
//       id: 'IND',
//       name: 'India'
//     },
//     type: 'layover'
//   }
// ]
  // const {searchResults} = props;
  console.log(`src id = ${searchResults[0].src.id}`)
  console.log(`flights = ${searchResults[0].flights}`)
  console.log(`type = ${searchResults[0].type}`)
  const handleOptionSelected = (e) => {
    dispatch(setSortOption(e.target.value));
  }

  return (
    <div className="result-bar-container">
        <div className="search-information">
          <div className="search-container">
            <span style = {{fontSize: "1.2rem", marginRight: "10px"}}>{searchResults[0].src.name}</span>
            <span style={{fontSize: "1.2rem", marginRight: "10px"}}>-</span>
            <span style = {{fontSize: "1.2rem"}}>{searchResults[0].dest.name}</span>
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