import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    orderId: "",
}

const orderSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {
        setOrderId(state, action) {
            state.orderId = action.payload;
        },
    }
})


export const {
    setOrderId,
} = orderSlice.actions;

export default orderSlice.reducer;