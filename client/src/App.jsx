import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
import "./app.css"
import Home from './pages/Home/Home'
import Results from './pages/Results/Results'

const App = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route exact path = "/" element = {<Home/>}/>
                <Route exact path = "/results" element = {<Results />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App