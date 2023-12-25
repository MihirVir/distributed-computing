import React from 'react';
import Navigator from '../../components/Navigator/Navigator';
import "./results.css";
import { FaSearch } from "react-icons/fa";
import { useSelector } from 'react-redux';
import ResultBar from '../../components/ResultBar/ResultBar';
// searchResults: [
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
//       }
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
// ],
const Results = () => {
  const searchResults = useSelector((state) => state.search.searchResults);
  console.log(searchResults);
  
  return (
    <>
        <header className = "results-header">
            <Navigator />
        </header>
        <main className = "results-main">
          <ResultBar searchResults = {searchResults}/>
          {/* {
            searchResults.length > 0 ? searchResults.map((item, idx) => {
              return (
                <>
                  <p>{item.src.id}</p> 
                </>
              )
            }) : (
              <>
                <p>No Results</p>
              </>
            )
          } */}
        </main>
    </>
  )
}

export default Results