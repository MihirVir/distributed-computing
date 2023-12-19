import React from 'react'
import { MdCardTravel } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa";
import { GrReturn } from "react-icons/gr";

import "./explore.css"

const Explore = () => {
  return (
    <>
        <div className = "explorer-tab">
            <div className="explore-card">
                <MdCardTravel style = {{fontSize: "2rem"}} />
                <p>Explore popular destinations</p>
            </div>
            <div className="explore-card">
                <FaRegCreditCard style = {{fontSize: "2rem"}} />
                <p>Buy tickets now, pay later.</p>
            </div>
            <div className="explore-card">
                <GrReturn style = {{fontSize: "2rem"}} />
                <p>Refund within 24hrs of purchase</p>
            </div>
        </div>
    </>
  )
}

export default Explore