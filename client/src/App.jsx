import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
import Home from './pages/Home/Home'
import Results from './pages/Results/Results'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Order from './pages/Order/Order'
import Activate from './pages/Activate/Activate'
import "./app.css"
import Review from './pages/Review/Review'
/*
  creating multi paged application with react router dom 
 */
const App = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route exact path = "/" element = {<Home/>}/>
                <Route exact path = "/results" element = {<Results />} />
                <Route exact path = "/register" element = {<Register />} />
                <Route exact path = "/login" element = {<Login />} /> 
                <Route exact path = "/order" element = {<Order />} />
                <Route exact path = "/activate" element = {<Activate />} />
                <Route exact path = "/review" element = {<Review />}  />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App