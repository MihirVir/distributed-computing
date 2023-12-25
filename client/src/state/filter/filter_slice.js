import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sort_by: ""
};

const filterSlice = createSlice({
    name: "filter",
    initialState: initialState,
    reducers: {
        setSortOption(state, action) {
            state.sort_by = action.payload;
        },
        clearSortOption(state, action) {
            state.sort_by = "";
        }
    }
});

export const {
    setSortOption,
    clearSortOption
} = filterSlice.actions;

export default filterSlice.reducer;