import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import "./review.css"
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';


const Review = () => {
    const history = useNavigate();
    const airlineName = useSelector((state) => state.order.airlineName);
    const [rating, setRating] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const num = [1,2,3,4,5]
    
    const handlePicker =  (item) => {
        setRating(item);
    };
    
    const submit = async () => {
        setIsLoading(true)
        try {
            const endpoint = "http://localhost/api/v1/flight-routes-service/airline-rating"
            
            const body = {
                airline: airlineName,
                rating: rating
            }
            const response = await axios.put(endpoint, body)

            toast.success("Review was successfully saved", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000
            })

            setTimeout(() => {
                history("/")
            }, 3000)

            setIsLoading(false);
        } catch (err) {
            console.log(err);
            toast.error("Error adding your review", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000
            })

            setIsLoading(false);
            setTimeout(() => {
                history("/")
            }, 4000)
        }
    }
    return (
    <>
        <ToastContainer />
        <main className="review-main">
            <h4>Rate your experience {airlineName}</h4>
            <div className="review-contains">
                {num.map((item, idx) => {
                    return (
                        <>
                            <span key = {idx} onClick = {() => handlePicker(item)} className = {`rating-style ${rating === item && "active-rating"}`}>{item}</span>
                        </>
                    )
                })}                
                <button onClick={submit} disabled = {isLoading} className = "submit-review">
                    {isLoading ? <LoadingSpinner /> : "Submit"}
                </button>
            </div>
        </main>
    </>
  )
}

export default Review