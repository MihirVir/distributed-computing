import { configureStore } from "@reduxjs/toolkit"
import searchReducer from "./search/search_slice";

/*
    used for global state management
*/
export const store = configureStore({
    reducer: {
        search: searchReducer
    }
});