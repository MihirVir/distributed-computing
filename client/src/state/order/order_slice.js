// 在 order/order_slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post('broker_service/api/v1/order/create', orderDetails);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderDetails: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: {
    [createOrder.pending]: (state) => {
      state.loading = true;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.orderDetails = action.payload.result;
      state.error = null;
    },
    [createOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default orderSlice.reducer;
