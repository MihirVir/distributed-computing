import React from 'react'
import "./index.css"
const CardResult = (props) => {
    const { searchResults } = props;
  return (
    <div className="card-wrapper">
        {searchResults.map((item, idx) => {
            return (
                <>    
                    <div key = {idx} className="new-card-container">
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
                            <p className = "price">EUR{item.price}</p>
                            <button className = "add-to-cart-btn">Select</button>
                        </div>
                    </div>
                </>
            )
        })}
    </div>
  )
}

export default CardResult