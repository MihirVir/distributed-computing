import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
import "./app.css"
import Home from './pages/Home/Home'

const App = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route exact path = "/" element = {<Home/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App