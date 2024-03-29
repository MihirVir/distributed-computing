import React from 'react';
import axios from "axios";
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import "./order.css";
const Order = () => {
  const history = useNavigate();
  const orderId = useSelector((state) => state.order.orderId);
  const airlineName = useSelector((state) => state.order.airlineName)
  const ticketPrice = useSelector((state) => state.order.ticketPrice);
  const handlePurchase = async () => {
    try {
        const body = {
            orderId: orderId
        }

        const response = await axios.post("http://localhost/broker_service/api/v1/order/pay", body)

        console.log(response);
        toast.success("successfully purchased the ticket", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        });

        setTimeout(() => {
            history("/review")
        }, 2000)
    } catch (err) {
        console.log(err);
        toast.error("transaction failed try again later", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        })
    }
  }
  return (
    <main className = "order-main">
        <ToastContainer />
        <div className="purchase-container">
            <h3>{airlineName}</h3>
            <h4>Price: EUR{ticketPrice}</h4>
            <button onClick = {handlePurchase} className = "place-order">Place Order</button>
        </div>
    </main>
  )
}

export default Order