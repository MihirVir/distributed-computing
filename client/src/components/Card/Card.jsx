import React from 'react'
import "./card.css"

const Card = () => {
  return (
    <div className="card-container">
        <img className = "card-img" src="/card.jpeg" alt="" />
        <div className = "information">
            <h2 className = "information-heading">Save upto 30% on your next flight</h2>
            <p className = "information-para">Discover unbeatable flight deals! Our curated selection offers premium flights at unprecedented prices. Explore the world affordably with top-tier airlines. Whether a spontaneous getaway or a planned adventure, our handpicked deals ensure luxury without straining your budget. Elevate your travels with exclusive offers – journey to your dream destination for less!</p>
            <button className = "discover-btn">Discover a deal</button>
        </div>
    </div>
  )
}

export default Card