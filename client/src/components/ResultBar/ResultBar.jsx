import React from 'react'
import axios from 'axios'; // 引入 axios
import { FaSearch } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import {
  setSortOption,
  clearSortOption
} from "../../state/filter/filter_slice"
import { setOrderData, clearOrderData } from '../../state/order/order_slice'; // 引入这些动作
import "./resultbar.css"

const ResultBar = (props) => {
  const dispatch = useDispatch();
  const sort_by = useSelector((state) => state.filter.sort_by);
  const { searchResults } = props;
  const createOrder = (userId, flightMap) => async (dispatch) => {
    try {
      // API request to create the order
      const response = await axios.post('http://localhost/broker_service/api/v1/order/create', {
        userId,
        flightMap
      });
  
      // Check if the response is successful
      if (response.data.code === "200") {
        // Dispatch the setOrderData action to update the Redux store
        dispatch(setOrderData(response.data.result));
      } else {
        // Handle non-successful responses
        console.error('Order creation failed:', response.data.message);
        dispatch(clearOrderData());
      }
    } catch (error) {
      // Handle any errors during the API call
      console.error('Error creating order:', error);
      dispatch(clearOrderData());
    }
  }
  
  const handleOptionSelected = (e) => {
    dispatch(setSortOption(e.target.value));
  }

  return (
    <div className="result-bar-container">
        <div className="search-information">
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