import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    order_id: "",
    user_id: "",
    flights_info: [],
    total_price: 0,
    order_status: 0,
    update_time: "",
    create_time: ""
}

const orderSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {
        setOrderData(state, action) {
            state.order_id = action.payload.order_id;
            state.user_id = action.payload.user_id;
            state.flights_info = action.payload.flights_info;
            state.total_price = action.payload.price; // Assuming total price is 'price'
            state.order_status = action.payload.order_status;
            state.update_time = action.payload.update_time;
            state.create_time = action.payload.create_time;
        },
        clearOrderData(state) {
            state.order_id = "";
            state.user_id = "";
            state.flights_info = [];
            state.total_price = 0;
            state.order_status = 0;
            state.update_time = "";
            state.create_time = "";
        },
        updatePrice(state, action) {
            state.total_price = action.payload;
        }
    }
});

export const {
    setOrderData,
    clearOrderData,
    updatePrice
} = orderSlice.actions;

export default orderSlice.reducer;
