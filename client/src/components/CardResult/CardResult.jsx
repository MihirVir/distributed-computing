import React, {useEffect, useState}  from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setOrderId } from '../../state/order/order_slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import "./index.css"

const CardResult = (props) => {
    const history = useNavigate();
    const { searchResults } = props;
    const [filteredData, setFilteredData] = useState(searchResults);
    const dispatch = useDispatch();
    const sort_by = useSelector((state) => state.filter.sort_by);
    const userId = useSelector((state) => state.user.id);
    const sortSearchResults = () => {
        // copy of search results
        let sorted = [...searchResults];

        switch(sort_by) {
            case "ascending":
                sorted = sorted.sort((a, b) => a.price - b.price);
                break;
            case "descending":
                sorted= sorted.sort((a,b) => b.price - a.price);
                break;
            default:
                break;
        }
        setFilteredData(sorted)
    }
    
    useEffect(() => {
        sortSearchResults()   
    }, [searchResults, sort_by])

    const handleCreateOrder = async (idx) => {
        console.log(filteredData[idx])
        let flight_map_obj = {}
    
        filteredData[idx].flights.forEach((item) => {
            flight_map_obj[item.flight_no] = item.airline;
        });
        console.log(flight_map_obj)
        try {
            const body_data = {
                userId: userId,
                flightMap: flight_map_obj
            }
            
            const response = await axios.post("http://localhost/broker_service/api/v1/order/create",body_data);

            dispatch(setOrderId(response.data.result.order_id));

            toast.success("successfully created the order", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000
            });

            history("/order");
        } catch (err) {
            console.error(err);
            toast.error("error creating the order", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000
            })
        }
    }

    return (
        <div className="card-wrap">
            <ToastContainer />
            {filteredData.map((item, ind) => {
                return (
                    <>    
                        <div key = {ind} className="new-card-container">
                            <div className="logo-container">
                                <img className = "airlines-logo" src="/vite.svg" alt="" />
                            </div>
                            <div className="some-cool-information">
                                <span className="time">19:45</span>
                                <span className = "source-id">{item.src.id}</span>
                            </div>
                            <div className="liner">
                                <div className="line">
                                    {item.type === "layover" && (
                                        <>
                                            <div className="red-dot"></div>
                                            <div className="info-imp">
                                                <span>
                                                    1 stop    
                                                </span>
                                                {item.layover.id}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className = "air-img">
                                <svg className = "svg-plane" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 12 12" class="LegInfo_planeEnd__ZDkxM"><path fill="#898294" d="M3.922 12h.499a.52.52 0 0 0 .444-.247L7.949 6.8l3.233-.019A.8.8 0 0 0 12 6a.8.8 0 0 0-.818-.781L7.949 5.2 4.866.246A.525.525 0 0 0 4.421 0h-.499a.523.523 0 0 0-.489.71L5.149 5.2H2.296l-.664-1.33a.523.523 0 0 0-.436-.288L0 3.509 1.097 6 0 8.491l1.196-.073a.523.523 0 0 0 .436-.288l.664-1.33h2.853l-1.716 4.49a.523.523 0 0 0 .489.71"></path></svg>
                            </div>
                            <div className="some-cool-information destination">
                                <span className="time">21:45</span>
                                <span className = "source-id">{item.dest.id}</span>
                            </div>
                            <div className="pricing-information">
                                <p className = "deals" >2 deals from</p>
                                <p className = "price">EUR{parseInt(item.price)}</p>
                                <button onClick = {() => {handleCreateOrder(ind)}} className = "add-to-cart-btn">Select</button>
                            </div>
                            <div className = "ratings-container">
                                
                                {item.flights.map((i, idx) => {
                                    return (
                                        <>
                                            <div className = "rating-wrap" key = {idx}>
                                                <span className="airline-name">{i.airline}</span>
                                                <span className="airline-rating">{i.rating}</span>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default CardResult