import React from 'react'
import "./popular.css"

const flight_data = [
    {
        name: "London",
        src: "/card.jpeg",
    },
    {
        name: "Dublin",
        src: "/card.jpeg",
    },
    {
        name: "Paris",
        src: "/card.jpeg",
    },
    {
        name: "Delhi",
        src: "/card.jpeg",
    },
    {
        name: "Beijing",
        src: "/card.jpeg",
    },
    {
        name: "Melbourne",
        src: "/card.jpeg",
    },
]

const Popular = () => {
  return (
    <div className="popular-wrapper">
        <h3>The most popular flights right now</h3>
        <p className = "popular-para">Other travellers are loving these destinations. Search and compare flights, hotels, and car hire and join them on the adventure.</p>
        <div className="card-wrapper">
            {flight_data.map((item, idx) => {
                return (
                    <>
                    <div key = {idx} className="card">
                        <img loading = "lazy" className = "card-image" src={item.src} alt="" />
                        <div>
                            <p className = "location-name">{item.name}</p>
                            <span className = "tags">flights</span>
                        </div>
                    </div>
                    </>
                )
            })}
        </div>
    </div>
  )
}

export default Popular