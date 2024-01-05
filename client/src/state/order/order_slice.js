import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    orderId: "",
    airlineName: "",
    ticketPrice: 0
}

const orderSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {
        setOrderId(state, action) {
            state.orderId = action.payload;
        },
        setAirlineName(state, action) {
            state.airlineName = action.payload
        },
        setTicketPrice(state, action) {
            state.ticketPrice = action.payload
        }
    }
})


export const {
    setOrderId,
    setAirlineName,
    setTicketPrice
} = orderSlice.actions;

export default orderSlice.reducer;