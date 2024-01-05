import React, {useState} from 'react'

import "./review.css"


const Review = () => {
    const [rating, setRating] = useState(0)
    const num = [1,2,3,4,5]
    
    const handlePicker = (item) => {
        console.log('Clicked!', item);
        setRating(item);
    };
        
    return (
    <>
        <main className="review-main">
            <h4>Rate your experience</h4>
            <div className="review-contains">
                {num.map((item, idx) => {
                    return (
                        <>
                            <span key = {idx} onClick = {() => handlePicker(item)} className = {`rating-style ${rating === item && "active-rating"}`}>{item}</span>
                        </>
                    )
                })}                
                <button className = "submit-review">Submit</button>
            </div>
        </main>
    </>
  )
}

export default Review