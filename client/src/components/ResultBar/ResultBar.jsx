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
  const handleCreateOrder = () => {
    const orderData = {
      userId: userId,
      flightMap: selectedFlights // 使用用户选择的航班信息
    };
    dispatch(createOrder(orderData));
  };
  
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
         {/* 添加创建订单的按钮 */}
      <button onClick={handleCreateOrder}>Create Order</button>
    </div>
  );
}

export default ResultBar